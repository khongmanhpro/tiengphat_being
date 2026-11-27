import { lessons, levels, topicFor } from '../src/data'

export type TutorEnvironment = {
  TUTOR_OPENAI_API_KEY?: string
  TUTOR_OPENAI_MODEL?: string
  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string
}
type Message = { role: 'user' | 'model'; text: string }
type Provider = { kind: 'openai' | 'gemini'; key: string; model: string }

const response = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } })

function selectProvider(env: TutorEnvironment): Provider | undefined {
  if (env.TUTOR_OPENAI_API_KEY) return { kind: 'openai', key: env.TUTOR_OPENAI_API_KEY, model: env.TUTOR_OPENAI_MODEL || 'gpt-4.1-mini' }
  if (env.GEMINI_API_KEY) return { kind: 'gemini', key: env.GEMINI_API_KEY, model: env.GEMINI_MODEL || 'gemini-3.6-flash' }
}

function modelRequest(provider: Provider, instructions: string, messages: Message[], fields: string[]) {
  const signal = AbortSignal.timeout(16000)
  if (provider.kind === 'openai') {
    const format = {
      type: 'json_schema',
      name: 'french_tutor',
      strict: true,
      schema: { type: 'object', properties: Object.fromEntries(fields.map(name => [name, { type: 'string' }])), required: fields, additionalProperties: false },
    }
    return fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${provider.key}` },
      signal,
      body: JSON.stringify({
        model: provider.model,
        instructions,
        input: messages.map(message => ({ role: message.role === 'model' ? 'assistant' : 'user', content: message.text })),
        store: false,
        max_output_tokens: 1000,
        text: { format },
      }),
    })
  }
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(provider.model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': provider.key },
    signal,
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instructions }] },
      contents: messages.map(message => ({ role: message.role, parts: [{ text: message.text }] })),
      generationConfig: { temperature: 0.5, maxOutputTokens: 1300, responseMimeType: 'application/json' },
    }),
  })
}

function parseResult(provider: Provider, payload: unknown): unknown {
  if (provider.kind === 'openai') {
    const result = payload as { output?: { type?: string; content?: { type?: string; text?: string }[] }[] }
    return JSON.parse(result.output?.flatMap(item => item.type === 'message' ? item.content ?? [] : []).filter(part => part.type === 'output_text').map(part => part.text ?? '').join('') ?? '')
  }
  const result = payload as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] }
  return JSON.parse(result.candidates?.[0]?.content?.parts?.filter(part => !part.thought).map(part => part.text ?? '').join('') ?? '')
}

export async function tutor(request: Request, env: TutorEnvironment, requireSignIn = false) {
  const provider = selectProvider(env)
  const authorized = !requireSignIn || Boolean(request.headers.get('oai-authenticated-user-id'))
  if (request.method === 'GET') return response({ configured: Boolean(authorized && provider) })
  if (request.method !== 'POST') return response({ error: 'Phương thức này chưa được hỗ trợ.' }, 405)

  const origin = request.headers.get('origin')
  if (origin && new URL(request.url).origin !== origin) return response({ error: 'Hãy gửi yêu cầu từ trong ứng dụng.' }, 403)
  if (!authorized) return response({ error: 'Hãy đăng nhập để sử dụng gia sư AI.' }, 403)
  if (!provider) return response({ error: 'Gia sư AI chưa được bật. Bạn vẫn có thể dùng phần Luyện mẫu.' }, 503)
  if (!request.headers.get('content-type')?.includes('application/json')) return response({ error: 'Yêu cầu phải dùng JSON.' }, 415)
  if (Number(request.headers.get('Content-Length')) > 18000) return response({ error: 'Đoạn hội thoại quá dài.' }, 413)
  const raw = await request.text()
  if (raw.length > 18000) return response({ error: 'Đoạn hội thoại quá dài.' }, 413)

  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return response({ error: 'Dữ liệu gửi lên chưa đúng định dạng.' }, 400) }
  if (!body || !['role', 'quick', 'hint'].includes(String(body.mode))) return response({ error: 'Chọn một chế độ luyện tập.' }, 400)
  const level = levels.find(item => item === body.level) ?? 'A1'
  const lesson = lessons.find(item => item.id === body.lessonId) ?? lessons[0]
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  const isQuick = body.mode === 'quick'
  const isHint = body.mode === 'hint'
  if (!isHint && (!text || text.length > 1500)) return response({ error: 'Hãy nhập từ 1 đến 1.500 ký tự.' }, 400)

  const history: Message[] = (!isQuick && Array.isArray(body.history) ? body.history : []).slice(-8).flatMap((item: unknown): Message[] => {
    const candidate = item as Partial<Message> | null
    return candidate && (candidate.role === 'user' || candidate.role === 'model') && typeof candidate.text === 'string'
      ? [{ role: candidate.role, text: candidate.text.slice(0, 1000) }] : []
  })
  const target = isQuick ? 'grammar' : isHint ? 'hint' : 'reply'
  const fields = isQuick ? ['translation', 'grammar', 'example'] : ['reply', 'correction', 'hint']
  const levelStyle = level === 'A1' ? 'Một câu hỏi tiếng Pháp mỗi lượt. Dùng cụm thông dụng, khoảng 5–10 từ. Tránh thuật ngữ ngữ pháp trong giải thích.' : 'Dùng tiếng Pháp tự nhiên, vừa sức ở cấp đã nêu.'
  const instructions = isQuick
    ? `Bạn là gia sư tiếng Pháp cho người Việt cấp ${level}. Phân tích nội dung người dùng như câu cần học. Trả JSON translation, grammar, example. Dịch và giải thích một điểm chính bằng tiếng Việt dễ hiểu. Example là câu tiếng Pháp ứng dụng cùng cấu trúc. Nếu câu đầu vào không phải tiếng Pháp, yêu cầu gửi lại trong trường grammar.`
    : `Bạn là ${lesson.role}. Bối cảnh ${topicFor(lesson)[1]}. ${lesson.context} Người học nói tiếng Việt, cấp ${level}. ${levelStyle}
Tiếp tục nhập vai trong reply, và đưa một cụm để người học tự trả lời trong hint. Correction ghi một góp ý thiết yếu bằng tiếng Việt, theo dạng «câu gốc → câu sửa» khi có lỗi làm thay đổi ý nghĩa hoặc khiến câu không tự nhiên. Chấp nhận cách diễn đạt đúng khác câu mẫu. Nếu không cần sửa, correction là chuỗi rỗng. Không nhận xét phát âm vì bạn chỉ nhận được văn bản. Trả JSON reply, correction, hint bằng các chuỗi.`
  const messages: Message[] = [...history, { role: 'user', text: isHint ? 'Donne un indice bref qui aide à répondre à la dernière question sans faire tout l’exercice.' : text }]

  let upstream: Response
  try { upstream = await modelRequest(provider, instructions, messages, fields) }
  catch { return response({ error: 'Chưa kết nối được với gia sư AI. Bạn có thể luyện mẫu ngay.' }, 502) }

  if (!upstream.ok) return response({ error: upstream.status === 429
    ? 'Gia sư AI đang bận. Hãy thử lại sau ít phút.'
    : 'Gia sư AI chưa trả lời được. Bạn có thể luyện mẫu trong lúc này.' }, upstream.status === 429 ? 429 : 502)

  try {
    const result = parseResult(provider, await upstream.json()) as Record<string, string> | null
    if (!result || !fields.every(key => typeof result[key] === 'string') || !result[target]?.trim()) throw new Error()
    return response(Object.fromEntries(fields.map(key => [key, result[key].slice(0, 1600)])))
  } catch {
    return response({ error: 'Gia sư chưa tạo được câu trả lời phù hợp. Hãy thử viết ngắn hơn.' }, 502)
  }
}
