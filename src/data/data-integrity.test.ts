import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { curriculum, lessonsById, lessons, lessonsAt, levels } from './index'
import { conjugations } from './conjugation'
import { phonemeRules, phonologyByLesson } from './phonology'
import { questions as placementQuestions } from './placement'
import { practiceCues, starterPractice } from './starter-practice'
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

describe('conjugation tables', () => {
  for (const [lessonId, tables] of Object.entries(conjugations)) {
    it(`"${lessonId}" is a real lesson id`, () => expect(lessonsById[lessonId]).toBeDefined())

    for (const table of tables) {
      describe(`${lessonId}: ${table.verb} (${table.tense})`, () => {
        it('has six non-empty pronoun/form pairs with no duplicate pronoun', () => {
          expect(table.forms).toHaveLength(6)
          for (const [pronoun, form] of table.forms) {
            expect(pronoun.trim()).not.toBe('')
            expect(form.trim()).not.toBe('')
          }
          expect(new Set(table.forms.map(([pronoun]) => pronoun)).size).toBe(6)
        })
      })
    }
  }
})

describe('placement test questions', () => {
  it('is not empty', () => expect(placementQuestions.length).toBeGreaterThan(0))

  for (const [at, question] of placementQuestions.entries()) {
    describe(`question ${at + 1} (${question.level})`, () => {
      it('has a non-empty prompt and explanation', () => {
        expect(question.prompt.trim()).not.toBe('')
        expect(question.explanation.trim()).not.toBe('')
      })

      it('has at least two non-empty, non-duplicate answers', () => {
        expect(question.answers.length).toBeGreaterThanOrEqual(2)
        for (const answer of question.answers) expect(answer.trim()).not.toBe('')
        expect(new Set(question.answers).size).toBe(question.answers.length)
      })

      it('has a correct index within range', () => {
        expect(question.correct).toBeGreaterThanOrEqual(0)
        expect(question.correct).toBeLessThan(question.answers.length)
      })

      if (question.audio !== undefined) {
        it('has non-empty audio text', () => expect(question.audio!.trim()).not.toBe(''))
      }
    })
  }

  for (const level of levels) {
    it(`has at least one question for ${level}`, () => {
      expect(placementQuestions.some(question => question.level === level)).toBe(true)
    })
  }
})

describe('guided conversation practice (starter-practice)', () => {
  it('is not empty', () => expect(starterPractice.length).toBeGreaterThan(0))

  for (const item of starterPractice) {
    it(`"${item.id}" is a real lesson id`, () => expect(lessonsById[item.id]).toBeDefined())
  }

  for (const [lessonId, turns] of Object.entries(practiceCues)) {
    describe(lessonId, () => {
      const lesson = lessonsById[lessonId]

      it('is a real lesson id', () => expect(lesson).toBeDefined())

      it('has no more cue turns than the lesson has "Linh" dialogue lines', () => {
        const linhTurns = lesson.dialogue.filter(([speaker]) => speaker === 'Linh').length
        expect(turns.length).toBeLessThanOrEqual(linhTurns)
      })

      for (const [at, cues] of turns.entries()) {
        describe(`turn ${at + 1}`, () => {
          it('has at least one cue', () => expect(cues.length).toBeGreaterThan(0))

          for (const cue of cues) {
            it(`"${cue.goal}" has a non-empty hint and at least one pattern`, () => {
              expect(cue.goal.trim()).not.toBe('')
              expect(cue.hint.trim()).not.toBe('')
              expect(cue.patterns.length).toBeGreaterThan(0)
            })
          }
        })
      }
    })
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
