import { useState } from 'react'
import { BookOpen, CalendarDays, Check, Layers3 } from 'lucide-react'
import { lessonsById, topicFor } from '../data'
import type { Lesson } from '../data'
import { dueCards } from '../progress'
import type { Card, Progress } from '../progress'
import { normalize } from '../speech'
import { AudioButton, ScreenTitle } from './common'

type ReviewMode = 'scheduled' | 'starter' | 'practice'
type CardEntry = [id: string, card: Pick<Card, 'lessonId' | 'chunk'>]

const grades = [[2, 'Khó', 'Ôn lại hôm nay'], [4, 'Ổn', 'Ôn đúng lịch'], [5, 'Dễ', 'Giãn lịch ôn dần']] as const

function dateLabel(key: string) {
  const [year, month, day] = key.split('-')
  return `${day}/${month}/${year}`
}

export function Review({ data, starterLesson, onGrade, onLesson, onLearn }: {
  data: Progress
  starterLesson: Lesson
  onGrade: (id: string, quality: 2 | 4 | 5) => void
  onLesson: () => void
  onLearn: (index: number) => void
}) {
  const [mode, setMode] = useState<ReviewMode>('scheduled')
  const [seen, setSeen] = useState<string[]>([])
  const [revealed, setRevealed] = useState<string | null>(null)
  const [recall, setRecall] = useState('')
  const stored = Object.entries(data.cards).sort(([, first], [, second]) => first.due.localeCompare(second.due))
  const due = dueCards(data)
  const starter = starterLesson.chunks.flatMap<CardEntry>((_, index) => {
    const id = `${starterLesson.id}:${index}`
    return data.cards[id] ? [] : [[id, { lessonId: starterLesson.id, chunk: index }]]
  })
  const queue = mode === 'starter' ? starter : mode === 'practice' ? stored : due
  const entry = queue.find(([id]) => !seen.includes(id))
  const [id, card] = entry ?? []
  const lesson = card ? lessonsById[card.lessonId] : undefined
  const chunk = card && lesson?.chunks[card.chunk]

  function open(next: ReviewMode) {
    setMode(next)
    setSeen([])
    setRevealed(null)
    setRecall('')
  }
  function advance(id: string) {
    setSeen(previous => [...previous, id])
    setRevealed(null)
    setRecall('')
  }

  const nextReview = stored[0]?.[1].due
  const recalled = chunk && normalize(recall) === normalize(chunk[0])
  return <main className="page narrow">
    <ScreenTitle title="Ôn tập flashcard">{mode === 'starter' ? 'Nghe và đọc từng cụm, rồi lưu vào kho để tập nhớ.' : mode === 'practice' ? 'Luyện thêm các thẻ đã học. Lịch ôn vẫn được giữ theo lượt chính.' : 'Thử nhớ cụm tiếng Pháp trước khi lật thẻ. Các cụm khó sẽ quay lại sớm hơn.'}</ScreenTitle>
    {mode === 'scheduled' ? <div className="review-count"><span className="stat-pill cool"><Layers3 size={19} /> <strong>{due.length}</strong> thẻ đến hạn</span><span className="muted">{stored.length} thẻ trong kho</span></div>
      : <div className="review-count"><span className="stat-pill cool">{mode === 'starter' ? <BookOpen size={18} /> : <Layers3 size={18} />} <strong>{seen.length}</strong> {mode === 'starter' ? 'cụm đã lưu' : 'thẻ đã luyện'}</span><button className="text-button" onClick={() => open('scheduled')}>Về lượt ôn chính</button></div>}
    {id && card && lesson && chunk ? <>
      <article className="card flashcard" key={id}>
        <span className="eyebrow">{lesson.level} · {topicFor(lesson)[1]}</span>
        <span className="flash-emoji" aria-hidden="true">{chunk[4]}</span>
        {mode === 'starter' ? <>
          <h2 lang="fr">{chunk[0]}</h2><p>{chunk[1]}</p>
          <div className="flash-answer"><p>{chunk[2]} · {chunk[3]}</p><p lang="fr">{chunk[5]}</p><p className="muted">{chunk[6]}</p><AudioButton text={chunk[0]} /></div>
          <button className="button primary" onClick={() => { onLearn(card.chunk); advance(id) }}><Check size={17} /> Đã học, lưu thẻ</button>
        </> : <>
          <h2>{chunk[1]}</h2>
          {revealed === id ? <div className="flash-answer"><h3 lang="fr">{chunk[0]}</h3>
            {recall.trim() && <p className={`feedback ${recalled ? 'good' : ''}`}>{recalled ? 'Bạn nhớ đúng cụm này.' : 'Đối chiếu cách viết với cụm mẫu.'} <span lang="fr">{recall}</span></p>}
            <p>{chunk[2]} · {chunk[3]}</p><p lang="fr">{chunk[5]}</p><p className="muted">{chunk[6]}</p><AudioButton text={chunk[0]} /></div>
            : <form className="flash-recall" onSubmit={event => { event.preventDefault(); setRevealed(id) }}><label className="field"><span>Thử viết bằng tiếng Pháp</span><input className="input" lang="fr" value={recall} maxLength={250} onChange={event => setRecall(event.target.value)} placeholder="Nhập cụm bạn nhớ…" /></label><button className="button primary">{recall.trim() ? 'Đối chiếu' : 'Lật thẻ'}</button></form>}
          {mode === 'practice' && revealed === id && <button className="button primary" onClick={() => advance(id)}>Thẻ tiếp theo</button>}
        </>}
      </article>
      {mode === 'scheduled' && revealed === id && <div className="grades">{grades.map(([quality, label, description]) => <button className="button secondary" key={quality} onClick={() => { onGrade(id, quality); advance(id) }}><strong>{label}</strong><small>{description}</small></button>)}</div>}
    </> : <section className="card empty-state">
      <span className="tile-icon rose">{nextReview && !due.length && mode === 'scheduled' ? <CalendarDays size={28} /> : <Layers3 size={28} />}</span>
      {mode === 'starter' ? <>
        <h2>Đã lưu {seen.length} cụm vào kho</h2><p>Thử nhìn nghĩa tiếng Việt và tự nhớ cách nói trước khi lật thẻ.</p>
        <button className="button primary" onClick={() => open('scheduled')}>Ôn ngay {due.length} thẻ</button>
      </> : mode === 'practice' ? <>
        <h2>Đã xong lượt ôn thêm</h2><p>Bạn đã luyện {seen.length} thẻ.</p>
        <button className="button secondary" onClick={() => open('scheduled')}>Về lượt ôn chính</button>
      </> : !stored.length ? <>
        <h2>Học những cụm đầu tiên</h2><p>Bắt đầu với {starter.length} cụm trong bài <strong>{topicFor(starterLesson)[1]}</strong>. Mỗi cụm có nghĩa, câu ví dụ và nút nghe.</p>
        <button className="button primary" onClick={() => open('starter')}>Học ngay {starter.length} cụm</button>
        <button className="text-button" onClick={onLesson}>Vào bài học</button>
      </> : <>
        <h2>{seen.length ? 'Đã xong lượt ôn' : 'Hôm nay chưa có thẻ đến hạn'}</h2>
        {seen.length > 0 && <p>Bạn đã ôn {seen.length} thẻ trong lượt này.</p>}
        {!due.length && nextReview && <p>Lần ôn tiếp theo vào <strong>{dateLabel(nextReview)}</strong>.</p>}
        {due.length > 0 ? <button className="button primary" onClick={() => open('scheduled')}>Ôn lại thẻ khó</button>
          : <button className="button primary" onClick={() => open('practice')}>Ôn thêm ngay</button>}
        {starter.length > 0 && <button className="text-button" onClick={() => open('starter')}>Học thêm {starter.length} cụm</button>}
      </>}
    </section>}
  </main>
}
