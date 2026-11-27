import type { Level } from './curriculum'

export type ConjugationGroup = 'auxiliary' | '-er' | '-ir' | '-re' | 'irregular'
export type ConjugationTable = {
  verb: string
  group: ConjugationGroup
  tense: string
  level: Level
  forms: [pronoun: string, form: string][]
  note?: string
}

/**
 * Conjugation tables, keyed by the lesson id that introduces the tense/mood.
 * Populated per lesson as that lesson's grammar point is reached (see CONTENT.md) —
 * empty for a lesson id simply means no structured table has been authored for it yet.
 */
export const conjugations: Record<string, ConjugationTable[]> = {}
