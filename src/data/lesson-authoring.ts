import type { Chunk, DialogueLine, Lesson, Level } from './curriculum'

type Unit = {
  id: string
  level: Level
  context: string
  role: string
  dialogue: DialogueLine[]
  chunks: Chunk[]
  sounds: [title: string, tip: string, line: number, pair: [string, string]]
  grammar: [question: string, rule: string, exampleLines: [number, number], patterns: [string, string][]]
  fill: [prompt: string, options: [string, string, string], correct: 0 | 1 | 2, feedback: string]
  order: [prompt: string, words: string[], line: number, feedback: string]
  dictate: [line: number, feedback: string]
  translate: [prompt: string, answer: string, feedback: string, variants?: string[]]
  mission: [prompt: string, criteria: [string, string], sample: string]
  listen: [question: string, answers: [string, string, string], correct: 0 | 1 | 2]
}

export function unit(lesson: Unit): Lesson {
  const { id, level, context, role, dialogue, chunks, sounds, grammar, fill, order, dictate, translate, mission, listen } = lesson
  const fr = (line: number) => dialogue[line][1]
  return {
    id, level, context, role, dialogue, chunks,
    minutes: level === 'A1' ? 7 : level === 'A2' || level === 'B1' ? 8 : 9,
    opening: fr(0), hint: fr(1),
    listen: { prompt: listen[0], options: listen[1], correct: listen[2] },
    pronunciation: { title: sounds[0], tip: sounds[1], target: fr(sounds[2]), pairs: [sounds[3]] },
    grammar: { question: grammar[0], rule: grammar[1], examples: grammar[2].map(line => [fr(line), dialogue[line][2]]), rows: grammar[3] },
    exercises: {
      fill: { prompt: fill[0], options: fill[1], answer: fill[1][fill[2]], feedback: fill[3] },
      order: { prompt: order[0], words: order[1], answer: fr(order[2]), feedback: order[3] },
      dictate: { answer: fr(dictate[0]), feedback: dictate[1] },
      translate: { prompt: translate[0], answer: translate[1], feedback: translate[2], variants: translate[3] },
    },
    mission: { prompt: mission[0], criteria: mission[1], sample: mission[2] },
  }
}
