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
export const conjugations: Record<string, ConjugationTable[]> = {
  // "passe" (A2) contrasts imparfait (background) with passé composé (event),
  // using avoir/être, a regular -er verb with each auxiliary, and the irregular faire.
  passe: [
    {
      verb: 'avoir', group: 'auxiliary', tense: 'Présent (trợ động từ)', level: 'A2',
      forms: [['je', 'ai'], ['tu', 'as'], ['il / elle / on', 'a'], ['nous', 'avons'], ['vous', 'avez'], ['ils / elles', 'ont']],
      note: 'Trợ động từ cho hầu hết động từ ở passé composé, ví dụ: la pluie a commencé.',
    },
    {
      verb: 'être', group: 'auxiliary', tense: 'Présent (trợ động từ)', level: 'A2',
      forms: [['je', 'suis'], ['tu', 'es'], ['il / elle / on', 'est'], ['nous', 'sommes'], ['vous', 'êtes'], ['ils / elles', 'sont']],
      note: 'Trợ động từ cho các động từ chỉ di chuyển/trạng thái (rentrer, aller, venir…) và động từ phản thân. Participe passé hòa hợp với chủ ngữ: on est rentrés.',
    },
    {
      verb: 'commencer', group: '-er', tense: 'Passé composé', level: 'A2',
      forms: [['j’', 'ai commencé'], ['tu', 'as commencé'], ['il / elle / on', 'a commencé'], ['nous', 'avons commencé'], ['vous', 'avez commencé'], ['ils / elles', 'ont commencé']],
      note: 'Động từ -er đều: trợ động từ avoir + participe passé -é.',
    },
    {
      verb: 'rentrer', group: '-er', tense: 'Passé composé', level: 'A2',
      forms: [['je', 'suis rentré(e)'], ['tu', 'es rentré(e)'], ['il / elle / on', 'est rentré(e)(s)'], ['nous', 'sommes rentré(e)s'], ['vous', 'êtes rentré(e)(s)'], ['ils / elles', 'sont rentré(e)s']],
      note: 'Động từ đi với être: participe passé hòa hợp giống/số với chủ ngữ.',
    },
    {
      verb: 'faire', group: 'irregular', tense: 'Imparfait', level: 'A2',
      forms: [['je', 'faisais'], ['tu', 'faisais'], ['il / elle / on', 'faisait'], ['nous', 'faisions'], ['vous', 'faisiez'], ['ils / elles', 'faisaient']],
      note: 'Gốc fais- (từ nous faisons) + đuôi imparfait -ais/-ais/-ait/-ions/-iez/-aient.',
    },
    {
      verb: 'se promener', group: '-er', tense: 'Imparfait', level: 'A2',
      forms: [['je', 'me promenais'], ['tu', 'te promenais'], ['il / elle / on', 'se promenait'], ['nous', 'nous promenions'], ['vous', 'vous promeniez'], ['ils / elles', 'se promenaient']],
      note: 'Đuôi imparfait đều cho mọi động từ (trừ être): -ais/-ais/-ait/-ions/-iez/-aient, gắn vào gốc hiện tại nous (promen-).',
    },
  ],
  // "projets" (B1) contrasts futur proche (déjà décidé) với futur simple/antérieur
  // (dự định hoặc việc sẽ hoàn tất trước một mốc tương lai khác).
  projets: [
    {
      verb: 'avoir', group: 'auxiliary', tense: 'Futur simple (trợ động từ)', level: 'B1',
      forms: [['je', 'aurai'], ['tu', 'auras'], ['il / elle / on', 'aura'], ['nous', 'aurons'], ['vous', 'aurez'], ['ils / elles', 'auront']],
      note: 'Trợ động từ cho hầu hết động từ ở futur antérieur, ví dụ: j’aurai réservé.',
    },
    {
      verb: 'confirmer', group: '-er', tense: 'Futur simple', level: 'B1',
      forms: [['je', 'confirmerai'], ['tu', 'confirmeras'], ['il / elle / on', 'confirmera'], ['nous', 'confirmerons'], ['vous', 'confirmerez'], ['ils / elles', 'confirmeront']],
      note: 'Động từ -er đều: giữ nguyên động từ nguyên mẫu làm gốc, thêm đuôi futur simple -ai/-as/-a/-ons/-ez/-ont.',
    },
    {
      verb: 'réserver', group: '-er', tense: 'Futur antérieur', level: 'B1',
      forms: [['j’', 'aurai réservé'], ['tu', 'auras réservé'], ['il / elle / on', 'aura réservé'], ['nous', 'aurons réservé'], ['vous', 'aurez réservé'], ['ils / elles', 'auront réservé']],
      note: 'Futur antérieur = futur simple của avoir/être + participe passé, chỉ việc sẽ hoàn tất trước một việc tương lai khác: quand j’aurai réservé la salle, je confirmerai la date.',
    },
  ],
  // "subjonctif" (B2) contrasts indicatif (khẳng định) với subjonctif (điều cần thiết/nghi
  // ngờ), dùng être (bất quy tắc) và vérifier (-er đều) — cả hai đều xuất hiện trong hội thoại.
  subjonctif: [
    {
      verb: 'être', group: 'irregular', tense: 'Présent du subjonctif', level: 'B2',
      forms: [['que je', 'sois'], ['que tu', 'sois'], ['qu’il / elle / on', 'soit'], ['que nous', 'soyons'], ['que vous', 'soyez'], ['qu’ils / elles', 'soient']],
      note: 'Mọi mệnh đề subjonctif luôn có que/qu’ đứng trước. Gốc sois-/soy- là bất quy tắc, không liên quan tới hiện tại thường (suis, es, est…).',
    },
    {
      verb: 'vérifier', group: '-er', tense: 'Présent du subjonctif', level: 'B2',
      forms: [['que je', 'vérifie'], ['que tu', 'vérifies'], ['qu’il / elle / on', 'vérifie'], ['que nous', 'vérifiions'], ['que vous', 'vérifiiez'], ['qu’ils / elles', 'vérifient']],
      note: 'Động từ đều: gốc lấy từ ils/elles ở hiện tại (vérifi-) + đuôi -e/-es/-e/-ions/-iez/-ent. Với các động từ -ier, que nous vérifiions viết giống hệt imparfait nous vérifiions — chỉ phân biệt được nhờ que đứng trước.',
    },
  ],
}
