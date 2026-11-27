import { useEffect, useState } from 'react'
import { levels, lessonsAt } from './data'
import type { Lesson, Level } from './data'

export type Card = { lessonId: string; chunk: number; due: string; ease: number; interval: number; reps: number; reviewXpDay?: string }
type Day = { seconds: number; xp: number }
export type Progress = {
  start: Level
  selected: string
  completed: string[]
  steps: Record<string, number>
  cards: Record<string, Card>
  days: Record<string, Day>
  speech: { sum: number; count: number }
  xp: number
  goal: number
  dark: boolean
  name: string
  placement?: { level: Level; score: number }
}

const key = 'tieng-phap-thuc-chien-v1'
const initial: Progress = { start: 'A1', selected: 'bonjour', completed: [], steps: {}, cards: {}, days: {}, speech: { sum: 0, count: 0 }, xp: 0, goal: 10, dark: false, name: '' }

export function useProgress() {
  const [data, setData] = useState<Progress>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? { ...initial, ...JSON.parse(saved) } : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* Progress remains available for this session. */ }
  }, [data])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', data.dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', data.dark ? '#10172a' : '#f6f8fc')
  }, [data.dark])

  return [data, setData] as const
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

export function addLessonCards(data: Progress, lesson: Lesson): Progress {
  const cards = { ...data.cards }
  for (const chunk of lesson.chunks.keys()) {
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

export function unlocked(data: Progress, lesson: Lesson) {
  if (data.completed.includes(lesson.id)) return true
  const start = levels.indexOf(data.start)
  const current = levels.indexOf(lesson.level)
  if (current > start && !levels.slice(start, current).every(level => levelDone(data, level))) return false
  const sequence = lessonsAt(lesson.level)
  return sequence.slice(0, sequence.indexOf(lesson)).every(item => data.completed.includes(item.id))
}

export function nextLesson(data: Progress, level = data.start) {
  const sequence = levels.slice(levels.indexOf(level)).flatMap(lessonsAt)
  const picked = sequence.find(lesson => lesson.id === data.selected && !data.completed.includes(lesson.id) && unlocked(data, lesson))
  return picked ?? sequence.find(lesson => !data.completed.includes(lesson.id) && unlocked(data, lesson)) ?? sequence.at(-1)!
}
