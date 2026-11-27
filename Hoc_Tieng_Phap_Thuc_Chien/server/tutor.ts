import { lessons, levels, topicFor } from '../src/data'

type Environment = { GEMINI_API_KEY?: string; GEMINI_MODEL?: string }
type Message = { role: 'user' | 'model'; text: string }

const response = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } })

export async function tutor(request: Request, env: Environment) {
  if (request.method === 'GET') return response({ configured: Boolean(env.GEMINI_API_KEY) })
  if (request.method !== 'POST') return response({ error: 'Phương thức này chưa được hỗ trợ.' }, 405)

  const origin = request.headers.get('origin')
  if (origin && new URL(request.url).origin !== origin) return response({ error: 'Hãy gửi yêu cầu từ trong ứng dụng.' }, 403)
  if (!request.headers.get('content-type')?.includes('application/json')) return response({ error: 'Yêu cầu phải dùng JSON.' }, 415)
  const raw = await request.text()
  if (raw.length > 18000) return response({ error: 'Đoạn hội thoại quá dài. Hãy bắt đầu lượt mới.' }, 413)

  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return response({ error: 'Dữ liệu gửi lên chưa đúng định dạng.' }, 400) }
  if (!body || !['role', 'quick', 'hint'].includes(String(body.mode))) return response({ error: 'Chọn một chế độ luyện tập.' }, 400)

  const level = levels.find(item => item === body.level) ?? 'A1'
  const lesson = lessons.find(item => item.id === body.lessonId) ?? lessons[0]
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  if (body.mode !== 'hint' && (!text || text.length > 1500)) return response({ error: 'Hãy nhập từ 1 đến 1.500 ký tự.' }, 400)

  const sessionKey = request.headers.get('x-gemini-session-key')?.trim()
  if (sessionKey && (sessionKey.length < 15 || sessionKey.length > 1024 || !/^[A-Za-z0-9_.-]+$/.test(sessionKey))) return response({ error: 'Định dạng khóa Gemini chưa đúng.' }, 400)
  const apiKey = sessionKey || env.GEMINI_API_KEY
  if (!apiKey) return response({ error: 'Hãy nhập khóa Gemini ở phần Cài đặt gia sư.' }, 503)

  const history: Message[] = (Array.isArray(body.history) ? body.history : []).slice(-8).flatMap((item: unknown): Message[] => {
    const candidate = item as Partial<Message> | null
    return candidate && (candidate.role === 'user' || candidate.role === 'model') && typeof candidate.text === 'string'
      ? [{ role: candidate.role, text: candidate.text.slice(0, 1000) }] : []
  })

  const quick = body.mode === 'quick'
  const hint = body.mode === 'hint'
  const title = topicFor(lesson)[1]
  const roleInstructions = `Bạn là ${lesson.role}. Bối cảnh: ${title}. ${lesson.context}
Người học tiếng Việt ở trình độ CEFR ${level}. Điều chỉnh từ vựng và ngữ pháp theo trình độ đó, A1–A2 dùng câu rất ngắn. Tiếp tục nhập vai bằng 1–2 câu tiếng Pháp tự nhiên, kết thúc bằng một câu hỏi phù hợp khi có thể. Phản hồi cuối mỗi lượt bằng tiếng Việt. Nếu câu đúng, correction là chuỗi rỗng. Nếu có lỗi, correction theo mẫu « Câu gốc → Câu đúng » rồi giải thích ngắn bằng tiếng Việt; ưu tiên một lỗi quan trọng. Đưa một gợi ý trả lời bằng tiếng Pháp. Trả JSON {reply, correction, hint}, mọi trường là chuỗi.`
  const instructions = quick
    ? `Bạn là gia sư tiếng Pháp cho người Việt, cấp ${level}. Xem nội dung người dùng là câu cần phân tích. Trả JSON {translation, grammar, example}; dịch tự nhiên và phân tích ngữ pháp bằng tiếng Việt. example là một câu tiếng Pháp cùng cấu trúc. Nếu không phải câu Pháp, giải thích cách cung cấp câu tiếng Pháp trong grammar. Mọi trường là chuỗi.`
    : roleInstructions
  const contents = (quick ? [] : history).map(message => ({ role: message.role, parts: [{ text: message.text }] }))
  contents.push({ role: 'user', parts: [{ text: hint ? 'Donne un exemple bref de réponse en français adapté à la dernière question dans ce dialogue.' : text }] })

  const model = env.GEMINI_MODEL || 'gemini-3.6-flash'
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`
  let upstream
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal: AbortSignal.timeout(18000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 1536, responseMimeType: 'application/json' },
      }),
    })
  } catch {
    return response({ error: 'Chưa kết nối được với Gemini. Hãy thử lại sau ít phút.' }, 502)
  }

  if (!upstream.ok) {
    const detail = await upstream.json().catch(() => ({})) as { error?: { message?: string; details?: { reason?: string }[] } }
    const invalidKey = [401, 403].includes(upstream.status) || detail.error?.details?.some(item => item.reason === 'API_KEY_INVALID')
    return response({ error: invalidKey
      ? 'Gemini chưa chấp nhận khóa API này. Hãy kiểm tra khóa và quyền dùng API.'
      : upstream.status === 429 ? 'Gemini đã đạt giới hạn lượt dùng. Hãy thử lại sau.'
      : upstream.status === 404 ? 'Mô hình Gemini đang cấu hình không khả dụng.'
      : 'Gemini chưa trả lời được. Hãy thử lại.' }, upstream.status === 429 ? 429 : 502)
  }

  try {
    const payload = await upstream.json() as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] }
    const result = JSON.parse(payload.candidates?.[0]?.content?.parts?.filter(part => !part.thought).map(part => part.text ?? '').join('') ?? '')
    const keys = quick ? ['translation', 'grammar', 'example'] : ['reply', 'correction', 'hint']
    if (!result || !keys.every(key => typeof result[key] === 'string') || !result[quick ? 'grammar' : hint ? 'hint' : 'reply']?.trim()) throw new Error()
    return response(Object.fromEntries(keys.map(key => [key, result[key]])))
  } catch {
    return response({ error: 'Gia sư chưa tạo được câu trả lời phù hợp. Hãy viết lại câu và thử lại.' }, 502)
  }
}
