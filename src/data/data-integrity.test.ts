import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { curriculum, lessonsById, lessons, lessonsAt, levels } from './index'
import { phonemeRules, phonologyByLesson } from './phonology'
import voiceSamples from './voice-samples.json'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const ipaPattern = /^\/.+\/$/

describe('lesson content', () => {
  for (const lesson of lessons) {
    describe(lesson.id, () => {
      it('has non-empty pronunciation, grammar, and mission fields', () => {
        expect(lesson.pronunciation.tip.trim()).not.toBe('')
        expect(lesson.pronunciation.target.trim()).not.toBe('')
        expect(lesson.grammar.question.trim()).not.toBe('')
        expect(lesson.grammar.rule.trim()).not.toBe('')
        expect(lesson.mission.prompt.trim()).not.toBe('')
        expect(lesson.mission.sample.trim()).not.toBe('')
      })

      it('has non-empty feedback on every exercise', () => {
        for (const exercise of Object.values(lesson.exercises)) expect(exercise.feedback.trim()).not.toBe('')
      })

      it('gives every chunk a non-empty IPA transcription', () => {
        for (const [fr, vi, ipa, approximation, , example, exampleVi] of lesson.chunks) {
          expect(fr.trim()).not.toBe('')
          expect(vi.trim()).not.toBe('')
          expect(approximation.trim()).not.toBe('')
          expect(example.trim()).not.toBe('')
          expect(exampleVi.trim()).not.toBe('')
          expect(ipa).toMatch(ipaPattern)
        }
      })

      it('involves at least two speakers in its dialogue', () => {
        // Most lessons are a two-person exchange; a few (e.g. C1 "mediation") involve a
        // third party on purpose, so this only guards against a missing/duplicated speaker.
        const speakers = new Set(lesson.dialogue.map(([speaker]) => speaker))
        expect(speakers.size).toBeGreaterThanOrEqual(2)
        expect(speakers.size).toBeLessThanOrEqual(3)
      })
    })
  }
})

describe('curriculum <-> lesson consistency', () => {
  for (const level of levels) {
    it(`every ${level} topic resolves to exactly one lesson`, () => {
      const topicIds = curriculum[level].topics.map(([id]) => id)
      const lessonIds = lessonsAt(level).map(lesson => lesson.id)
      expect(lessonIds).toEqual(topicIds)
    })
  }

  it('every lesson belongs to the level its id is registered under', () => {
    for (const level of levels) for (const lesson of lessonsAt(level)) expect(lesson.level).toBe(level)
  })
})

describe('phonology bank', () => {
  const ruleIds = new Set(phonemeRules.map(rule => rule.id))

  it('has no duplicate rule ids', () => expect(ruleIds.size).toBe(phonemeRules.length))

  for (const [lessonId, ids] of Object.entries(phonologyByLesson)) {
    it(`"${lessonId}" is a real lesson id`, () => expect(lessonsById[lessonId]).toBeDefined())
    for (const id of ids) {
      it(`"${lessonId}" -> "${id}" resolves to a real phoneme rule`, () => expect(ruleIds.has(id)).toBe(true))
    }
  }
})

describe('voice sample audio files', () => {
  const entries = Object.entries(voiceSamples as Record<string, string>)

  it('is not empty', () => expect(entries.length).toBeGreaterThan(0))

  for (const [text, path] of entries) {
    it(`"${text.slice(0, 40)}" points to an existing file`, () => {
      expect(existsSync(join(root, 'public', path))).toBe(true)
    })
  }
})
