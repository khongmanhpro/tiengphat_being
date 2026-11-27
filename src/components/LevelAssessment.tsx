import { useState } from 'react'
import { BookOpen, Check, ChevronLeft, Headphones, Mic, PenLine, RotateCcw } from 'lucide-react'
import { assessments } from '../data/assessments'
import type { Assessment, ComprehensionQuestion } from '../data/assessments'
import type { Level } from '../data'
import type { AssessmentWork, ComprehensionPart, ProductionPart } from '../progress'
import { AudioButton, ScreenTitle } from './common'
import { VoiceRecorder } from './VoiceRecorder'

const sections = [
  ['oral', 'Nghe', Headphones], ['reading', 'Đọc', BookOpen],
  ['speaking', 'Nói', Mic], ['writing', 'Viết', PenLine],
] as const

type Section = typeof sections[number][0]

export const emptyAssessment: AssessmentWork = { answers: {}, submitted: [], writing: '', spoke: false, checked: {}, reviewed: [] }

export function assessmentSteps(work?: AssessmentWork) {
  return (work?.submitted.length ?? 0) + (work?.reviewed.length ?? 0)
}

function SectionQuestions({ items, answers, submitted, onSelect, onSubmit, onRetry, onNext }: {
  items: ComprehensionQuestion[]
  answers: Record<number, number>
  submitted: boolean
  onSelect: (index: number, option: number) => void
  onSubmit: () => void
  onRetry: () => void
  onNext: () => void
}) {
  const result = items.filter((question, index) => answers[index] === question.correct).length
  return <>
    <ol className="assessment-questions">{items.map((question, index) => <li key={question.prompt}>
      <fieldset>
        <legend>{question.prompt}</legend>
        <div className="quiz-options">{question.options.map((option, choice) => <label key={option} className={`quiz-option ${answers[index] === choice ? 'selected' : ''}`}>
          <input type="radio" name={`assess-question-${index}`} checked={answers[index] === choice} disabled={submitted} onChange={() => onSelect(index, choice)} /> {option}
        </label>)}</div>
      </fieldset>
      {submitted && <p className={`feedback ${answers[index] === question.correct ? 'good' : 'retry'}`}>{answers[index] === question.correct ? 'Đúng. ' : `Đáp án là “${question.options[question.correct]}”. `}{question.explain}</p>}
    </li>)}</ol>
    {submitted ? <div className="token-row">
      <span className="stat-pill cool">{result}/{items.length} câu đúng</span>
      <button className="button secondary" onClick={onRetry}><RotateCcw size={16} /> Làm lại phần này</button><button className="button primary" onClick={onNext}>Kỹ năng tiếp theo</button>
    </div> : <button className="button primary" disabled={!items.every((_, index) => answers[index] !== undefined)} onClick={onSubmit}>Kiểm tra câu trả lời</button>}
  </>
}

function rubric(task: Assessment['speaking'] | Assessment['writing'], checked: number[], onCheck: (index: number, value: boolean) => void) {
  return <fieldset className="assessment-rubric">
    <legend>Những điều tôi đã làm được</legend>
    {task.criteria.map((item, index) => <label className="assessment-criterion" key={item.label}>
      <input type="checkbox" checked={checked.includes(index)} onChange={event => onCheck(index, event.target.checked)} />
      <span><strong>{item.label}</strong><small>{item.evidence}</small></span>
    </label>)}
  </fieldset>
}

export function LevelAssessment({ level, work = emptyAssessment, onBack, onWork }: {
  level: Level; work?: AssessmentWork; onBack: () => void; onWork: (update: (previous: AssessmentWork) => AssessmentWork) => void
}) {
  const [section, setSection] = useState<Section>(() => sections.find(([part]) =>
    part === 'oral' || part === 'reading' ? !work.submitted.includes(part) : !work.reviewed.includes(part)
  )?.[0] ?? 'oral')
  const [showTranscript, setShowTranscript] = useState(false)
  const [showSample, setShowSample] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const assessment = assessments[level]
  const isComprehension = section === 'oral' || section === 'reading'
  const steps = assessmentSteps(work)
  const wordCount = work.writing.trim().split(/\s+/u).filter(word => /[\p{L}\p{N}]/u.test(word)).length

  function selectSection(next: Section) {
    setSection(next)
    setShowTranscript(false)
    setShowSample(false)
    setShowFollowUp(false)
  }

  function setAnswer(part: ComprehensionPart, index: number, option: number) {
    onWork(previous => ({ ...previous, answers: { ...previous.answers, [part]: { ...previous.answers[part], [index]: option } } }))
  }

  function submit(part: ComprehensionPart) {
    onWork(previous => {
      if (previous.submitted.includes(part) || !assessment[part].questions.every((_, index) => previous.answers[part]?.[index] !== undefined)) return previous
      return { ...previous, submitted: [...previous.submitted, part] }
    })
  }

  function retry(part: ComprehensionPart) {
    onWork(previous => ({
      ...previous,
      answers: { ...previous.answers, [part]: {} },
      submitted: previous.submitted.filter(item => item !== part),
      transcriptUsed: part === 'oral' ? false : previous.transcriptUsed,
    }))
    setShowTranscript(false)
  }

  function selfCheck(part: ProductionPart, index: number, value: boolean) {
    onWork(previous => {
      const checked = previous.checked[part] ?? []
      const next = value ? [...new Set([...checked, index])] : checked.filter(item => item !== index)
      return { ...previous, checked: { ...previous.checked, [part]: next } }
    })
  }

  function signOff(part: ProductionPart) {
    onWork(previous => previous.reviewed.includes(part) ? previous : { ...previous, reviewed: [...previous.reviewed, part] })
  }

  function updateWriting(writing: string) {
    onWork(previous => ({
      ...previous, writing,
      checked: { ...previous.checked, writing: [] },
      reviewed: previous.reviewed.filter(part => part !== 'writing'),
    }))
    setShowSample(false)
  }

  function confirmSpeaking() {
    onWork(previous => ({
      ...previous, spoke: true,
      checked: { ...previous.checked, speaking: [] },
      reviewed: previous.reviewed.filter(part => part !== 'speaking'),
    }))
    setShowSample(false)
  }

  const writingReady = wordCount >= Math.min(assessment.writing.words[0], 10)
  const passage = isComprehension ? assessment[section] : undefined
  const done = isComprehension ? work.submitted.includes(section) : work.reviewed.includes(section)
  const activeSkill = sections.find(([part]) => part === section)![1]
  const production = isComprehension ? undefined : assessment[section]
  const results = sections.map(([part, label]) => {
    const comprehension = part === 'oral' || part === 'reading'
    const total = comprehension ? assessment[part].questions.length : assessment[part].criteria.length
    const score = comprehension
      ? assessment[part].questions.filter((question, index) => work.answers[part]?.[index] === question.correct).length
      : (work.checked[part] ?? []).length
    return { part, label, score, total, comprehension }
  })
  const focus = [...results].sort((first, second) => (first.score / first.total) - (second.score / second.total))[0]

  return <main className="page narrow">
    <button className="text-button back" onClick={onBack}><ChevronLeft size={18} /> Lộ trình {level}</button>
    <ScreenTitle label={`MỐC THỰC HÀNH ${level}`} title={assessment.title}>{assessment.context}</ScreenTitle>
    <div className="lesson-progress"><p>{steps}/4 kỹ năng đã thực hành · Bài tự kiểm tra trong ứng dụng</p></div>
    <div className="segmented assessment-tabs" aria-label="Kỹ năng">
      {sections.map(([part, label, Icon]) => <button type="button" key={part} onClick={() => selectSection(part)} aria-pressed={section === part}>
        <Icon size={17} /> {label}{(part === 'oral' || part === 'reading' ? work.submitted.includes(part) : work.reviewed.includes(part)) && <Check size={13} aria-label="Đã làm" />}
      </button>)}
    </div>
    <div hidden={section !== 'speaking'}><VoiceRecorder limitSeconds={180} onRecorded={confirmSpeaking} /></div>
    <section className="card assessment-card" aria-label={activeSkill}>
      {passage && (section === 'oral' || section === 'reading') && <>
        <h2>{passage.title}</h2>
        {section === 'oral' ? <>
          <p>Nghe để nắm ý chính. Nghe lại nếu cần tìm một chi tiết.</p>
          <div className="token-row assessment-actions">
            <AudioButton text={passage.text} label="Nghe đoạn tiếng Pháp" rate={level === 'A1' || level === 'A2' ? 0.8 : 1} />
            <button className="text-button" aria-expanded={showTranscript} onClick={() => {
              setShowTranscript(!showTranscript)
              if (!showTranscript && !done) onWork(previous => ({ ...previous, transcriptUsed: true }))
            }}>{showTranscript ? 'Ẩn lời thoại' : 'Xem lời thoại'}</button>
          </div>
          {showTranscript && <div className="assessment-passage" lang="fr">{passage.text}</div>}
          {work.transcriptUsed && <p className="muted">Lượt nghe này có sử dụng lời thoại.</p>}
        </> : <div className="assessment-passage" lang="fr">{passage.text}</div>}
        <SectionQuestions items={passage.questions} answers={work.answers[section] ?? {}} submitted={done}
          onSelect={(index, option) => setAnswer(section, index, option)} onSubmit={() => submit(section)} onRetry={() => retry(section)} onNext={() => selectSection(section === 'oral' ? 'reading' : 'speaking')} />
      </>}
      {production && (section === 'writing' || section === 'speaking') && <>
        <h2>{section === 'writing' ? 'Viết câu trả lời của bạn' : 'Nói theo tình huống'}</h2>
        <p>{production.prompt}</p>
        {section === 'writing' ? <>
          <details className="assessment-sources"><summary>Đọc lại tài liệu và lời nhắn</summary><div className="assessment-passage" lang="fr">{assessment.oral.text}</div><div className="assessment-passage" lang="fr">{assessment.reading.text}</div></details>
          <label className="field"><span>Bài viết bằng tiếng Pháp</span><textarea className="input" rows={8} maxLength={6000} lang="fr" value={work.writing} onChange={event => updateWriting(event.target.value)} /></label>
          <p className="muted">{wordCount} từ · Mục tiêu {assessment.writing.words[0]}–{assessment.writing.words[1]} từ. Viết ít nhất {Math.min(assessment.writing.words[0], 10)} từ để đối chiếu.</p>
        </> : <>
          <p className="muted">Thời lượng gợi ý {assessment.speaking.duration}. Trả lời câu hỏi phụ sau phần trình bày.</p>
          <div className="token-row assessment-actions">
            <AudioButton text={assessment.speaking.followUp} label="Nghe câu hỏi phụ" />
            <button className="text-button" aria-expanded={showFollowUp} onClick={() => setShowFollowUp(!showFollowUp)}>{showFollowUp ? 'Ẩn câu hỏi phụ' : 'Đọc câu hỏi phụ'}</button>
          </div>
          {showFollowUp && <p className="assessment-passage" lang="fr">{assessment.speaking.followUp}</p>}
          <details className="assessment-sources"><summary>Đọc lại lời nhắn và tài liệu</summary><div className="assessment-passage" lang="fr">{assessment.oral.text}</div><div className="assessment-passage" lang="fr">{assessment.reading.text}</div></details>
          {!work.spoke && <button className="button secondary" onClick={confirmSpeaking}>Tôi đã trả lời thành tiếng</button>}
          {work.spoke && <p className="muted"><Check size={16} /> Đã ghi nhận lần luyện nói</p>}
        </>}
        <div className="token-row assessment-actions">
          {!done && <button className="button secondary" disabled={section === 'writing' ? !writingReady : !work.spoke} aria-expanded={showSample} onClick={() => setShowSample(!showSample)}>{showSample ? 'Ẩn phần đối chiếu' : 'Đối chiếu với mẫu'}</button>}
          {done && <span className="stat-pill cool">Tự đánh giá {(work.checked[section] ?? []).length}/{production.criteria.length}</span>}
        </div>
        {(showSample || done) && <div className="assessment-compare">
          <h3>{section === 'writing' ? 'Bài viết tham khảo' : 'Một cách trả lời'}</h3>
          <div className="assessment-passage" lang="fr">{production.sample}</div>
          {rubric(production, work.checked[section] ?? [], (index, value) => selfCheck(section, index, value))}
          {!done && <button className="button primary" onClick={() => signOff(section)}>Lưu tự đánh giá</button>}
        </div>}
      </>}
    </section>
    {steps === 4 && <section className="card assessment-summary" aria-label="Kết quả bốn kỹ năng">
      <h2>Đã thực hành đủ bốn kỹ năng</h2>
      <ul className="assessment-results">{results.map(item => <li key={item.part}>
        <strong>{item.label}</strong><span>{item.score}/{item.total} {item.comprehension ? 'câu đúng' : 'tiêu chí tự đạt'}{item.part === 'oral' && work.transcriptUsed ? ' · có lời thoại' : ''}</span>
        <button className="text-button" onClick={() => { selectSection(item.part); window.scrollTo({ top: 0, behavior: 'instant' }) }}>Xem {item.label.toLowerCase()}</button>
      </li>)}</ul>
      {focus.score < focus.total && <p>Buổi sau, thử lại phần <strong>{focus.label.toLowerCase()}</strong> và chú ý các điểm còn thiếu trong phần đối chiếu.</p>}
    </section>}
  </main>
}
