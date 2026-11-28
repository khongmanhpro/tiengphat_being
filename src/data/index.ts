import { a1 } from './a1'
import { advanced } from './advanced'
import { everyday } from './everyday'
import { intermediate } from './intermediate'
import { upper } from './upper'
import { expert } from './expert'
import { a1More } from './a1-more'
import { a1More2 } from './a1-more2'
import { a1More3 } from './a1-more3'
import { a1More4 } from './a1-more4'
import { a1More5 } from './a1-more5'
import { a2More } from './a2-more'
import { a2More2 } from './a2-more2'
import { a2More3 } from './a2-more3'
import { a2More4 } from './a2-more4'
import { a2More5 } from './a2-more5'
import { b1More } from './b1-more'
import { b1More2 } from './b1-more2'
import { b1More3 } from './b1-more3'
import { b1More4 } from './b1-more4'
import { b2More } from './b2-more'
import { b2More2 } from './b2-more2'
import { c1More } from './c1-more'
import { c1More2 } from './c1-more2'
import { curriculum, levels } from './curriculum'
import type { Lesson, Level } from './curriculum'

export { curriculum, levels }
export type { Lesson, Level }
export const lessons = [...a1, ...advanced, ...everyday, ...intermediate, ...upper, ...expert, ...a1More, ...a1More2, ...a1More3, ...a1More4, ...a1More5, ...a2More, ...a2More2, ...a2More3, ...a2More4, ...a2More5, ...b1More, ...b1More2, ...b1More3, ...b1More4, ...b2More, ...b2More2, ...c1More, ...c1More2]
export const lessonsById = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson]))
export const topicFor = (lesson: Lesson) => curriculum[lesson.level].topics.find(([id]) => id === lesson.id)!
export const lessonsAt = (level: Level) => curriculum[level].topics.flatMap(([id]) => lessonsById[id] ? [lessonsById[id]] : [])
