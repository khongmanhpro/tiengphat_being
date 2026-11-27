import { BookOpen, CalendarDays, Check, ChevronRight, Clock3, Flame, GraduationCap, Layers3, LockKeyhole, MessageCircle, Play, Sparkles, Target, Zap } from 'lucide-react'
import { curriculum, lessonsAt, levels, topicFor } from '../data'
import type { Lesson, Level } from '../data'
import { dayKey, dueCards, nextLesson, offsetDay, streak } from '../progress'
import type { Progress } from '../progress'
import { TopicIcon } from './common'

type Props = { data: Progress; onLesson: (lesson: Lesson) => void; onRoadmap: (level?: Level) => void; onReview: () => void; onTutor: () => void; onPlacement: () => void; onProfile: () => void }

export function Dashboard({ data, onLesson, onRoadmap, onReview, onTutor, onPlacement, onProfile }: Props) {
  const current = nextLesson(data)
  const [, title] = topicFor(current)
  const today = data.days[dayKey()]
  const todayMinutes = Math.floor((today?.seconds ?? 0) / 60)
  const days = streak(data)
  const due = dueCards(data).length
  const currentDone = data.completed.includes(current.id)
  const goalPercent = Math.min(100, Math.round((today?.seconds ?? 0) / (data.goal * 60) * 100))

  return <main className="page dashboard">
    <header className="welcome">
      <div><h1>Bonjour, {data.name || 'bạn'}! <span className="wave" aria-hidden="true">👋</span></h1><p>Mỗi ngày một chút, tiếng Pháp sẽ dần trở thành phản xạ.</p></div>
      <div className="quick-stats"><span className="stat-pill warm"><Flame size={19} /><strong>{days}</strong> ngày liên tiếp</span><span className="stat-pill cool"><Zap size={18} /><strong>{data.xp}</strong> XP</span></div>
    </header>

    <div className="dashboard-grid">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-top"><span className="hero-pill"><BookOpen size={16} /> {currentDone ? 'Ôn lại bài học' : data.steps[current.id] ? 'Bài đang học' : 'Bài học tiếp theo'}</span><span className="hero-level">{current.level}</span></div>
          <h2 id="hero-title">{title}</h2>
          <p>{topicFor(current)[3]}.</p>
          <div className="hero-actions"><button className="button hero-button" onClick={() => onLesson(current)}><Play size={17} fill="currentColor" />{currentDone ? 'Ôn lại bài' : data.steps[current.id] ? 'Học tiếp' : 'Bắt đầu học'}</button><span className="hero-time"><Clock3 size={17} />{current.minutes} phút</span></div>
        </div>
      </section>

      <section className="card daily">
        <div className="daily-header"><span className="tile-icon blue"><Target size={22} /></span><h2>Mục tiêu hôm nay</h2></div>
        <div className="daily-progress">
          <div className="goal-ring" style={{ '--goal': `${goalPercent}%` } as React.CSSProperties} role="progressbar" aria-label="Mục tiêu học hôm nay" aria-valuemin={0} aria-valuemax={100} aria-valuenow={goalPercent}><div><strong>{todayMinutes}<span>/{data.goal}</span></strong><span>phút</span></div></div>
          <div><strong>{goalPercent >= 100 ? 'Đạt mục tiêu!' : 'Từng bước nhỏ'}</strong><p>{goalPercent >= 100 ? 'Bạn đã hoàn thành mục tiêu hôm nay.' : `Còn ${Math.max(0, data.goal - todayMinutes)} phút để hoàn thành mục tiêu.`}</p></div>
        </div>
        <div className="week" aria-label="Bảy ngày học gần đây">{Array.from({ length: 7 }, (_, index) => {
          const date = new Date()
          date.setDate(date.getDate() + index - 6)
          const dateKey = offsetDay(index - 6)
          const day = data.days[dateKey]
          const active = day && (day.xp > 0 || day.seconds >= 60)
          const dayLabel = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()]
          return <div className="week-day" key={dateKey}><span>{dayLabel}</span><span className={`day-mark ${active ? 'studied' : ''} ${index === 6 ? 'today' : ''}`} title={dateKey} aria-label={`${dateKey} ${active ? 'đã học' : 'chưa học'}`}>{active ? <Check size={14} /> : <span />}</span></div>
        })}</div>
      </section>

      <section className="roadmap-home">
        <div className="section-heading"><h2>Lộ trình của bạn</h2><button className="text-button" onClick={() => onRoadmap(current.level)}>Xem lộ trình <ChevronRight size={17} /></button></div>
        <div className="level-row">
          {levels.map(level => {
            const done = lessonsAt(level).every(item => data.completed.includes(item.id))
            const locked = levels.indexOf(level) > levels.indexOf(current.level)
            return <button key={level} className={`level-card card ${level === current.level ? 'current' : ''}`} onClick={() => onRoadmap(level)}><div className="level-card-top"><span className={`level-badge ${level.toLowerCase()}`}>{level}</span>{done ? <Check className="done-icon" size={15} /> : locked ? <LockKeyhole className="lock-icon" size={13} /> : null}</div><span>{curriculum[level].name}</span></button>
          })}
        </div>
      </section>

      <section className="placement-promo card">
        <span className="tile-icon violet"><GraduationCap size={26} /></span>
        <div><h2>Chưa rõ trình độ?</h2><p>Làm 15 câu để tìm điểm bắt đầu phù hợp.</p><button className="text-button" onClick={onPlacement}>{data.placement ? 'Làm lại bài xếp lớp' : 'Kiểm tra xếp lớp'} <ChevronRight size={16} /></button></div>
      </section>

      <section className="practice-home">
        <div className="section-heading"><h2>Luyện tập hôm nay</h2></div>
        <div className="practice-grid">
          <button className="practice-card card" onClick={onReview}><span className="tile-icon rose"><Layers3 size={23} /></span><span><strong>Ôn flashcard</strong><small>{due ? `${due} thẻ đến hạn hôm nay` : 'Chưa có thẻ đến hạn'}</small></span><ChevronRight size={18} className="practice-arrow" /></button>
          <button className="practice-card card" onClick={onTutor}><span className="tile-icon blue"><MessageCircle size={23} /></span><span><strong>Gia sư AI</strong><small>Nhập vai và luyện nói</small></span><ChevronRight size={18} className="practice-arrow" /></button>
        </div>
      </section>

      <button className="practice-card card profile-shortcut" onClick={onProfile}><span className="tile-icon amber"><CalendarDays size={22} /></span><span><strong>Tiến độ học tập</strong><small>Xem thống kê và huy hiệu</small></span><ChevronRight size={18} className="practice-arrow" /></button>
    </div>
  </main>
}
