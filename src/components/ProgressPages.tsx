import { useState } from 'react'
import { Award, Check, ChevronLeft, ChevronRight, Clock3, Crown, Flame, Layers3, LockKeyhole, Mic, Target, Trophy, Zap } from 'lucide-react'
import { curriculum, lessonsAt, lessonsById, levels, topicFor } from '../data'
import type { Lesson, Level } from '../data'
import { questions } from '../data/placement'
import { curriculumSources, program, skillNames } from '../data/program'
import { languageLabs } from '../data/language-lab'
import { assessmentSteps } from './LevelAssessment'
import { dayKey, levelDone, missingPrerequisites, streak } from '../progress'
import type { Progress } from '../progress'
import { AudioButton, Bar, ScreenTitle, TopicIcon } from './common'

export function Roadmap({ data, level, onLevel, onLesson, onPreview, onPlacement, onAssessment }: {
  data: Progress
  level: Level
  onLevel: (level: Level) => void
  onLesson: (lesson: Lesson) => void
  onPreview: (lesson: Lesson) => void
  onPlacement: () => void
  onAssessment: (level: Level) => void
}) {
  const [explainedId, setExplainedId] = useState<string>()
  const { topics, name, description } = curriculum[level]
  const available = lessonsAt(level)
  const completed = available.filter(item => data.completed.includes(item.id)).length
  const guide = program[level]
  const checkedSkills = assessmentSteps(data.assessments[level])
  return <main className="page narrow">
    <ScreenTitle title="Lộ trình học">Chọn một chặng A1–C1 để xem bạn sẽ làm được gì và thử bài thực hành bốn kỹ năng.</ScreenTitle>
    <div className="segmented level-tabs" aria-label="Chọn trình độ">{levels.map(item => <button key={item} aria-pressed={item === level} onClick={() => { setExplainedId(undefined); onLevel(item) }}>{item}</button>)}</div>
    <section className="card level-summary"><span className={`level-badge ${level.toLowerCase()}`}>{level}</span><div><h2>{name}</h2><p>{description}</p></div><div className="level-completion"><strong>{completed}/{available.length}</strong><span>bài đã học</span></div><Bar value={completed / available.length * 100} label={`Tiến độ cấp ${level}`} /></section>
    <section className="card program-guide">
      <h2>Học xong chặng {level}, bạn có thể</h2>
      <p>{guide.result}</p>
      <details className="program-details"><summary>Xem mục tiêu nghe, đọc, nói và viết</summary>
        <dl className="program-outcomes">{skillNames.map(skill => <div key={skill}><dt>{skill}</dt><dd>{guide.outcomes[skill]}</dd></div>)}</dl>
      </details>
      <div className="program-assessment">
        <div><h3>Mốc thực hành {level}</h3><p>{checkedSkills ? `${checkedSkills}/4 kỹ năng đã thực hành.` : 'Nghe và đọc có đáp án. Nói và viết có bài mẫu và tiêu chí để tự đối chiếu.'}</p></div>
        <button className="button primary" onClick={() => onAssessment(level)}>{checkedSkills > 0 && checkedSkills < 4 ? 'Tiếp tục mốc' : `Làm mốc ${level}`}</button>
      </div>
    </section>
    <ol className="topic-list">{topics.map(([id, title, icon, description], index) => {
      const lesson = lessonsById[id]
      const done = data.completed.includes(id)
      const pending = lesson ? missingPrerequisites(data, lesson) : []
      const first = pending[0]
      const expanded = Boolean(first && explainedId === id)
      const state = done ? 'Đã hoàn thành' : !lesson ? 'Đang biên soạn' : first ? 'Cách mở khóa' : data.steps[id] ? `Đang học · ${data.steps[id] + 1}/5` : `${lesson.minutes} phút`
      return <li className="program-topic" key={id}>
        {index % 2 === 0 && <h2 className="program-block">{guide.blocks[Math.floor(index / 2)]}</h2>}
        <div className={`card topic ${first ? 'topic-locked' : 'topic-active'}`}>
        <button className="topic-entry" disabled={!lesson} aria-expanded={first ? expanded : undefined} aria-controls={first ? `unlock-${id}` : undefined} onClick={() => {
          if (!lesson) return
          if (first) setExplainedId(expanded ? undefined : id)
          else onLesson(lesson)
        }}><span className={`tile-icon ${done ? 'green' : first ? 'neutral' : 'blue'}`}><TopicIcon name={icon} /></span><span className="topic-copy"><strong>{title}</strong><small>{description}</small>{languageLabs[id] && <small className="topic-skill">{languageLabs[id].skill}</small>}</span><span className="topic-state"><small>{state}</small>{done ? <Check size={19} /> : first ? <LockKeyhole size={17} /> : <ChevronRight size={19} />}</span></button>
        {first && lesson && <div id={`unlock-${id}`} className="unlock-panel" hidden={!expanded}>
          <h3>Mở bài {title}</h3>
          <p>{pending.length === 1 ? <>Hoàn thành <strong>{topicFor(first)[1]}</strong> để vào bài này.</> : <>Còn <strong>{pending.length} bài</strong> cần hoàn thành. Bài cần học trước là <strong>{topicFor(first)[1]}</strong> ({first.level}).</>}</p>
          <div className="token-row"><button className="button primary" onClick={() => onLesson(first)}>Học bài cần hoàn thành</button><button className="button secondary" onClick={() => onPreview(lesson)}>Luyện thử hội thoại</button></div>
          {first.level !== level && <button className="text-button" onClick={onPlacement}>Đã học tiếng Pháp? Kiểm tra xếp lớp</button>}
        </div>}
        </div>
      </li>
    })}</ol>
    <button className="text-button" onClick={onPlacement}>Kiểm tra xếp lớp <ChevronRight size={17} /></button>
    <details className="program-references"><summary>Khung tham chiếu của lộ trình</summary>
      <p>Bài trong ứng dụng là bài thực hành tự biên soạn theo mục tiêu CEFR. Kết quả dùng để theo dõi việc học trong ứng dụng.</p>
      <ul>{curriculumSources.map(source => <li key={source.url}><a className="text-button" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
    </details>
  </main>
}

export function Placement({ onBack, onApply }: { onBack: () => void; onApply: (level: Level, score: number) => void }) {
  const [answers, setAnswers] = useState<number[]>([])
  const [orders] = useState(() => questions.map(item => item.answers.map((_, index) => index).sort(() => Math.random() - 0.5)))
  const [chosenLevel, setChosenLevel] = useState<Level>()
  const [selected, setSelected] = useState<number>()
  const [showReview, setShowReview] = useState(false)
  const index = answers.length
  const question = questions[index]
  const score = answers.filter((answer, index) => answer === questions[index].correct).length
  const countByLevel = (level: Level) => questions.filter(item => item.level === level).length
  let suggested: Level = 'A1'
  for (const [levelIndex, level] of levels.entries()) {
    const correct = questions.filter((item, at) => item.level === level && item.correct === answers[at]).length
    if (correct < Math.ceil(countByLevel(level) * 0.6)) break
    suggested = levels[levelIndex]
  }
  return <main className="page narrow">
    <button className="text-button back" onClick={onBack}><ChevronLeft size={18} /> Trang chủ</button>
    <ScreenTitle title="Kiểm tra xếp lớp">{questions.length} câu ngắn theo độ khó A1–C1, gồm đọc hiểu, ngữ pháp và nghe-phân biệt âm, để gợi ý điểm bắt đầu.</ScreenTitle>
    {question ? <>
      <div className="lesson-progress"><Bar value={(index + 1) / questions.length * 100} label="Tiến độ kiểm tra" /><p>Câu {index + 1}/{questions.length}</p></div>
      <section className="card placement-test"><h2>{question.prompt}</h2>{question.audio && <AudioButton text={question.audio} label="Nghe lại" />}<div className="quiz-options">{orders[index].map((position, displayIndex) => <button key={position} className={`quiz-option ${selected === position ? 'selected' : ''}`} aria-pressed={selected === position} onClick={() => setSelected(position)}><span>{'ABCD'[displayIndex]}</span>{question.answers[position]}</button>)}</div><button className="button primary" disabled={selected === undefined} onClick={() => { if (selected === undefined) return; setAnswers([...answers, selected]); setSelected(undefined); window.scrollTo(0, 0) }}>{index + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}</button></section>
    </> : <section className="card empty-state"><span className={`level-badge ${suggested.toLowerCase()}`}>{suggested}</span><h2>Gợi ý bắt đầu ở {suggested}</h2><p>Bạn trả lời đúng {score}/{questions.length} câu. Bài kiểm tra tập trung vào đọc hiểu, ngữ pháp và nghe-phân biệt âm.</p><ul>{levels.map(level => <li key={level}>{level}: {questions.filter((item, at) => item.level === level && item.correct === answers[at]).length}/{countByLevel(level)} câu đúng</li>)}</ul><label className="field">Chọn điểm bắt đầu<select className="input" value={chosenLevel ?? suggested} onChange={event => setChosenLevel(event.target.value as Level)}>{levels.map(level => <option key={level}>{level}</option>)}</select></label><button className="button primary" onClick={() => onApply(chosenLevel ?? suggested, score)}>Bắt đầu ở {chosenLevel ?? suggested}</button><button className="button secondary" aria-expanded={showReview} onClick={() => setShowReview(!showReview)}>{showReview ? 'Ẩn đáp án' : 'Xem đáp án'}</button>
      {showReview && <ol className="answer-review">{questions.map((item, at) => <li key={at}><strong>{at + 1}. {item.prompt}</strong>{item.audio && <AudioButton text={item.audio} label="Nghe lại" compact />}<p className={`feedback ${answers[at] === item.correct ? 'good' : 'retry'}`}>{item.answers[item.correct]}. {item.explanation}</p></li>)}</ol>}
    </section>}
  </main>
}

export function Profile({ data, onName, onGoal, onDark, onPlacement }: { data: Progress; onName: (name: string) => void; onGoal: (goal: number) => void; onDark: () => void; onPlacement: () => void }) {
  const studied = Math.floor(Object.values(data.days).reduce((value, day) => value + day.seconds, 0) / 60)
  const mastered = Object.values(data.cards).filter(card => card.reps >= 3).length
  const stats = [
    [Zap, 'XP tích lũy', data.xp, 'blue'],
    [Flame, 'Ngày liên tiếp', streak(data), 'amber'],
    [Clock3, 'Phút học', studied, 'violet'],
    [Layers3, 'Cụm đã thuộc', mastered, 'rose'],
    [Mic, 'Từ nhận diện khớp', data.speech.count ? `${Math.round(data.speech.sum / data.speech.count)}%` : '—', 'green'],
    [Trophy, 'Bài đã hoàn thành', data.completed.length, 'amber'],
  ] as const
  return <main className="page narrow">
    <ScreenTitle title="Hồ sơ học tập">Theo dõi kết quả và chọn mục tiêu vừa sức mỗi ngày.</ScreenTitle>
    <div className="profile-stats">{stats.map(([Icon, label, value, color]) => <section className="card profile-stat" key={label}><span className={`tile-icon ${color}`}><Icon size={20} /></span><strong>{value}</strong><p>{label}</p></section>)}</div>
    <section className="card profile-section"><h2><Award size={22} /> Huy hiệu học tập</h2><p>Hoàn thành sáu bài trong một chặng để nhận huy hiệu.</p><div className="badges">{levels.map(level => <span key={level} className={`badge ${levelDone(data, level) ? 'earned' : ''}`} title={levelDone(data, level) ? 'Đã nhận' : 'Chưa nhận'}>{levelDone(data, level) ? <Crown size={20} /> : <LockKeyhole size={18} />}{level}</span>)}</div></section>
    <section className="card profile-section"><h2><Target size={22} /> Cài đặt học tập</h2>
      <label className="field"><span>Tên hiển thị</span><input className="input" value={data.name} maxLength={35} onChange={event => onName(event.target.value)} placeholder="Nhập tên của bạn" /></label>
      <label className="field"><span>Mục tiêu mỗi ngày</span><select className="input" value={data.goal} onChange={event => onGoal(Number(event.target.value))}>{[5, 10, 15, 20, 30].map(value => <option key={value} value={value}>{value} phút</option>)}</select></label>
      <p className="muted">Hôm nay đã học {Math.floor((data.days[dayKey()]?.seconds ?? 0) / 60)} phút.</p>
      <button role="switch" aria-checked={data.dark} className="switch-button" onClick={onDark}><span className={`switch ${data.dark ? 'on' : ''}`} /> Chế độ tối</button>
      <button className="text-button" onClick={onPlacement}>Kiểm tra xếp lớp <ChevronRight size={17} /></button>
    </section>
  </main>
}
