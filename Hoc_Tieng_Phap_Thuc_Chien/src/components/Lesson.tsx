import { useState } from 'react'
import { ChevronLeft, CircleCheck, Lightbulb, Mic, RotateCcw, Square, Trophy } from 'lucide-react'
import { topicFor } from '../data'
import type { Lesson as LessonData } from '../data'
import { canSpeak, compareWords, normalize, useRecognition } from '../speech'
import type { Rate } from '../speech'
import { AudioButton, Bar, ScreenTitle } from './common'

const stages = ['Hội thoại', 'Cụm câu', 'Nghe và nhại', 'Ngữ pháp', 'Thực hành']
const alphabet = [
  ['A', 'a'], ['B', 'be'], ['C', 'se'], ['D', 'de'], ['E', 'ə'], ['F', 'ɛf'], ['G', 'ʒe'], ['H', 'aʃ'], ['I', 'i'], ['J', 'ʒi'], ['K', 'ka'], ['L', 'ɛl'], ['M', 'ɛm'], ['N', 'ɛn'], ['O', 'o'], ['P', 'pe'], ['Q', 'ky'], ['R', 'ɛʁ'], ['S', 'ɛs'], ['T', 'te'], ['U', 'y'], ['V', 've'], ['W', 'du.blə ve'], ['X', 'iks'], ['Y', 'i ɡʁɛk'], ['Z', 'zɛd'],
]

type ExerciseProps =
  | { type: 'fill'; exercise: LessonData['exercises']['fill'] }
  | { type: 'order'; exercise: LessonData['exercises']['order'] }
  | { type: 'dictate'; exercise: LessonData['exercises']['dictate']; rate: Rate }
  | { type: 'translate'; exercise: LessonData['exercises']['translate'] }

function Exercise(props: ExerciseProps) {
  const [input, setInput] = useState('')
  const [tokens, setTokens] = useState<number[]>([])
  const [result, setResult] = useState<boolean | null>(null)
  const exercise = props.exercise
  const picked = props.type === 'order' ? tokens.map(index => props.exercise.words[index]).join(' ') : input
  const answer = 'variants' in exercise ? [exercise.answer, ...(exercise.variants ?? [])] : [exercise.answer]
  const title = { fill: 'Điền vào chỗ trống', order: 'Sắp xếp câu', dictate: 'Nghe và chép chính tả', translate: 'Dịch sang tiếng Pháp' }[props.type]

  function check(value = picked) { setResult(answer.some(item => normalize(value) === normalize(item))) }

  return <form className="exercise" onSubmit={event => { event.preventDefault(); if (picked.trim()) check() }}>
    <h3>{title}</h3>
    {'prompt' in exercise && <p className="exercise-prompt" lang={props.type === 'fill' ? 'fr' : undefined}>{exercise.prompt}</p>}
    {props.type === 'dictate' && <div className="dictate">{canSpeak ? <AudioButton text={exercise.answer} rate={props.rate} label="Nghe câu cần chép" /> : <p className="notice">Thiết bị chưa hỗ trợ đọc thành tiếng. Bạn có thể bỏ qua phần chép chính tả.</p>}</div>}
    {props.type === 'fill' && <div className="token-row">{props.exercise.options.map(option => <button type="button" key={option} className={`token ${input === option ? 'selected' : ''}`} onClick={() => { setInput(option); check(option) }} lang="fr">{option}</button>)}</div>}
    {props.type === 'order' && <>
      <div className="token-tray" aria-label="Câu đã sắp xếp">{tokens.length ? tokens.map(index => <button type="button" className="token selected" key={index} lang="fr" onClick={() => { setTokens(tokens.filter(value => value !== index)); setResult(null) }}>{props.exercise.words[index]}</button>) : <span>Chạm vào các cụm bên dưới theo thứ tự.</span>}</div>
      <div className="token-row">{props.exercise.words.map((word, index) => <button type="button" key={index} className="token" lang="fr" disabled={tokens.includes(index)} onClick={() => { setTokens([...tokens, index]); setResult(null) }}>{word}</button>)}</div>
    </>}
    {(props.type === 'translate' || (props.type === 'dictate' && canSpeak)) && <input className="input" value={input} onChange={event => { setInput(event.target.value); setResult(null) }} placeholder="Nhập câu tiếng Pháp" aria-label="Câu trả lời bằng tiếng Pháp" lang="fr" />}
    {props.type !== 'fill' && (props.type !== 'dictate' || canSpeak) && <button className="button secondary" disabled={!picked.trim()}>Kiểm tra</button>}
    {result !== null && <div className={`feedback ${result ? 'good' : 'retry'}`} role="status"><strong>{result ? 'Chính xác!' : 'Thử lại nhé.'}</strong> {result ? <span lang="fr">{exercise.answer}</span> : <>{exercise.feedback} <span lang="fr">{exercise.answer}</span></>}</div>}
  </form>
}

export function Lesson({ lesson, initialStep, onStep, onSpeech, onComplete, onBack, onTutor, completed }: {
  lesson: LessonData; initialStep: number; completed: boolean; onStep: (step: number) => void; onSpeech: (score: number) => void; onComplete: () => void; onBack: () => void; onTutor: () => void
}) {
  const [step, setStep] = useState(initialStep)
  const [subtitles, setSubtitles] = useState(true)
  const [rate, setRate] = useState<Rate>(0.8)
  const [result, setResult] = useState<{ transcript: string; words: { word: string; correct: boolean }[]; score: number }>()
  const [thought, setThought] = useState('')
  const [showGrammar, setShowGrammar] = useState(false)
  const [mission, setMission] = useState('')
  const [criteria, setCriteria] = useState<number[]>([])
  const [showSample, setShowSample] = useState(false)
  const [done, setDone] = useState<"review" | "new">()
  const microphone = useRecognition()
  const [id, title] = topicFor(lesson)

  function move(next: number) {
    if (microphone.recording) microphone.listen(() => {})
    if (canSpeak) window.speechSynthesis.cancel()
    setStep(next)
    onStep(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (done) return <div className="narrow page"><section className="card empty-state centered"><span className="tile-icon amber"><Trophy size={28} /></span><ScreenTitle title="Bravo! Bạn đã hoàn thành bài học.">{done === "review" ? 'Bạn vừa ôn lại bài học này.' : 'Bạn nhận 50 XP. Các cụm trong bài đã có trong kho ôn tập.'}</ScreenTitle><button className="button primary" onClick={onBack}>Về lộ trình</button><button className="button secondary" onClick={onTutor}>Luyện tình huống với gia sư</button></section></div>

  return <main className="narrow page">
    <button className="text-button back" onClick={onBack}><ChevronLeft size={18} /> Lộ trình</button>
    <ScreenTitle label={`CẤP ĐỘ ${lesson.level} · ${lesson.minutes} PHÚT`} title={title}>{lesson.context}</ScreenTitle>
    <div className="lesson-progress"><Bar value={(step + 1) / stages.length * 100} label="Tiến độ bài học" /><p>Phần {step + 1}/{stages.length} · {stages[step]}</p></div>
    <section className="card lesson-card" aria-label={stages[step]}>
      <div className="section-toolbar"><h2>{stages[step]}</h2>{step < 3 && <label className="rate"><span>Tốc độ nghe</span><select value={rate} onChange={event => setRate(Number(event.target.value) as Rate)}><option value={0.6}>0.6×</option><option value={0.8}>0.8×</option><option value={1}>1×</option></select></label>}</div>
      {!canSpeak && step < 3 && <p className="notice">Trình duyệt chưa hỗ trợ đọc tiếng Pháp. Bạn vẫn có thể đọc hội thoại và làm các bài tập khác.</p>}
      {step === 0 && <>
        <div className="section-toolbar dialogue-controls">
          <AudioButton text={lesson.dialogue.map(([, fr]) => fr).join(' ')} label="Nghe cả đoạn" rate={rate} />
          <button role="switch" aria-checked={subtitles} className="switch-button" onClick={() => setSubtitles(!subtitles)}><span className={`switch ${subtitles ? 'on' : ''}`} /> Phụ đề tiếng Việt</button>
        </div>
        <div className="dialogue">
          {lesson.dialogue.map(([name, fr, vi], index) => <div className="dialogue-line" key={fr}><span className={`speaker ${index % 2 ? 'rose' : 'blue'}`}>{name[0]}</span><div><strong className="speaker-name">{name}</strong><p lang="fr">{fr}</p>{subtitles && <p className="muted">{vi}</p>}</div><AudioButton text={fr} rate={rate} label={`Nghe câu ${index + 1}`} compact /></div>)}
        </div>
        <Exercise key="fill" type="fill" exercise={lesson.exercises.fill} />
      </>}
      {step === 1 && <>
        <div className="chunks">
          {lesson.chunks.map(([fr, vi, ipa, read, emoji, example, exampleVi]) => <article className="chunk-card" key={fr}><div className="chunk-head"><span className="chunk-emoji" aria-hidden="true">{emoji}</span><div><h3 lang="fr">{fr}</h3><p>{vi}</p></div><AudioButton text={fr.replace('…', '')} rate={rate} compact label={`Nghe ${fr}`} /></div><p className="phonetic">{ipa} · Gần đúng: {read}</p><p lang="fr">{example}</p><p className="muted">{exampleVi}</p></article>)}
        </div>
        <Exercise key="order" type="order" exercise={lesson.exercises.order} />
      </>}
      {step === 2 && <>
        <div className="tip"><Lightbulb size={20} /><div><h3>{lesson.pronunciation.title}</h3><p>{lesson.pronunciation.tip}</p></div></div>
        {id === 'sons' && <details className="alphabet"><summary>Bảng chữ cái tiếng Pháp (A–Z)</summary><div className="alphabet-grid">{alphabet.map(([letter, ipa]) => <div key={letter}><AudioButton text={letter} rate={rate} label={`Nghe chữ ${letter}`} compact /><strong>{letter}</strong><span>/{ipa}/</span></div>)}</div></details>}
        <div className="pair-section"><h3>Luyện cặp âm dễ nhầm</h3>{lesson.pronunciation.pairs.map(([one, two]) => <div className="token-row" key={one}><AudioButton text={one} rate={rate} label={one} /><AudioButton text={two} rate={rate} label={two} /></div>)}</div>
        <div className="shadow-card"><h3>Nghe rồi nhại lại</h3><p className="shadow-target" lang="fr">{lesson.pronunciation.target}</p><div className="token-row"><AudioButton text={lesson.pronunciation.target} rate={rate} />
          {microphone.supported && <button className="button primary" onClick={() => microphone.listen(transcript => { const measured = compareWords(lesson.pronunciation.target, transcript); setResult({ ...measured, transcript }); onSpeech(measured.score) })}>{microphone.recording ? <Square size={16} /> : <Mic size={17} />}{microphone.recording ? 'Dừng ghi âm' : 'Ghi âm'}</button>}
        </div>
        {!microphone.supported && <p className="notice">Trình duyệt chưa hỗ trợ nhận diện giọng nói. Hãy nhại theo nếu có âm thanh, rồi tiếp tục bài học.</p>}
        {microphone.error && <p className="notice" role="status">{microphone.error}</p>}
        {result && <div className="speech-result" role="status"><strong>{result.score}% khớp với câu mẫu</strong><div className="token-row" lang="fr">{result.words.map(({ word, correct }, index) => <span key={index} className={`word ${correct ? 'good' : 'retry'}`} aria-label={`${word}: ${correct ? 'khớp' : 'chưa khớp'}`}>{word}</span>)}</div><p>Trình duyệt nghe được: <span lang="fr">{result.transcript}</span></p><p className="muted">Điểm ước tính dựa trên từ được nhận diện.</p></div>}
        </div>
        <Exercise key="dictate" type="dictate" exercise={lesson.exercises.dictate} rate={rate} />
      </>}
      {step === 3 && <>
        <div className="examples">{lesson.grammar.examples.map(([fr, vi]) => <div key={fr}><p lang="fr">{fr}</p><p className="muted">{vi}</p></div>)}</div>
        <p className="prompt">{lesson.grammar.question}</p>
        <textarea className="input" rows={2} value={thought} onChange={event => setThought(event.target.value)} placeholder="Thử viết quy tắc bạn nhận ra" aria-label="Quy tắc bạn rút ra" />
        <button className="button secondary" onClick={() => setShowGrammar(!showGrammar)} aria-expanded={showGrammar}><Lightbulb size={17} />{showGrammar ? 'Ẩn tóm tắt' : 'Xem quy tắc và tóm tắt'}</button>
        {showGrammar && <div className="grammar"><p>{lesson.grammar.rule}</p><table><thead><tr><th>Cấu trúc</th><th>Cách dùng hoặc ví dụ</th></tr></thead><tbody>{lesson.grammar.rows.map(([fr, vi]) => <tr key={fr}><td>{fr}</td><td>{vi}</td></tr>)}</tbody></table></div>}
        <Exercise key="translate" type="translate" exercise={lesson.exercises.translate} />
      </>}
      {step === 4 && <>
        <p className="prompt">{lesson.mission.prompt}</p>
        <textarea className="input" rows={4} value={mission} onChange={event => setMission(event.target.value)} placeholder="Viết câu trả lời bằng tiếng Pháp" aria-label="Câu trả lời cho nhiệm vụ thực tế" lang="fr" />
        <div className="token-row">
          {microphone.supported && <button className="button secondary" onClick={() => microphone.listen(setMission)}>{microphone.recording ? <Square size={16} /> : <Mic size={17} />}{microphone.recording ? 'Dừng ghi âm' : 'Nói câu trả lời'}</button>}
          <button className="button secondary" aria-expanded={showSample} onClick={() => setShowSample(!showSample)}><Lightbulb size={17} />{showSample ? 'Ẩn câu mẫu' : 'Xem câu mẫu'}</button>
        </div>
        {microphone.error && <p className="notice" role="status">{microphone.error}</p>}
        {showSample && <div className="tip"><p lang="fr">{lesson.mission.sample}</p><AudioButton text={lesson.mission.sample} rate={rate} compact /></div>}
        <div className="checks"><p>Tự đối chiếu câu trả lời</p>{lesson.mission.criteria.map((item, index) => <label key={item}><input type="checkbox" checked={criteria.includes(index)} onChange={event => setCriteria(event.target.checked ? [...criteria, index] : criteria.filter(value => value !== index))} />{item}</label>)}</div>
      </>}
    </section>
    <footer className="lesson-footer">
      {step > 0 && <button className="button secondary" onClick={() => move(step - 1)}><ChevronLeft size={18} /> Phần trước</button>}
      {step < 4 ? <button className="button primary" onClick={() => move(step + 1)}>{step === 2 && !result ? 'Tiếp tục bài học' : 'Phần tiếp theo'}</button> : <button className="button primary" disabled={!mission.trim() || criteria.length !== lesson.mission.criteria.length} onClick={() => { onComplete(); setDone(completed ? "review" : "new"); window.scrollTo(0, 0) }}>{completed ? <RotateCcw size={17} /> : <CircleCheck size={17} />}{completed ? 'Kết thúc ôn bài' : 'Hoàn thành bài học'}</button>}
    </footer>
  </main>
}
