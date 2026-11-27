import type { Level } from './curriculum'

type Question = { level: Level; prompt: string; answers: string[]; correct: number; explanation: string }

export const questions: Question[] = [
  { level: 'A1', prompt: 'Bonjour ! Je ___ Linh.', answers: ['m’appelle', 'suis appelle', 't’appelles', 's’appelle'], correct: 0, explanation: 'Je m’appelle đứng trước tên của bạn.' },
  { level: 'A1', prompt: 'Câu nào dùng để hỏi giờ hẹn?', answers: ['Quel âge avez-vous ?', 'À quelle heure ?', 'Quel est votre nom ?', 'Où habitez-vous ?'], correct: 1, explanation: 'À quelle heure ? hỏi sự việc diễn ra lúc mấy giờ.' },
  { level: 'A1', prompt: 'Bạn muốn gọi một cà phê. Bạn nói gì?', answers: ['Je suis un café.', 'J’ai un café.', 'Je voudrais un café.', 'J’aime le café.'], correct: 2, explanation: 'Je voudrais là cách gọi món lịch sự.' },
  { level: 'A2', prompt: 'Hier, nous ___ au musée.', answers: ['allons', 'irons', 'aller', 'sommes allés'], correct: 3, explanation: 'Aller dùng être trong passé composé.' },
  { level: 'A2', prompt: 'Bạn đặt phòng từ thứ Sáu đến Chủ nhật.', answers: ['de vendredi à dimanche', 'à partir de dimanche', 'depuis dimanche', 'pendant vendredi'], correct: 0, explanation: 'De… à… nêu cả mốc đầu và cuối.' },
  { level: 'A2', prompt: 'Elle se lève ___ sept heures tous les matins.', answers: ['en', 'à', 'au', 'pour'], correct: 1, explanation: 'Dùng à trước giờ cụ thể.' },
  { level: 'B1', prompt: 'Quand j’étais petit, je ___ souvent au parc.', answers: ['joue', 'ai joué', 'jouais', 'jouerai'], correct: 2, explanation: 'Imparfait diễn tả một thói quen trong quá khứ.' },
  { level: 'B1', prompt: '« Je lui ai écrit. » Lui thay cho cụm nào?', answers: ['Le message', 'Avec Nora', 'Chez Nora', 'À Nora'], correct: 3, explanation: 'Écrire à quelqu’un dùng lui cho một người.' },
  { level: 'B1', prompt: 'Je travaillerai à Lyon dès que j’___ mon diplôme.', answers: ['aurai obtenu', 'avais obtenu', 'obtenais', 'obtiendrais'], correct: 0, explanation: 'Futur antérieur chỉ việc lấy bằng sẽ hoàn tất trước khi bắt đầu làm.' },
  { level: 'B2', prompt: 'Il faut que vous ___ ce dossier avant midi.', answers: ['finissez', 'finissiez', 'finirez', 'finir'], correct: 1, explanation: 'Sau il faut que dùng subjonctif: vous finissiez.' },
  { level: 'B2', prompt: '___ le coût soit élevé, le projet reste pertinent.', answers: ['Puisque', 'Parce que', 'Bien que', 'Dès que'], correct: 2, explanation: 'Bien que diễn đạt sự nhượng bộ và đi với subjonctif.' },
  { level: 'B2', prompt: '« Faute de preuves, l’enquête a été classée. » Faute de nghĩa là gì?', answers: ['Nhờ có', 'Bất chấp', 'Sau khi xem', 'Vì thiếu'], correct: 3, explanation: 'Faute de preuves nghĩa là vì thiếu bằng chứng.' },
  { level: 'C1', prompt: '« Encore faut-il que l’échantillon soit représentatif. » Câu này có tác dụng gì?', answers: ['Nêu một điều kiện vẫn cần đáp ứng', 'Xác nhận mẫu đã đại diện', 'Bác bỏ hoàn toàn lập luận', 'Kể lại sự việc đã xảy ra'], correct: 0, explanation: 'Encore faut-il nêu một yêu cầu còn phải thỏa mãn.' },
  { level: 'C1', prompt: 'Chọn cách viết trang trọng và thận trọng cho báo cáo nghiên cứu.', answers: ['C’est prouvé, on n’en parle plus.', 'Ces résultats tendent à étayer l’hypothèse.', 'On a forcément raison.', 'Cette idée est carrément vraie.'], correct: 1, explanation: 'Tendent à étayer nêu xu hướng ủng hộ mà không khẳng định tuyệt đối.' },
  { level: 'C1', prompt: '« Cette réserve n’enlève rien à la pertinence de l’analyse. » Ý nào đúng?', answers: ['Phân tích không có giá trị.', 'Không có điểm nào cần lưu ý.', 'Điểm dè dặt ấy không làm giảm giá trị của phân tích.', 'Phải thay toàn bộ phân tích.'], correct: 2, explanation: 'N’enlève rien à nghĩa là không làm suy giảm giá trị của điều được nêu.' },
]
