import type { Level } from './curriculum'

/**
 * `audio`, when present, is spoken via `speak()` (see `src/speech.ts`) instead of read —
 * the question is a listening item, not a reading one. It's independent of the French
 * text shown in `prompt`/`answers`, so a listening question's prompt can describe the
 * task in Vietnamese while `audio` carries the one French word/phrase to play.
 */
type Question = { level: Level; prompt: string; answers: string[]; correct: number; explanation: string; audio?: string }

export const questions: Question[] = [
  { level: 'A1', prompt: 'Bonjour ! Je ___ Linh.', answers: ['m’appelle', 'suis appelle', 't’appelles', 's’appelle'], correct: 0, explanation: 'Je m’appelle đứng trước tên của bạn.' },
  { level: 'A1', prompt: 'Câu nào dùng để hỏi giờ hẹn?', answers: ['Quel âge avez-vous ?', 'À quelle heure ?', 'Quel est votre nom ?', 'Où habitez-vous ?'], correct: 1, explanation: 'À quelle heure ? hỏi sự việc diễn ra lúc mấy giờ.' },
  { level: 'A1', prompt: 'Bạn muốn gọi một cà phê. Bạn nói gì?', answers: ['Je suis un café.', 'J’ai un café.', 'Je voudrais un café.', 'J’aime le café.'], correct: 2, explanation: 'Je voudrais là cách gọi món lịch sự.' },
  { level: 'A1', prompt: 'Ils ___ bien le français.', answers: ['parle', 'parles', 'parlent', 'parlons'], correct: 2, explanation: 'Chủ ngữ ils/elles đi với đuôi -ent ở thì hiện tại.' },
  { level: 'A1', prompt: 'Non merci, je ___ faim.', answers: ['ai', 'n’ai', 'suis', 'n’es'], correct: 1, explanation: 'Phủ định ne (n’)…pas bao quanh động từ: je n’ai pas faim.' },
  { level: 'A1', prompt: 'Nghe và chọn từ bạn vừa nghe.', answers: ['bas', 'banc', 'beau', 'bon'], correct: 1, explanation: 'Nguyên âm mũi /ɑ̃/ trong banc: há miệng rộng, hơi đi qua mũi, không bật thêm âm n.', audio: 'banc' },
  { level: 'A1', prompt: 'Nghe và chọn từ bạn vừa nghe.', answers: ['tu', 'tout', 'vous', 'deux'], correct: 0, explanation: 'Phân biệt u /y/ (tu) và ou /u/ (tout): với /y/, giữ lưỡi như khi nói “i” rồi tròn môi.', audio: 'tu' },
  { level: 'A1', prompt: 'Nghe cụm từ và chọn cách đọc đúng.', answers: ['/le.ami/ (không nối)', '/le.za.mi/ (nối s→z)', '/le.sami/ (đọc s rõ)', '/le.ami/ (bỏ âm s)'], correct: 1, explanation: 'Âm nối (liaison): s cuối les nối sang amis bắt đầu bằng nguyên âm, đọc thành /z/.', audio: 'les amis' },
  { level: 'A2', prompt: 'Hier, nous ___ au musée.', answers: ['allons', 'irons', 'aller', 'sommes allés'], correct: 3, explanation: 'Aller dùng être trong passé composé.' },
  { level: 'A2', prompt: 'Bạn đặt phòng từ thứ Sáu đến Chủ nhật.', answers: ['de vendredi à dimanche', 'à partir de dimanche', 'depuis dimanche', 'pendant vendredi'], correct: 0, explanation: 'De… à… nêu cả mốc đầu và cuối.' },
  { level: 'A2', prompt: 'Elle se lève ___ sept heures tous les matins.', answers: ['en', 'à', 'au', 'pour'], correct: 1, explanation: 'Dùng à trước giờ cụ thể.' },
  { level: 'A2', prompt: 'Paris est ___ grand que Lyon.', answers: ['plus', 'autant', 'moins de', 'très'], correct: 0, explanation: 'So sánh hơn với tính từ: plus + adjectif + que.' },
  { level: 'A2', prompt: 'Demain, je ___ au cinéma.', answers: ['vais aller', 'va aller', 'allez aller', 'vont aller'], correct: 0, explanation: 'Futur proche: aller chia theo chủ ngữ (je vais) + động từ nguyên mẫu.' },
  { level: 'A2', prompt: 'Nghe và chọn từ bạn vừa nghe.', answers: ['paix', 'pain', 'beau', 'bon'], correct: 1, explanation: 'Nguyên âm mũi /ɛ̃/ trong pain: môi mở ngang hơn /ɑ̃/, hơi đi qua mũi.', audio: 'pain' },
  { level: 'A2', prompt: 'Nghe và chọn từ bạn vừa nghe.', answers: ['dessus', 'dessous', 'tu', 'tout'], correct: 1, explanation: 'Dessous có /u/: lưỡi lùi về sau, môi tròn hơn dessus (/y/).', audio: 'dessous' },
  { level: 'A2', prompt: 'Nghe cụm từ và chọn cách đọc đúng.', answers: ['/nœf.œʁ/ (đọc f rõ)', '/nœ.vœʁ/ (nối f→v)', '/nœ.œʁ/ (bỏ âm f)', '/nœf.ʃœʁ/'], correct: 1, explanation: 'Âm nối (liaison): f cuối neuf nối sang heures bắt đầu bằng nguyên âm, đọc thành /v/.', audio: 'neuf heures' },
  { level: 'B1', prompt: 'Quand j’étais petit, je ___ souvent au parc.', answers: ['joue', 'ai joué', 'jouais', 'jouerai'], correct: 2, explanation: 'Imparfait diễn tả một thói quen trong quá khứ.' },
  { level: 'B1', prompt: '« Je lui ai écrit. » Lui thay cho cụm nào?', answers: ['Le message', 'Avec Nora', 'Chez Nora', 'À Nora'], correct: 3, explanation: 'Écrire à quelqu’un dùng lui cho một người.' },
  { level: 'B1', prompt: 'Je travaillerai à Lyon dès que j’___ mon diplôme.', answers: ['aurai obtenu', 'avais obtenu', 'obtenais', 'obtiendrais'], correct: 0, explanation: 'Futur antérieur chỉ việc lấy bằng sẽ hoàn tất trước khi bắt đầu làm.' },
  { level: 'B1', prompt: 'Si j’avais le temps, je ___ avec toi.', answers: ['viendrai', 'viendrais', 'venais', 'viens'], correct: 1, explanation: 'Si + imparfait, mệnh đề chính chia ở conditionnel présent: je viendrais.' },
  { level: 'B1', prompt: 'C’est le livre ___ je t’ai parlé.', answers: ['que', 'qui', 'dont', 'où'], correct: 2, explanation: 'Parler de quelque chose → đại từ quan hệ dont thay cho de + chose.' },
  { level: 'B1', prompt: 'Nghe và chọn từ bạn vừa nghe.', answers: ['bas', 'beau', 'bon', 'banc'], correct: 2, explanation: 'Nguyên âm mũi /ɔ̃/ trong bon: môi tròn hơn /ɑ̃/ và /ɛ̃/.', audio: 'bon' },
  { level: 'B1', prompt: 'Nghe và chọn từ được rút gọn (elision) đúng.', answers: ['le addition', 'l’addition', 'la addition', 'les addition'], correct: 1, explanation: 'Elision: le đứng trước từ bắt đầu bằng nguyên âm (addition) rút gọn thành l’.', audio: 'l’addition' },
  { level: 'B1', prompt: 'Nghe và chọn từ được rút gọn (elision) đúng.', answers: ['je arrive', 'j’arrive', 'je arrives', 'tu arrive'], correct: 1, explanation: 'Elision: je đứng trước từ bắt đầu bằng nguyên âm (arrive) rút gọn thành j’.', audio: 'j’arrive' },
  { level: 'B2', prompt: 'Il faut que vous ___ ce dossier avant midi.', answers: ['finissez', 'finissiez', 'finirez', 'finir'], correct: 1, explanation: 'Sau il faut que dùng subjonctif: vous finissiez.' },
  { level: 'B2', prompt: '___ le coût soit élevé, le projet reste pertinent.', answers: ['Puisque', 'Parce que', 'Bien que', 'Dès que'], correct: 2, explanation: 'Bien que diễn đạt sự nhượng bộ và đi với subjonctif.' },
  { level: 'B2', prompt: '« Faute de preuves, l’enquête a été classée. » Faute de nghĩa là gì?', answers: ['Nhờ có', 'Bất chấp', 'Sau khi xem', 'Vì thiếu'], correct: 3, explanation: 'Faute de preuves nghĩa là vì thiếu bằng chứng.' },
  { level: 'C1', prompt: '« Encore faut-il que l’échantillon soit représentatif. » Câu này có tác dụng gì?', answers: ['Nêu một điều kiện vẫn cần đáp ứng', 'Xác nhận mẫu đã đại diện', 'Bác bỏ hoàn toàn lập luận', 'Kể lại sự việc đã xảy ra'], correct: 0, explanation: 'Encore faut-il nêu một yêu cầu còn phải thỏa mãn.' },
  { level: 'C1', prompt: 'Chọn cách viết trang trọng và thận trọng cho báo cáo nghiên cứu.', answers: ['C’est prouvé, on n’en parle plus.', 'Ces résultats tendent à étayer l’hypothèse.', 'On a forcément raison.', 'Cette idée est carrément vraie.'], correct: 1, explanation: 'Tendent à étayer nêu xu hướng ủng hộ mà không khẳng định tuyệt đối.' },
  { level: 'C1', prompt: '« Cette réserve n’enlève rien à la pertinence de l’analyse. » Ý nào đúng?', answers: ['Phân tích không có giá trị.', 'Không có điểm nào cần lưu ý.', 'Điểm dè dặt ấy không làm giảm giá trị của phân tích.', 'Phải thay toàn bộ phân tích.'], correct: 2, explanation: 'N’enlève rien à nghĩa là không làm suy giảm giá trị của điều được nêu.' },
]
