import { useState } from 'react'
import { Lightbulb, Volume2 } from 'lucide-react'
import type { Lesson } from '../data'
import type { Outcome } from '../progress'
import { canSpeak, normalize, speak } from '../speech'
import type { Rate } from '../speech'
import { AudioButton } from './common'

type ExerciseProps = (
  | { type: 'fill'; exercise: Lesson['exercises']['fill'] }
  | { type: 'order'; exercise: Lesson['exercises']['order'] }
  | { type: 'dictate'; exercise: Lesson['exercises']['dictate']; rate: Rate }
  | { type: 'translate'; exercise: Lesson['exercises']['translate']; draft?: string; onDraft?: (value: string) => void }
) & { onPass: (outcome: Outcome) => void; previous?: Outcome }

const titles = { fill: 'Điền vào chỗ trống', order: 'Sắp xếp câu', dictate: 'Nghe và chép chính tả', translate: 'Dịch sang tiếng Pháp' }

type Feedback = 'wrong' | 'accent' | 'right' | 'shown'
const withoutAccents = (text: string) => normalize(text).normalize('NFD').replace(/\p{M}/gu, '')

export function Exercise(props: ExerciseProps) {
  const [input, setInput] = useState('')
  const [tokens, setTokens] = useState<number[]>([])
  const [feedback, setFeedback] = useState<Feedback>()
  const [attempted, setAttempted] = useState(false)
  const [hint, setHint] = useState(false)
  const [heard, setHeard] = useState(false)
  const [audioFailed, setAudioFailed] = useState(!canSpeak)
  const exercise = props.exercise
  const textInput = props.type === 'translate' ? props.draft ?? input : input
  const picked = props.type === 'order' ? tokens.map(index => props.exercise.words[index]).join(' ') : textInput
  const answer = 'variants' in exercise ? [exercise.answer, ...(exercise.variants ?? [])] : [exercise.answer]
  const isChoice = props.type === 'fill'
  const isText = props.type === 'translate' || (props.type === 'dictate' && !audioFailed)
  const ready = props.type === 'order' ? tokens.length === props.exercise.words.length : Boolean(picked.trim())

  function edit(value: string) {
    if (props.type === 'translate' && props.onDraft) props.onDraft(value)
    else setInput(value)
    setFeedback(undefined)
  }
  function check(value = picked) {
    if (answer.some(item => normalize(value) === normalize(item))) {
      setFeedback('right')
      props.onPass(attempted || hint ? 'withHelp' : 'recalled')
    } else {
      setAttempted(true)
      const accentsOnly = isText && answer.some(item => withoutAccents(value) === withoutAccents(item))
      setFeedback(accentsOnly ? 'accent' : 'wrong')
    }
  }
  function reveal() {
    setFeedback('shown')
    setHint(true)
    props.onPass('withHelp')
  }

  return <form className="exercise" onSubmit={event => { event.preventDefault(); if (ready) check() }}>
    <h3>{titles[props.type]}</h3>
    {props.previous && !feedback && <p className="exercise-note">Bạn đã làm phần này. Có thể thử lại hoặc học tiếp.</p>}
    {'prompt' in exercise && <p className="exercise-prompt" lang={isChoice ? 'fr' : undefined}>{exercise.prompt}</p>}
    {props.type === 'dictate' && !audioFailed && <div className="dictation-tools">
      <button type="button" className="button secondary" onClick={() => { setHeard(true); speak(exercise.answer, props.rate, undefined, () => setAudioFailed(true)) }}><Volume2 size={18} /> {heard ? 'Nghe lại câu' : 'Nghe câu cần chép'}</button>
      <button type="button" className="text-button" onClick={() => setAudioFailed(true)}>Tôi không nghe được</button>
    </div>}
    {props.type === 'dictate' && audioFailed && <div className="dictation-tools"><p className="notice">Bạn có thể đọc câu và nhớ cách viết.</p><button type="button" className="button secondary" onClick={reveal}>Xem câu để luyện đọc</button></div>}
    {props.type === 'fill' && <div className="token-row">{props.exercise.options.map(option => <button type="button" key={option} className={`token ${input === option ? 'selected' : ''}`} onClick={() => { setInput(option); check(option) }} lang="fr">{option}</button>)}</div>}
    {props.type === 'order' && <>
      <div className="token-tray" aria-label="Câu đã sắp xếp">{tokens.length ? tokens.map(index => <button type="button" className="token selected" key={index} lang="fr" onClick={() => { setTokens(tokens.filter(value => value !== index)); setFeedback(undefined) }}>{props.exercise.words[index]}</button>) : <span>Chạm vào các cụm bên dưới theo thứ tự.</span>}</div>
      <div className="token-row">{props.exercise.words.map((word, index) => <button type="button" key={index} className="token" lang="fr" disabled={tokens.includes(index)} onClick={() => { setTokens([...tokens, index]); setFeedback(undefined) }}>{word}</button>)}</div>
    </>}
    {isText && <input className="input" value={textInput} onChange={event => edit(event.target.value)} placeholder="Nhập câu tiếng Pháp" aria-label="Câu trả lời bằng tiếng Pháp" lang="fr" />}
    {!isChoice && (!audioFailed || props.type !== 'dictate') && <div className="token-row"><button className="button primary" disabled={!ready}>Kiểm tra</button>
      {!attempted && !hint && <button type="button" className="text-button" onClick={() => setHint(true)}><Lightbulb size={16} /> Gợi ý</button>}
      {attempted && feedback !== 'right' && feedback !== 'shown' && <button type="button" className="text-button" onClick={reveal}>Xem và đối chiếu câu mẫu</button>}
    </div>}
    {isChoice && attempted && feedback !== 'right' && feedback !== 'shown' && <button type="button" className="text-button" onClick={reveal}>Xem đáp án</button>}
    {(feedback || hint) && <div className={`feedback ${feedback === 'right' ? 'good' : feedback === 'accent' || feedback === 'wrong' ? 'retry' : ''}`} role="status">
      {feedback === 'right' ? <><strong>Đúng rồi. </strong><span>{exercise.feedback}</span></>
        : feedback === 'accent' ? <><strong>Bạn đã nhớ đúng các từ. </strong>Kiểm tra dấu tiếng Pháp rồi thử lại.</>
        : feedback === 'shown' ? <><strong lang="fr">{exercise.answer}</strong><p>{exercise.feedback}</p></>
        : feedback === 'wrong' ? <><strong>{props.type === 'translate' ? 'Câu này khác các đáp án có sẵn. ' : 'Chưa đúng. '}</strong>{exercise.feedback}</>
        : <><strong>Gợi ý. </strong>{props.type === 'dictate' ? 'Nghe chậm hơn và chú ý cách các từ nối âm.' : exercise.feedback}</>}
    </div>}
  </form>
}

export function ListeningCheck({ question, onPass, previous, assisted }: { question: Lesson['listen']; onPass: (outcome: Outcome) => void; previous?: Outcome; assisted: boolean }) {
  const [picked, setPicked] = useState<number>()
  const [tried, setTried] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const correct = picked === question.correct
  return <section className="exercise listening-check">
    <h3>Kiểm tra bạn hiểu ý chính</h3><p>{question.prompt}</p>
    {previous && picked === undefined && !showAnswer && <p className="exercise-note">Bạn đã trả lời câu này.</p>}
    <div className="token-row">{question.options.map((option, index) => <button type="button" key={option} className={`token ${picked === index ? 'selected' : ''}`} aria-pressed={picked === index} onClick={() => {
      setPicked(index)
      if (index === question.correct) onPass(tried || showAnswer || assisted ? 'withHelp' : 'recalled')
      else setTried(true)
    }}>{option}</button>)}</div>
    {(correct || showAnswer) && <p className="feedback good" role="status">{correct ? 'Đúng rồi. ' : 'Đáp án. '}{question.options[question.correct]}</p>}
    {picked !== undefined && !correct && !showAnswer && <><p className="feedback retry" role="status">Thử nghe lại hoặc mở bản dịch rồi chọn lần nữa.</p><button className="text-button" onClick={() => { setShowAnswer(true); onPass('withHelp') }}>Xem đáp án</button></>}
  </section>
}

export function SoundChoice({ pairs, rate }: { pairs: Lesson['pronunciation']['pairs']; rate: Rate }) {
  const [pair, setPair] = useState(0)
  const [target, setTarget] = useState<0 | 1>()
  const [guess, setGuess] = useState<0 | 1>()
  const [failed, setFailed] = useState(false)
  if (!pairs.length) return null
  const words = pairs[pair]
  function play(value: 0 | 1) { speak(words[value], rate, undefined, () => setFailed(true)) }
  return <div className="pair-section">
    <h3>Nghe sự khác nhau</h3>
    {pairs.length > 1 && <div className="token-row">{pairs.map(([one, two], index) => <button type="button" key={one} className={`token ${index === pair ? 'selected' : ''}`} aria-pressed={index === pair} onClick={() => { setPair(index); setTarget(undefined); setGuess(undefined) }}>{one} / {two}</button>)}</div>}
    <div className="token-row">{words.map(word => <AudioButton key={word} text={word} label={word} rate={rate} />)}</div>
    {canSpeak && !failed && <>
      <button type="button" className="text-button" onClick={() => { const next = target !== undefined && guess === undefined ? target : Math.random() < .5 ? 0 : 1; setTarget(next); setGuess(undefined); play(next) }}><Volume2 size={16} /> {target === undefined ? 'Nghe một từ và đoán' : guess === undefined ? 'Nghe lại từ bí mật' : 'Thử lượt khác'}</button>
      {target !== undefined && <div className="token-row">{words.map((word, index) => <button type="button" className="token" key={word} onClick={() => setGuess(index === 0 ? 0 : 1)}>{word}</button>)}</div>}
      {guess !== undefined && <p className={`feedback ${guess === target ? 'good' : 'retry'}`} role="status">{guess === target ? 'Bạn nghe đúng.' : 'Hãy nghe lại hai từ.'} Từ vừa phát là <strong lang="fr">{words[target!]}</strong>.</p>}
    </>}
  </div>
}
