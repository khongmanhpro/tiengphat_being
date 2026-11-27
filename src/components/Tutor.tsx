import { useEffect, useState } from 'react'
import { AudioLines, Bot, Check, CircleHelp, Lightbulb, MessageCircle, Mic, RotateCcw, Send, Square } from 'lucide-react'
import { lessons, lessonsById, levels, topicFor } from '../data'
import type { Lesson, Level } from '../data'
import { starterPractice } from '../data/starter-practice'
import type { ConversationWork } from '../progress'
import { speak, useRecognition } from '../speech'
import { AudioButton, ScreenTitle } from './common'
import { GuidedConversation } from './GuidedConversation'

type Reply = { reply: string; correction: string; hint: string }
type Analysis = { translation: string; grammar: string; example: string }
type Turn = { role: 'user' | 'model'; text: string; correction?: string; hint?: string }

export function Tutor({ initial, level, conversations, onSelect, onConversation }: {
  initial: Lesson; level: Level; conversations: Record<string, ConversationWork>
  onSelect: (id: string) => void; onConversation: (id: string, work: ConversationWork) => void
}) {
  const offline = window.location.protocol === 'file:'
  const [mode, setMode] = useState<'guided' | 'role' | 'quick'>('guided')
  const [lessonId, setLessonId] = useState(initial.id)
  const [difficulty, setDifficulty] = useState(level)
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [quickInput, setQuickInput] = useState('')
  const [analysis, setAnalysis] = useState<Analysis>()
  const [activeHint, setActiveHint] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')
  const [configured, setConfigured] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const microphone = useRecognition()
  const lesson = lessonsById[lessonId]
  const ready = !offline && configured
  const conversation: Turn[] = [{ role: 'model', text: lesson.opening, hint: lesson.hint }, ...turns]

  useEffect(() => {
    if (offline) return
    const controller = new AbortController()
    fetch('/api/tutor', { signal: controller.signal }).then(result => result.ok ? result.json() : null)
      .then(result => { if (result?.configured) setConfigured(true) }).catch(() => {})
    return () => controller.abort()
  }, [offline])

  function reset() { setTurns([]); setInput(''); setActiveHint(''); setError('') }

  function selectLesson(id: string) {
    setLessonId(id)
    setDifficulty(lessonsById[id].level)
    onSelect(id)
    reset()
  }

  function returnToPractice() { setMode('guided'); setError('') }

  async function request<R>(operation: 'role' | 'quick' | 'hint', text: string): Promise<R> {
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: operation, text, level: difficulty, lessonId, history: conversation.map(({ role, text }) => ({ role, text })) }),
    })
    const value = await response.json().catch(() => null)
    if (!response.ok || !value) throw new Error(value?.error ?? 'Chưa kết nối được với gia sư. Hãy thử lại.')
    return value as R
  }

  async function send(source = input) {
    const text = source.trim()
    if (!text || busy) return
    if (!ready) return
    setBusy('role')
    setError('')
    setActiveHint('')
    try {
      const reply = await request<Reply>('role', text)
      setTurns([...turns, { role: 'user', text }, { role: 'model', text: reply.reply, correction: reply.correction, hint: reply.hint }])
      setInput('')
      if (voiceMode) speak(reply.reply, 0.8)
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Chưa nhận được phản hồi.') }
    finally { setBusy('') }
  }

  async function hint() {
    if (busy) return
    const cached = conversation.at(-1)?.hint
    if (cached) { setActiveHint(cached); return }
    if (!ready) return
    setBusy('hint')
    setError('')
    try { setActiveHint((await request<Reply>('hint', '')).hint) }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Chưa tạo được gợi ý.') }
    finally { setBusy('') }
  }

  async function analyze() {
    if (!quickInput.trim() || busy) return
    if (!ready) return
    setBusy('quick')
    setError('')
    setAnalysis(undefined)
    try { setAnalysis(await request<Analysis>('quick', quickInput)) }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Chưa phân tích được câu.') }
    finally { setBusy('') }
  }

  return <main className="page narrow">
    <ScreenTitle title="Luyện nói theo tình huống">Nghe một câu, nói theo cách của bạn, rồi xem bạn đã truyền đạt được ý nào.</ScreenTitle>
    <div className="segmented tutor-modes"><button aria-pressed={mode === 'guided'} disabled={Boolean(busy)} onClick={returnToPractice}><MessageCircle size={17} /> Luyện mẫu</button><button aria-pressed={mode === 'role'} disabled={Boolean(busy)} onClick={() => { setMode('role'); setError('') }}><Bot size={17} /> Nhập vai AI</button><button aria-pressed={mode === 'quick'} disabled={Boolean(busy)} onClick={() => { setMode('quick'); setError('') }}><CircleHelp size={17} /> Hỏi nhanh</button></div>
    {mode !== 'guided' && !ready ? <section className="card empty-state"><span className="tile-icon blue"><Bot size={22} /></span><h2>Gia sư AI chưa được bật</h2><p>Bạn có thể thu giọng, nghe lại và nhận gợi ý theo từng mục tiêu trong phần Luyện mẫu.</p><button className="button primary" onClick={returnToPractice}>Luyện mẫu ngay</button></section>
    : mode === 'guided' ? <section className="card tutor-card">
      <div className="starter-strip" aria-label="Tình huống cho người mới">
        {starterPractice.map(item => <button className={`card starter-choice ${item.id === lessonId ? 'active' : ''}`} type="button" key={item.id} aria-pressed={item.id === lessonId} onClick={() => selectLesson(item.id)}>
          <strong>{item.title}</strong><small>{item.detail}</small>{conversations[item.id]?.turn >= lessonsById[item.id].dialogue.filter(line => line[0] === 'Linh').length && <Check size={16} aria-label="Đã hoàn thành" />}
        </button>)}
      </div>
      <label className="field guided-picker"><span>Tình huống</span><select className="input" value={lessonId} onChange={event => selectLesson(event.target.value)}>{levels.map(item => <optgroup key={item} label={item}>{lessons.filter(candidate => candidate.level === item).map(candidate => <option key={candidate.id} value={candidate.id}>{topicFor(candidate)[1]}</option>)}</optgroup>)}</select></label>
      <GuidedConversation key={lesson.id} lesson={lesson} work={conversations[lesson.id]} onWork={work => onConversation(lesson.id, work)} />
    </section> : mode === 'role' ? <section className="card tutor-card">
      <div className="tutor-options"><label className="field"><span>Tình huống</span><select className="input" value={lessonId} disabled={Boolean(busy)} onChange={event => selectLesson(event.target.value)}>{lessons.map(item => <option key={item.id} value={item.id}>{item.level} · {topicFor(item)[1]}</option>)}</select></label><label className="field"><span>Độ khó</span><select className="input" value={difficulty} disabled={Boolean(busy)} onChange={event => { setDifficulty(event.target.value as Level); reset() }}>{levels.map(item => <option key={item}>{item}</option>)}</select></label></div>
      <p className="muted">Câu trả lời bạn gửi sẽ được xử lý bởi dịch vụ AI của ứng dụng.</p>
      <div className="tutor-role"><span className="tile-icon blue"><Bot size={23} /></span><div><strong>{lesson.role}</strong><p>{lesson.context}</p></div><button className="icon-button" aria-label="Bắt đầu lại hội thoại" title="Bắt đầu lại" disabled={Boolean(busy)} onClick={reset}><RotateCcw size={18} /></button></div>
      <div className="chat-log" aria-live="polite" aria-label="Các lượt hội thoại">
        {conversation.map((item, index) => <div key={index} className={`chat-turn ${item.role === 'user' ? 'chat-user' : ''}`}><div className="bubble"><p lang="fr">{item.text}</p>{item.role === 'model' && <AudioButton text={item.text} rate={0.8} compact label="Nghe gia sư" />}</div>{item.correction && <div className="correction"><strong>Góp ý</strong><p>{item.correction}</p></div>}</div>)}
        {busy === 'role' && <p className="muted">Gia sư đang soạn câu trả lời…</p>}
      </div>
      {activeHint && <div className="tip"><Lightbulb size={19} /><div><strong>Thử trả lời</strong><p lang="fr">{activeHint}</p></div><button className="text-button" onClick={() => setInput(activeHint)}>Dùng gợi ý</button></div>}
      {error && <p role="status" className="feedback retry">{error}</p>}
      {microphone.error && <p role="status" className="notice">{microphone.error}</p>}
      {!microphone.supported && <p className="notice">Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn có thể gõ câu trả lời và nghe gia sư đọc mẫu.</p>}
      <div className="tutor-tools"><button className="text-button" disabled={Boolean(busy)} onClick={hint}><Lightbulb size={17} /> {busy === 'hint' ? 'Đang tạo gợi ý…' : 'Gợi ý câu trả lời'}</button><button className={`text-button ${voiceMode ? 'voice-on' : ''}`} onClick={() => setVoiceMode(!voiceMode)} aria-pressed={voiceMode}><AudioLines size={19} /> {voiceMode ? 'Đọc tự động: Bật' : 'Đọc tự động: Tắt'}</button></div>
      <form className="composer" onSubmit={event => { event.preventDefault(); void send() }}>
        {microphone.supported && <button type="button" className={`icon-button ${microphone.recording ? 'recording' : ''}`} disabled={Boolean(busy)} aria-label={microphone.recording ? 'Dừng ghi âm' : 'Nói bằng tiếng Pháp'} onClick={() => microphone.listen(setInput)}>{microphone.recording ? <Square size={18} /> : <Mic size={20} />}</button>}
        <input className="input" value={input} maxLength={1500} onChange={event => setInput(event.target.value)} placeholder="Viết câu trả lời bằng tiếng Pháp…" aria-label="Tin nhắn bằng tiếng Pháp" lang="fr" />
        <button className="button primary send-button" aria-label="Gửi tin nhắn" disabled={Boolean(busy) || !input.trim()}><Send size={19} /></button>
      </form>
    </section> : <section className="card quick-card">
      <label className="field"><h2>Dán một câu tiếng Pháp</h2><textarea className="input" rows={4} maxLength={1500} lang="fr" value={quickInput} onChange={event => setQuickInput(event.target.value)} placeholder="Ví dụ: Je voudrais réserver une table." /></label>
      <button className="button primary" disabled={Boolean(busy) || !quickInput.trim()} onClick={analyze}>{busy ? 'Đang phân tích…' : 'Dịch và phân tích'}</button>
      {error && <p className="feedback retry" role="status">{error}</p>}
      {analysis && <div className="quick-answer" role="status"><h3>Bản dịch</h3><p>{analysis.translation}</p><h3>Ngữ pháp</h3><p>{analysis.grammar}</p><h3>Ví dụ cùng cấu trúc</h3><p lang="fr">{analysis.example}</p>{analysis.example && <AudioButton text={analysis.example} />}</div>}
    </section>}
  </main>
}
