import { a1 } from './a1'
import { advanced } from './advanced'
import { everyday } from './everyday'
import { intermediate } from './intermediate'
import { upper } from './upper'
import { expert } from './expert'
import { a1More } from './a1-more'
import { a2More } from './a2-more'
import { curriculum, levels } from './curriculum'
import type { Lesson, Level } from './curriculum'

export { curriculum, levels }
export type { Lesson, Level }
export const lessons = [...a1, ...advanced, ...everyday, ...intermediate, ...upper, ...expert, ...a1More, ...a2More]
export const lessonsById = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson]))
export const topicFor = (lesson: Lesson) => curriculum[lesson.level].topics.find(([id]) => id === lesson.id)!
export const lessonsAt = (level: Level) => curriculum[level].topics.flatMap(([id]) => lessonsById[id] ? [lessonsById[id]] : [])
