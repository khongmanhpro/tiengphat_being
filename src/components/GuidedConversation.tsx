import { useState } from 'react'
import { Check, Mic, RotateCcw, Square } from 'lucide-react'
import type { Lesson } from '../data'
import { practiceCues } from '../data/starter-practice'
import type { ConversationWork } from '../progress'
import { normalize, useRecognition } from '../speech'
import { AudioButton, Bar } from './common'
import { VoiceRecorder } from './VoiceRecorder'

export function GuidedConversation({ lesson, work, onWork }: { lesson: Lesson; work?: ConversationWork; onWork: (work: ConversationWork) => void }) {
  const { turn, draft } = work ?? { turn: 0, draft: '' }
  const [compared, setCompared] = useState(false)
  const [readCue, setReadCue] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [spoke, setSpoke] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)
  const microphone = useRecognition()
  const turns = lesson.dialogue.flatMap((line, index) => {
    if (line[0] !== 'Linh') return []
    const previous = lesson.dialogue[index - 1]
    const partner = previous?.[0] !== 'Linh' ? previous : undefined
    return [{ partner, line }]
  })
  const current = turns[turn]
  const cues = practiceCues[lesson.id]?.[turn] ?? []
  const answer = normalize(draft)
  const feedback = cues.map(cue => ({ ...cue, found: cue.patterns.some(pattern => pattern.test(answer)) }))

  function reset(next = 0) {
    onWork({ turn: next, draft: '' })
    setCompared(false)
    setReadCue(false)
    setShowHint(false)
    setSpoke(false)
    setVoiceActive(false)
  }

  function edit(draft: string) {
    onWork({ turn, draft })
    setCompared(false)
  }

  if (!current) return <section className="empty-state"><h2>Bạn đã hoàn thành {turns.length} lượt</h2><p>Luyện lại với thông tin của bạn, chẳng hạn đổi tên, món ăn hoặc địa điểm.</p><button className="button secondary" onClick={() => reset()}><RotateCcw size={17} /> Luyện lại</button></section>
  const { partner, line } = current
  return <div className="guided-conversation">
    <div className="lesson-progress"><Bar value={turn / turns.length * 100} label="Tiến độ luyện hội thoại" /><p>Lượt {turn + 1}/{turns.length} · Đến lượt bạn nói</p></div>
    {partner && <article className="guided-partner"><div><strong>{partner[0]}</strong><p lang="fr">{partner[1]}</p>{readCue && <p className="muted">{partner[2]}</p>}</div><AudioButton text={partner[1]} rate={0.8} compact /></article>}
    <div className="guided-prompt"><h3>Đến lượt bạn</h3><p>Hãy diễn đạt ý này bằng lời của bạn.</p><p>{line[2]}</p></div>
    {!microphone.recording && <VoiceRecorder key={turn} onRecorded={() => setSpoke(true)} onActive={setVoiceActive} />}
    <textarea className="input" rows={3} maxLength={1500} value={draft} onChange={event => edit(event.target.value)} lang="fr" aria-label="Câu đáp của bạn" placeholder="Viết câu của bạn để nhận góp ý theo mục tiêu" />
    <div className="token-row">
      {microphone.supported && <button className="button secondary" disabled={voiceActive} onClick={() => microphone.listen(edit)}>{microphone.recording ? <Square size={17} /> : <Mic size={17} />}{microphone.recording ? 'Dừng nhận lời' : 'Chuyển lời nói thành chữ'}</button>}
      {partner && <button className="text-button" aria-expanded={readCue} onClick={() => setReadCue(!readCue)}>{readCue ? 'Ẩn bản dịch câu hỏi' : 'Xem nghĩa câu hỏi'}</button>}
      {cues.length > 0 && <button className="text-button" aria-expanded={showHint} onClick={() => setShowHint(!showHint)}>{showHint ? 'Ẩn gợi ý' : 'Gợi ý cụm câu'}</button>}
      <button className="button primary" disabled={(!draft.trim() && !spoke) || voiceActive} onClick={() => setCompared(true)}>Đối chiếu câu đáp</button>
    </div>
    {showHint && <div className="mission-compare">{cues.map(cue => <div key={cue.goal}><strong>{cue.goal}</strong><p lang="fr">{cue.hint}</p></div>)}</div>}
    {microphone.error && <p className="notice" role="status">{microphone.error}</p>}
    {compared && <>
      {feedback.length > 0 && <div className="mission-compare" role="region" aria-label="Mục tiêu câu trả lời">
        {feedback.map(cue => <div key={cue.goal}>
          <h3>{answer && cue.found && <Check size={16} aria-label="Đã nhận ra" />} {cue.goal}</h3>
          <p>{!answer ? 'Nghe lại đoạn thu và tự kiểm tra điểm này.' : cue.found ? 'Đã nhận ra ý này trong câu của bạn.' : 'App chưa nhận ra ý này. Bạn có thể thử cách nói bên dưới.'}</p>
          {(!answer || !cue.found) && <p lang="fr">{cue.hint}</p>}
        </div>)}
      </div>}
      <div className="mission-compare"><div><h3>Một cách nói</h3><p lang="fr">{line[1]}</p><AudioButton text={line[1]} rate={0.8} compact /></div></div>
      <button className="button primary" onClick={() => reset(turn + 1)}>{turn + 1 < turns.length ? 'Lượt tiếp theo' : 'Kết thúc hội thoại'}</button>
    </>}
  </div>
}
