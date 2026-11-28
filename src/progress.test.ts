import { describe, expect, it } from 'vitest'
import { lessonsAt, lessonsById } from './data'
import {
  activity, addLessonCards, dayKey, finishLesson, initial, missingPrerequisites,
  nextLesson, offsetDay, reviewCard, streak, unlocked,
} from './progress'
import type { Progress } from './progress'

const bonjour = lessonsById.bonjour
const sons = lessonsById.sons
const heure = lessonsById.heure
const hotel = lessonsById.hotel

describe('reviewCard', () => {
  it('schedules an easy review forward and awards XP once', () => {
    const seeded = addLessonCards(initial, bonjour, [0])
    const id = 'bonjour:0'
    const reviewed = reviewCard(seeded, id, 5)
    const card = reviewed.cards[id]
    expect(card.ease).toBeCloseTo(2.6)
    expect(card.reps).toBe(1)
    expect(card.interval).toBe(1)
    expect(card.due).toBe(offsetDay(1))
    expect(reviewed.xp).toBe(seeded.xp + 5)
  })

  it('resets reps and keeps the card due today on a hard review', () => {
    const seeded = addLessonCards(initial, bonjour, [0])
    const id = 'bonjour:0'
    const reviewed = reviewCard(seeded, id, 2)
    const card = reviewed.cards[id]
    expect(card.reps).toBe(0)
    expect(card.interval).toBe(0)
    expect(card.due).toBe(dayKey())
  })

  it('does not award review XP twice for the same card on the same day', () => {
    const seeded = addLessonCards(initial, bonjour, [0])
    const id = 'bonjour:0'
    const first = reviewCard(seeded, id, 2)
    expect(first.xp).toBe(seeded.xp + 5)
    const second = reviewCard(first, id, 2)
    expect(second.xp).toBe(first.xp)
  })

  it('is a no-op when the card is not due yet', () => {
    const seeded = addLessonCards(initial, bonjour, [0])
    const future = { ...seeded, cards: { ...seeded.cards, 'bonjour:0': { ...seeded.cards['bonjour:0'], due: offsetDay(3) } } }
    const reviewed = reviewCard(future, 'bonjour:0', 5)
    expect(reviewed).toBe(future)
  })

  it('is a no-op for an unknown card id', () => {
    expect(reviewCard(initial, 'missing:0', 5)).toBe(initial)
  })
})

describe('finishLesson', () => {
  it('marks the lesson complete, seeds its cards, and awards XP', () => {
    const finished = finishLesson(initial, bonjour)
    expect(finished.completed).toContain('bonjour')
    expect(finished.xp).toBe(initial.xp + 50)
    for (const index of bonjour.chunks.keys()) expect(finished.cards[`bonjour:${index}`]).toBeDefined()
  })

  it('is idempotent on repeat completion', () => {
    const finished = finishLesson(initial, bonjour)
    const again = finishLesson(finished, bonjour)
    expect(again).toBe(finished)
  })
})

describe('missingPrerequisites / unlocked', () => {
  it('requires earlier lessons in the same level to be completed first', () => {
    expect(missingPrerequisites(initial, heure).map(lesson => lesson.id)).toEqual(['bonjour', 'sons'])
    expect(unlocked(initial, heure)).toBe(false)

    const progressed: Progress = { ...initial, completed: ['bonjour', 'sons'] }
    expect(missingPrerequisites(progressed, heure)).toEqual([])
    expect(unlocked(progressed, heure)).toBe(true)
  })

  it('requires the whole previous level before unlocking the next one', () => {
    expect(unlocked(initial, hotel)).toBe(false)
    const a1Done: Progress = { ...initial, completed: lessonsAt('A1').map(lesson => lesson.id) }
    expect(unlocked(a1Done, hotel)).toBe(true)
  })

  it('a lesson already completed has no missing prerequisites', () => {
    const done: Progress = { ...initial, completed: ['bonjour'] }
    expect(missingPrerequisites(done, bonjour)).toEqual([])
  })
})

describe('nextLesson', () => {
  it('defaults to the first lesson of the starting level', () => {
    expect(nextLesson(initial).id).toBe('bonjour')
  })

  it('keeps the selected lesson while it is incomplete and unlocked', () => {
    const progressed: Progress = { ...initial, selected: 'sons', completed: ['bonjour'] }
    expect(nextLesson(progressed).id).toBe('sons')
  })

  it('falls back to the next incomplete, unlocked lesson once selected is done', () => {
    const progressed: Progress = { ...initial, selected: 'bonjour', completed: ['bonjour'] }
    expect(nextLesson(progressed).id).toBe('sons')
  })
})

describe('streak / activity', () => {
  it('counts consecutive active days ending today', () => {
    const data: Progress = {
      ...initial,
      days: { [dayKey()]: { seconds: 0, xp: 10 }, [offsetDay(-1)]: { seconds: 70, xp: 0 } },
    }
    expect(streak(data)).toBe(2)
  })

  it('still counts yesterday as a grace day when today has no activity yet', () => {
    const data: Progress = { ...initial, days: { [offsetDay(-1)]: { seconds: 0, xp: 5 } } }
    expect(streak(data)).toBe(1)
  })

  it('is zero once the streak is broken', () => {
    const data: Progress = { ...initial, days: { [offsetDay(-2)]: { seconds: 0, xp: 5 } } }
    expect(streak(data)).toBe(0)
  })

  it('accumulates seconds and XP within the same day', () => {
    const once = activity(initial, 30, 10)
    const twice = activity(once, 40, 5)
    expect(twice.days[dayKey()]).toEqual({ seconds: 70, xp: 15 })
    expect(twice.xp).toBe(15)
  })
})
