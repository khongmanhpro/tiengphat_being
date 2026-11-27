import { useState } from 'react'
import { Award, Check, ChevronLeft, ChevronRight, Clock3, Crown, Flame, Layers3, LockKeyhole, Mic, Target, Trophy, Zap } from 'lucide-react'
import { curriculum, lessonsAt, lessonsById, levels, topicFor } from '../data'
import type { Lesson, Level } from '../data'
import { questions } from '../data/placement'
import { dayKey, dueCards, levelDone, streak, unlocked } from '../progress'
import type { Progress } from '../progress'
import { AudioButton, Bar, ScreenTitle, TopicIcon } from './common'

export function Roadmap({ data, level, onLevel, onLesson, onPlacement }: { data: Progress; level: Level; onLevel: (level: Level) => void; onLesson: (lesson: Lesson) => void; onPlacement: () => void }) {
  const { topics, name, description } = curriculum[level]
  const available = lessonsAt(level)
  const completed = available.filter(item => data.completed.includes(item.id)).length
  return <main className="page narrow">
    <ScreenTitle title="Lộ trình học">Tiến từ A1 đến C1 qua những tình huống bạn có thể gặp hằng ngày.</ScreenTitle>
    <div className="segmented level-tabs" aria-label="Chọn trình độ">{levels.map(item => <button key={item} aria-pressed={item === level} onClick={() => onLevel(item)}>{item}</button>)}</div>
    <section className="card level-summary"><span className={`level-badge ${level.toLowerCase()}`}>{level}</span><div><h2>{name}</h2><p>{description}</p></div><div className="level-completion"><strong>{completed}/{available.length}</strong><span>bài đã học</span></div><Bar value={completed / available.length * 100} label={`Tiến độ cấp ${level}`} /></section>
    <ol className="topic-list">{topics.map(([id, title, icon, description]) => {
      const lesson = lessonsById[id]
      const done = data.completed.includes(id)
      const available = lesson && unlocked(data, lesson)
      const state = done ? 'Đã hoàn thành' : !lesson ? 'Đang biên soạn' : !available ? 'Chưa mở khóa' : `${lesson.minutes} phút`
      return <li className={`card topic ${available ? 'topic-active' : ''}`} key={id}>
        <button disabled={!available} onClick={() => onLesson(lesson)}><span className={`tile-icon ${done ? 'green' : available ? 'blue' : 'neutral'}`}><TopicIcon name={icon} /></span><span className="topic-copy"><strong>{title}</strong><small>{description}</small></span><span className="topic-state"><small>{state}</small>{done ? <Check size={19} /> : available ? <ChevronRight size={19} /> : <LockKeyhole size={17} />}</span></button>
      </li>
    })}</ol>
    <button className="text-button" onClick={onPlacement}>Kiểm tra xếp lớp <ChevronRight size={17} /></button>
  </main>
}

export function Review({ data, onGrade, onRoadmap }: { data: Progress; onGrade: (id: string, quality: 2 | 4 | 5) => void; onRoadmap: () => void }) {
  const due = dueCards(data)
  const [seen, setSeen] = useState<string[]>([])
  const [revealed, setRevealed] = useState<string | null>(null)
  const entry = due.find(([id]) => !seen.includes(id))
  const [id, card] = entry ?? []
  const lesson = card ? lessonsById[card.lessonId] : undefined
  const chunk = card && lesson?.chunks[card.chunk]
  const count = Object.keys(data.cards).length
  return <main className="page narrow">
    <ScreenTitle title="Ôn tập flashcard">Thử nhớ cụm tiếng Pháp trước khi lật thẻ. Các cụm khó sẽ quay lại sớm hơn.</ScreenTitle>
    <div className="review-count"><span className="stat-pill cool"><Layers3 size={19} /> <strong>{due.length}</strong> thẻ đến hạn</span><span className="muted">{count} thẻ trong kho</span></div>
    {id && lesson && chunk ? <>
      <article className="card flashcard">
        <span className="eyebrow">{lesson.level} · {topicFor(lesson)[1]}</span>
        <span className="flash-emoji" aria-hidden="true">{chunk[4]}</span>
        <h2>{chunk[1]}</h2>
        {revealed === id ? <div className="flash-answer"><h3 lang="fr">{chunk[0]}</h3><p>{chunk[2]} · {chunk[3]}</p><p lang="fr">{chunk[5]}</p><AudioButton text={chunk[0]} /></div> : <button className="button primary" onClick={() => setRevealed(id)}>Lật thẻ</button>}
      </article>
      {revealed === id && <div className="grades">{([[2, 'Khó', 'Ôn lại hôm nay'], [4, 'Ổn', 'Ôn đúng lịch'], [5, 'Dễ', 'Giãn lịch ôn dần']] as const).map(([quality, label, description]) => <button className="button secondary" key={quality} onClick={() => { onGrade(id, quality); setSeen([...seen, id]); setRevealed(null) }}><strong>{label}</strong><small>{description}</small></button>)}</div>}
    </> : <section className="card empty-state"><span className="tile-icon rose"><Layers3 size={28} /></span><h2>{seen.length ? 'Đã xong lượt ôn' : 'Chưa có thẻ đến hạn'}</h2><p>{seen.length ? `Bạn đã ôn ${seen.length} thẻ trong lượt này.` : count ? 'Lịch ôn sẽ tự cập nhật khi đến hạn.' : 'Các cụm câu sẽ tự vào kho ngay khi bạn học phần Cụm câu.'}</p>{due.length ? <button className="button primary" onClick={() => { setSeen([]); setRevealed(null) }}>Ôn lại thẻ khó</button> : <button className="button secondary" onClick={onRoadmap}>Xem lộ trình</button>}</section>}
  </main>
}

export function Placement({ onBack, onApply }: { onBack: () => void; onApply: (level: Level, score: number) => void }) {
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number>()
  const [showReview, setShowReview] = useState(false)
  const index = answers.length
  const question = questions[index]
  const score = answers.filter((answer, index) => answer === questions[index].correct).length
  let suggested: Level = 'A1'
  for (const [levelIndex, level] of levels.entries()) {
    const correct = questions.filter((item, at) => item.level === level && item.correct === answers[at]).length
    if (correct < 2) break
    suggested = levels[Math.min(levelIndex + 1, levels.length - 1)]
  }
  return <main className="page narrow">
    <button className="text-button back" onClick={onBack}><ChevronLeft size={18} /> Trang chủ</button>
    <ScreenTitle title="Kiểm tra xếp lớp">15 câu ngắn, tăng dần từ A1 đến C1. Kết quả gợi ý trình độ bắt đầu.</ScreenTitle>
    {question ? <>
      <div className="lesson-progress"><Bar value={(index + 1) / questions.length * 100} label="Tiến độ kiểm tra" /><p>Câu {index + 1}/{questions.length}</p></div>
      <section className="card placement-test"><h2>{question.prompt}</h2><div className="quiz-options">{question.answers.map((answer, position) => <button key={answer} className={`quiz-option ${selected === position ? 'selected' : ''}`} aria-pressed={selected === position} onClick={() => setSelected(position)}><span>{'ABCD'[position]}</span>{answer}</button>)}</div><button className="button primary" disabled={selected === undefined} onClick={() => { if (selected === undefined) return; setAnswers([...answers, selected]); setSelected(undefined); window.scrollTo(0, 0) }}>{index + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}</button></section>
    </> : <section className="card empty-state"><span className={`level-badge ${suggested.toLowerCase()}`}>{suggested}</span><h2>Bắt đầu ở {suggested} là phù hợp</h2><p>Bạn trả lời đúng {score}/{questions.length} câu. Bài kiểm tra tập trung vào đọc hiểu và ngữ pháp.</p><button className="button primary" onClick={() => onApply(suggested, score)}>Bắt đầu ở {suggested}</button><button className="button secondary" aria-expanded={showReview} onClick={() => setShowReview(!showReview)}>{showReview ? 'Ẩn đáp án' : 'Xem đáp án'}</button>
      {showReview && <ol className="answer-review">{questions.map((item, at) => <li key={item.prompt}><strong>{at + 1}. {item.prompt}</strong><p className={`feedback ${answers[at] === item.correct ? 'good' : 'retry'}`}>{item.answers[item.correct]}. {item.explanation}</p></li>)}</ol>}
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
    <section className="card profile-section"><h2><Award size={22} /> Huy hiệu trình độ</h2><p>Hoàn thành các bài đang có trong một cấp để nhận huy hiệu.</p><div className="badges">{levels.map(level => <span key={level} className={`badge ${levelDone(data, level) ? 'earned' : ''}`} title={levelDone(data, level) ? 'Đã nhận' : 'Chưa nhận'}>{levelDone(data, level) ? <Crown size={20} /> : <LockKeyhole size={18} />}{level}</span>)}</div></section>
    <section className="card profile-section"><h2><Target size={22} /> Cài đặt học tập</h2>
      <label className="field"><span>Tên hiển thị</span><input className="input" value={data.name} maxLength={35} onChange={event => onName(event.target.value)} placeholder="Nhập tên của bạn" /></label>
      <label className="field"><span>Mục tiêu mỗi ngày</span><select className="input" value={data.goal} onChange={event => onGoal(Number(event.target.value))}>{[5, 10, 15, 20, 30].map(value => <option key={value} value={value}>{value} phút</option>)}</select></label>
      <p className="muted">Hôm nay đã học {Math.floor((data.days[dayKey()]?.seconds ?? 0) / 60)} phút.</p>
      <button role="switch" aria-checked={data.dark} className="switch-button" onClick={onDark}><span className={`switch ${data.dark ? 'on' : ''}`} /> Chế độ tối</button>
      <button className="text-button" onClick={onPlacement}>Kiểm tra xếp lớp <ChevronRight size={17} /></button>
    </section>
  </main>
}
