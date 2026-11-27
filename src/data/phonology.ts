import type { Level } from './curriculum'

export type PhonemeCategory = 'nasal' | 'vowel' | 'liaison' | 'elision' | 'mute-e' | 'rhythm' | 'consonant'
export type PhonemeRule = {
  id: string
  category: PhonemeCategory
  level: Level
  title: string
  tip: string
  minimalPairs?: [string, string][]
  examples?: string[]
}

/**
 * A cross-lesson phoneme bank: each rule is written once and referenced by id from
 * `phonologyByLesson`, instead of being re-explained inline in every lesson that touches it.
 * Ordered to read as an A1→C1 progression; add new rules at the point in that progression
 * where a lesson first needs them (see CONTENT.md).
 */
export const phonemeRules: PhonemeRule[] = [
  {
    id: 'nasal-an-in-on',
    category: 'nasal',
    level: 'A1',
    title: 'Nguyên âm mũi /ɑ̃/, /ɛ̃/, /ɔ̃/',
    tip: 'Há miệng và để hơi đi qua mũi, đừng bật thêm âm n ở cuối. /ɑ̃/ (comment, banc) mở miệng rộng; /ɛ̃/ (bientôt, pain) môi mở ngang hơn; /ɔ̃/ (l’addition, bon) tròn môi hơn. Cách đọc viết bằng tiếng Việt chỉ để gợi nhớ, hãy ưu tiên nghe mẫu.',
    minimalPairs: [['bas', 'banc'], ['paix', 'pain'], ['beau', 'bon']],
  },
  {
    id: 'vowel-u-vs-ou',
    category: 'vowel',
    level: 'A1',
    title: 'Phân biệt u /y/ và ou /u/',
    tip: 'Giữ lưỡi ở vị trí khi nói “i”, rồi tròn môi như nói “u” để phát /y/. Với /u/, lưỡi lùi về sau và môi tròn hơn nữa.',
    minimalPairs: [['tu', 'tout'], ['dessus', 'dessous']],
  },
  {
    id: 'liaison-s-and-f',
    category: 'liaison',
    level: 'A1',
    title: 'Âm nối (liaison): s → /z/, f → /v/',
    tip: 'Khi một từ kết thúc bằng phụ âm câm và từ sau bắt đầu bằng nguyên âm, phụ âm đó được đọc nối sang. Chữ s cuối les nối sang amis thành /z/ (les_amis). Trong neuf heures, chữ f của neuf đọc thành /v/.',
    examples: ['les amis → /le.za.mi/', 'neuf heures → /nœ.vœʁ/'],
  },
  {
    id: 'elision-le-la-je',
    category: 'elision',
    level: 'A1',
    title: 'Rút gọn le/la/je… thành l’/j’ trước nguyên âm',
    tip: 'Khi le, la, je, ce, que… đứng trước một từ bắt đầu bằng nguyên âm hoặc h câm, nguyên âm e/a bị lược bỏ và thay bằng dấu lược (’). L’addition thay cho le addition.',
    examples: ['le + addition → l’addition', 'je + arrive → j’arrive'],
  },
  {
    id: 'liaison-nasal-determiner',
    category: 'liaison',
    level: 'B1',
    title: 'Liaison bắt buộc sau mon/un/aucun (nối bằng /n/)',
    tip: 'Khi mon, ton, son, un, aucun… đứng trước một từ bắt đầu bằng nguyên âm, phụ âm mũi cuối được nối sang thành /n/ — đây là liaison bắt buộc, không thể bỏ qua như một số liaison tùy chọn khác.',
    examples: ['mon avis → /mɔ̃.na.vi/', 'un atelier → /ɛ̃.na.tə.lje/'],
  },
  {
    id: 'enchainement-consonne-finale',
    category: 'consonant',
    level: 'B1',
    title: 'Enchaînement: phụ âm cuối vốn đã phát âm, lướt liền sang từ sau',
    tip: 'Enchaînement khác liaison: phụ âm cuối ở đây đã luôn được phát âm (không phải phụ âm câm), chỉ đơn giản lướt liền sang nguyên âm đầu từ sau mà không ngắt nhịp. Dans une heure có cả hai hiện tượng: dans nối sang une bằng liaison (s câm → /z/), còn une nối sang heure bằng enchaînement (n vốn đã phát âm).',
    examples: ['dans une heure → /dɑ̃.zy.nœʁ/'],
  },
]

/** Additive, optional lookup: lessons not listed here simply have no linked phoneme rules yet. */
export const phonologyByLesson: Record<string, string[]> = {
  bonjour: ['nasal-an-in-on'],
  sons: ['vowel-u-vs-ou'],
  heure: ['liaison-s-and-f', 'nasal-an-in-on'],
  cafe: ['elision-le-la-je', 'nasal-an-in-on'],
  avis: ['liaison-nasal-determiner'],
  projets: ['liaison-nasal-determiner'],
  incident: ['enchainement-consonne-finale'],
}
