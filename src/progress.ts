import { useCallback, useEffect, useRef, useState } from 'react'
import type { SetStateAction } from 'react'
import { levels, lessonsAt } from './data'
import type { Lesson, Level } from './data'

export type Card = { lessonId: string; chunk: number; due: string; ease: number; interval: number; reps: number; reviewXpDay?: string }
export type Checkpoint = 'listen' | 'fill' | 'order' | 'dictate' | 'translate'
export type Outcome = 'recalled' | 'withHelp'
export type LessonWork = {
  checks: Partial<Record<Checkpoint, Outcome>>
  draft: string
  languageChoice?: number
  grammarNote?: string
  translation?: string
  usedTranslation?: boolean
}
export type ComprehensionPart = 'oral' | 'reading'
export type ProductionPart = 'speaking' | 'writing'
export type AssessmentWork = {
  answers: Partial<Record<ComprehensionPart, Record<number, number>>>
  submitted: ComprehensionPart[]
  transcriptUsed?: boolean
  writing: string
  spoke: boolean
  checked: Partial<Record<ProductionPart, number[]>>
  reviewed: ProductionPart[]
}
export type ConversationWork = { turn: number; draft: string }
type Day = { seconds: number; xp: number }
export type Progress = {
  start: Level
  selected: string
  completed: string[]
  steps: Record<string, number>
  work: Record<string, LessonWork>
  cards: Record<string, Card>
  conversations: Record<string, ConversationWork>
  assessments: Partial<Record<Level, AssessmentWork>>
  guidedLessonId?: string
  days: Record<string, Day>
  speech: { sum: number; count: number }
  xp: number
  goal: number
  dark: boolean
  name: string
  legacyUnlockedThrough?: Level
  placement?: { level: Level; score: number }
}

const key = 'tieng-phap-thuc-chien-v1'
export const initial: Progress = { start: 'A1', selected: 'bonjour', completed: [], steps: {}, work: {}, cards: {}, conversations: {}, assessments: {}, days: {}, speech: { sum: 0, count: 0 }, xp: 0, goal: 10, dark: false, name: '' }

function parseProgress(saved: string | null): Progress {
  if (!saved) return initial
  try {
    const previous = JSON.parse(saved) as Partial<Progress>
    if (!previous || typeof previous !== 'object' || Array.isArray(previous)) return initial
    const data = { ...initial, ...previous }
    if (!previous.work) data.legacyUnlockedThrough = previousLevelAccess(data)
    return data
  } catch {
    return initial
  }
}

export function useProgress() {
  const [snapshot, setSnapshot] = useState(() => {
    try { return { data: parseProgress(localStorage.getItem(key)), temporary: false } }
    catch { return { data: initial, temporary: true } }
  })
  const current = useRef(snapshot)

  const setData = useCallback((action: SetStateAction<Progress>) => {
    const commit = () => {
      let { data, temporary } = current.current
      if (!temporary) {
        try { data = parseProgress(localStorage.getItem(key)) }
        catch { temporary = true }
      }
      const updated = typeof action === 'function' ? action(data) : action
      if (!temporary) {
        try { localStorage.setItem(key, JSON.stringify(updated)) }
        catch { temporary = true }
      }
      const next = { data: updated, temporary }
      current.current = next
      setSnapshot(next)
    }

    const locks = navigator.locks
    if (!locks || current.current.temporary) {
      commit()
      return
    }

    let entered = false
    void locks.request(key, () => {
      entered = true
      commit()
    }).catch(() => { if (!entered) commit() })
  }, [])

  useEffect(() => {
    function synchronize(event: StorageEvent) {
      if (event.key !== key || current.current.temporary) return
      let saved: string | null
      try { saved = localStorage.getItem(key) } catch { return }
      const next = { data: parseProgress(saved), temporary: false }
      current.current = next
      setSnapshot(next)
    }

    window.addEventListener('storage', synchronize)
    return () => window.removeEventListener('storage', synchronize)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', snapshot.data.dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', snapshot.data.dark ? '#10172a' : '#f6f8fc')
  }, [snapshot.data.dark])

  return [snapshot.data, setData, snapshot.temporary] as const
}

function previousLevelAccess(data: Progress): Level {
  const previousLessons: Record<Level, string[]> = {
    A1: ['bonjour', 'sons', 'heure', 'cafe'],
    A2: ['hotel'],
    B1: ['emploi'],
    B2: ['actualites'],
    C1: ['seminaire'],
  }
  let index = Math.max(0, levels.indexOf(data.start))
  while (index < levels.length - 1 && previousLessons[levels[index]].every(id => data.completed.includes(id))) index++
  return levels[index]
}

export function dayKey(date = new Date()) {
  const pad = (number: number) => String(number).padStart(2, '0')
  return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-')
}

export function offsetDay(days: number, date = new Date()) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return dayKey(next)
}

export function streak(data: Progress) {
  let days = 0
  const active = (key: string) => Boolean(data.days[key] && (data.days[key].xp > 0 || data.days[key].seconds >= 60))
  let offset = active(dayKey()) ? 0 : -1
  while (active(offsetDay(offset))) { days++; offset-- }
  return days
}

export function activity(data: Progress, seconds = 0, xp = 0): Progress {
  const date = dayKey()
  const previous = data.days[date] ?? { seconds: 0, xp: 0 }
  return { ...data, xp: data.xp + xp, days: { ...data.days, [date]: { seconds: previous.seconds + seconds, xp: previous.xp + xp } } }
}

export function addLessonCards(data: Progress, lesson: Lesson, indices: Iterable<number> = lesson.chunks.keys()): Progress {
  const cards = { ...data.cards }
  for (const chunk of indices) {
    const id = `${lesson.id}:${chunk}`
    cards[id] ??= { lessonId: lesson.id, chunk, due: dayKey(), ease: 2.5, interval: 0, reps: 0 }
  }
  return { ...data, cards }
}

export function finishLesson(data: Progress, lesson: Lesson) {
  if (data.completed.includes(lesson.id)) return data
  const updated = addLessonCards(data, lesson)
  return activity({ ...updated, completed: [...data.completed, lesson.id], steps: { ...data.steps, [lesson.id]: 0 } }, 0, 50)
}

export function reviewCard(data: Progress, id: string, quality: 2 | 4 | 5): Progress {
  const card = data.cards[id]
  if (!card || card.due > dayKey()) return data
  const ease = Math.max(1.3, card.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
  const reps = quality < 3 ? 0 : card.reps + 1
  const interval = quality < 3 ? 0 : reps === 1 ? 1 : reps === 2 ? 6 : Math.max(1, Math.round(card.interval * ease))
  const today = dayKey()
  const updated = { ...card, reps, ease, interval, due: offsetDay(interval), reviewXpDay: today }
  return activity({ ...data, cards: { ...data.cards, [id]: updated } }, 0, card.reviewXpDay === today ? 0 : 5)
}

export const dueCards = (data: Progress) => Object.entries(data.cards).filter(([, card]) => card.due <= dayKey()).sort((a, b) => a[1].due.localeCompare(b[1].due))
export const levelDone = (data: Progress, level: Level) => lessonsAt(level).every(lesson => data.completed.includes(lesson.id))

export function missingPrerequisites(data: Progress, lesson: Lesson): Lesson[] {
  if (data.completed.includes(lesson.id)) return []
  const start = Math.max(levels.indexOf(data.start), data.legacyUnlockedThrough ? levels.indexOf(data.legacyUnlockedThrough) : -1)
  const current = levels.indexOf(lesson.level)
  const earlierLevels = current > start ? levels.slice(start, current).flatMap(lessonsAt) : []
  const sequence = lessonsAt(lesson.level)
  const earlierLessons = sequence.slice(0, sequence.indexOf(lesson))
  return [...earlierLevels, ...earlierLessons].filter(item => !data.completed.includes(item.id))
}

export function unlocked(data: Progress, lesson: Lesson) {
  return missingPrerequisites(data, lesson).length === 0
}

export function nextLesson(data: Progress, level = data.start) {
  const sequence = levels.slice(levels.indexOf(level)).flatMap(lessonsAt)
  const picked = sequence.find(lesson => lesson.id === data.selected && !data.completed.includes(lesson.id) && unlocked(data, lesson))
  return picked ?? sequence.find(lesson => !data.completed.includes(lesson.id) && unlocked(data, lesson)) ?? sequence.at(-1)!
}
