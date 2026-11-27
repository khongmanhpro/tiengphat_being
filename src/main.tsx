import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BookOpen, House, Layers3, Map, Moon, Sparkles, Sun, UserRound } from 'lucide-react'
import '@fontsource-variable/inter'
import './styles.css'
import { Dashboard } from './components/Dashboard'
import { Lesson } from './components/Lesson'
import { Placement, Profile, Roadmap } from './components/ProgressPages'
import { Tutor } from './components/Tutor'
import { Review } from './components/Review'
import { emptyAssessment, LevelAssessment } from './components/LevelAssessment'
import { lessonsAt, lessonsById, topicFor } from './data'
import type { Lesson as LessonData, Level } from './data'
import type { AssessmentWork, ConversationWork, LessonWork } from './progress'
import { activity, addLessonCards, finishLesson, levelDone, nextLesson, reviewCard, unlocked, useProgress } from './progress'
import { stopSpeech } from './speech'

const nav = [
  ['home', 'Trang chủ', House],
  ['roadmap', 'Lộ trình', Map],
  ['review', 'Ôn tập', Layers3],
  ['tutor', 'Gia sư AI', Sparkles],
  ['profile', 'Hồ sơ', UserRound],
] as const
type Page = typeof nav[number][0] | 'lesson' | 'placement' | 'assessment'

function App() {
  const [data, setData, temporaryProgress] = useProgress()
  const [page, setPage] = useState<Page>('home')
  const [level, setLevel] = useState<Level>(data.start)
  const [lessonId, setLessonId] = useState(data.selected)
  const [tutorId, setTutorId] = useState<string>()
  const [learning, setLearning] = useState(false)

  useEffect(() => {
    if (!learning || !['lesson', 'review', 'tutor', 'placement', 'assessment'].includes(page)) return
    let tick = Date.now()
    const time = window.setInterval(() => {
      const now = Date.now()
      const elapsed = Math.min(15, Math.round((now - tick) / 1000))
      tick = now
      if (document.visibilityState === 'visible' && elapsed > 0) setData(previous => activity(previous, elapsed))
    }, 5000)
    return () => {
      window.clearInterval(time)
      const elapsed = Math.min(5, Math.round((Date.now() - tick) / 1000))
      if (document.visibilityState === 'visible' && elapsed > 0) setData(previous => activity(previous, elapsed))
    }
  }, [page, learning, setData])

  function open(next: Page) {
    stopSpeech()
    setPage(next)
    setLearning(['lesson', 'review', 'tutor', 'placement', 'assessment'].includes(next))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function openRoadmap(selected = level) { setLevel(selected); open('roadmap') }
  function openAssessment(selected: Level) { setLevel(selected); open('assessment') }
  function updateAssessment(update: (previous: AssessmentWork) => AssessmentWork) {
    setData(previous => ({ ...previous, assessments: { ...previous.assessments, [level]: update(previous.assessments[level] ?? emptyAssessment) } }))
  }

  function openLesson(lesson: LessonData) {
    if (!unlocked(data, lesson)) return
    setLessonId(lesson.id)
    setLevel(lesson.level)
    setData(previous => ({ ...previous, selected: lesson.id }))
    open('lesson')
  }

  function openTutor(lesson?: LessonData) { setTutorId(lesson?.id); open('tutor') }

  function saveConversation(id: string, work: ConversationWork) {
    setData(previous => ({ ...previous, guidedLessonId: id, conversations: { ...previous.conversations, [id]: work } }))
  }

  const upcoming = nextLesson(data)
  const activeLesson = lessonsById[lessonId]
  const next = upcoming.id !== activeLesson?.id && !data.completed.includes(upcoming.id) ? upcoming : undefined
  function updateWork(change: (work: LessonWork) => LessonWork) {
    setData(previous => ({ ...previous, work: { ...previous.work, [lessonId]: change(previous.work[lessonId] ?? { checks: {}, draft: '' }) } }))
  }
  const activeNav = page === 'lesson' || page === 'assessment' ? 'roadmap' : page === 'placement' ? 'home' : page
  const tutorLesson = lessonsById[tutorId ?? data.guidedLessonId ?? ''] ?? upcoming
  const toggleDark = () => setData(previous => ({ ...previous, dark: !previous.dark }))

  return <>
    <a href="#content" className="skip-link">Đến nội dung chính</a>
    <header className="app-header">
      <div className="shell header-inner">
        <button className="brand" onClick={() => open('home')} aria-label="Học Tiếng Pháp Thực Chiến, Trang chủ">
          <span className="brand-mark"><BookOpen size={23} strokeWidth={2.2} /><i /></span>
          <span><strong>Học Tiếng Pháp <em>Thực Chiến</em></strong><small>Học tiếng Pháp cho người Việt</small></span>
        </button>
        <div className="header-actions"><button className="icon-button theme-button" onClick={toggleDark} aria-label={data.dark ? 'Bật chế độ sáng' : 'Bật chế độ tối'} title={data.dark ? 'Bật chế độ sáng' : 'Bật chế độ tối'}>{data.dark ? <Sun size={21} /> : <Moon size={20} />}</button><button className="avatar" onClick={() => open('profile')} title="Hồ sơ" aria-label="Mở hồ sơ">{data.name.trim() ? data.name.trim()[0].toUpperCase() : <UserRound size={19} />}</button></div>
      </div>
    </header>
    <div id="content" className="shell content" tabIndex={-1}>
      {temporaryProgress && <p className="notice progress-notice" role="status">Trình duyệt đang chặn lưu tiến độ. Bạn vẫn có thể học trong phiên này. Hãy cho phép trang lưu dữ liệu để học tiếp sau khi đóng.</p>}
      {page === 'home' && <Dashboard data={data} onLesson={openLesson} onRoadmap={openRoadmap} onReview={() => open('review')} onTutor={openTutor} onPlacement={() => open('placement')} onProfile={() => open('profile')} />}
      {page === 'roadmap' && <Roadmap data={data} level={level} onLevel={setLevel} onLesson={openLesson} onPreview={openTutor} onPlacement={() => open('placement')} onAssessment={openAssessment} />}
      {page === 'assessment' && <LevelAssessment key={level} level={level} work={data.assessments[level]} onBack={() => openRoadmap(level)} onWork={updateAssessment} />}
      {page === 'lesson' && activeLesson && <Lesson key={activeLesson.id} lesson={activeLesson} completed={data.completed.includes(activeLesson.id)} initialStep={data.completed.includes(activeLesson.id) ? 0 : data.steps[activeLesson.id] ?? 0}
        work={data.work[activeLesson.id]}
        onCheckpoint={(type, outcome) => updateWork(work => ({ ...work, checks: { ...work.checks, [type]: work.checks[type] ?? outcome } }))}
        onWork={patch => updateWork(work => ({ ...work, ...patch }))}
        onDraft={draft => updateWork(work => ({ ...work, draft }))}
        onReview={() => open('review')}
        onNext={next ? () => openLesson(next) : undefined}
        nextTitle={next ? topicFor(next)[1] : undefined}
        onAssessment={levelDone(data, activeLesson.level) ? () => openAssessment(activeLesson.level) : undefined}
        onStep={step => setData(previous => {
        const updated = step === 2 ? addLessonCards(previous, activeLesson) : previous
        return { ...updated, steps: { ...updated.steps, [activeLesson.id]: step } }
      })} onSpeech={score => setData(previous => ({ ...previous, speech: { count: previous.speech.count + 1, sum: previous.speech.sum + score } }))} onComplete={() => { setData(previous => finishLesson(previous, activeLesson)); setLearning(false) }} onBack={() => openRoadmap(activeLesson.level)} onTutor={() => openTutor(activeLesson)} />}
      {page === 'review' && <Review data={data} starterLesson={upcoming} onLesson={() => openLesson(upcoming)}
        onLearn={index => setData(previous => addLessonCards(previous, upcoming, [index]))}
        onGrade={(id, quality) => setData(previous => reviewCard(previous, id, quality))} />}
      {page === 'tutor' && <Tutor key={tutorId ?? 'tutor'} initial={tutorLesson} level={tutorLesson.level} conversations={data.conversations}
        onSelect={id => setData(previous => ({ ...previous, guidedLessonId: id }))}
        onConversation={saveConversation} />}
      {page === 'profile' && <Profile data={data} onName={name => setData(previous => ({ ...previous, name }))} onGoal={goal => setData(previous => ({ ...previous, goal }))} onDark={toggleDark} onPlacement={() => open('placement')} />}
      {page === 'placement' && <Placement onBack={() => open('home')} onApply={(start, score) => {
        const target = lessonsAt(start).find(item => !data.completed.includes(item.id)) ?? lessonsAt(start)[0]
        setData(previous => ({ ...previous, start, selected: target.id, placement: { level: start, score } }))
        openRoadmap(start)
      }} />}
    </div>
    <nav className="bottom-nav" aria-label="Điều hướng chính"><div className="nav-inner">
      {nav.map(([id, label, Icon]) => <button key={id} className={activeNav === id ? 'active' : ''} aria-current={activeNav === id ? 'page' : undefined} onClick={() => id === 'tutor' ? openTutor() : id === 'roadmap' ? openRoadmap() : open(id)}><span className="nav-icon"><Icon size={21} strokeWidth={activeNav === id ? 2.35 : 1.85} /></span><span>{label}</span></button>)}
    </div></nav>
  </>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
