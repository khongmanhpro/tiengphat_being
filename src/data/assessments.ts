import type { Level } from './curriculum'

export type ComprehensionQuestion = {
  prompt: string
  options: [string, string, string]
  correct: 0 | 1 | 2
  explain: string
}
type Passage = {
  title: string
  text: string
  questions: ComprehensionQuestion[]
}
type Criterion = { label: string; evidence: string }
type Production = {
  prompt: string
  sample: string
  criteria: Criterion[]
}
export type Assessment = {
  title: string
  context: string
  oral: Passage
  reading: Passage
  speaking: Production & { duration: string; followUp: string }
  writing: Production & { words: [number, number] }
}

const q = (prompt: string, options: [string, string, string], correct: 0 | 1 | 2, explain: string): ComprehensionQuestion => ({ prompt, options, correct, explain })
const criterion = (label: string, evidence: string): Criterion => ({ label, evidence })

export const assessments: Record<Level, Assessment> = {
  A1: {
    title: 'Hẹn bạn ở quán cà phê',
    context: 'Bạn mới quen Léa và hai người muốn hẹn gặp. Hãy nghe lời nhắn, đọc thông tin quán, rồi xác nhận bằng lời nói và tin nhắn.',
    oral: {
      title: 'Lời nhắn của Léa',
      text: 'Salut ! C’est Léa. On se retrouve samedi à dix heures, devant le Café des Fleurs ? Le café est près de la gare. À samedi !',
      questions: [
        q('Léa đề xuất gặp ngày nào?', ['Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'], 1, 'Samedi là thứ Bảy.'),
        q('Hai người hẹn lúc mấy giờ?', ['8 giờ', '10 giờ', '12 giờ'], 1, 'À dix heures chỉ giờ hẹn.'),
        q('Quán ở gần đâu?', ['Gần nhà ga', 'Gần bệnh viện', 'Gần trường học'], 0, 'Près de la gare nghĩa là gần nhà ga.'),
      ],
    },
    reading: {
      title: 'Bảng thông tin quán',
      text: 'Café des Fleurs\nSamedi · 8 h – 13 h\nDimanche · fermé\nCafé 2 € · Thé 3 € · Croissant 2 €\n12, rue de la Gare',
      questions: [
        q('Thứ Bảy quán đóng lúc nào?', ['8 giờ', '12 giờ', '13 giờ'], 2, 'Dòng Samedi cho khoảng mở cửa từ 8 đến 13 giờ.'),
        q('Một trà và một bánh sừng bò hết bao nhiêu?', ['4 €', '5 €', '6 €'], 1, 'Thé 3 € cộng croissant 2 € là 5 €.'),
        q('Chủ nhật quán thế nào?', ['Đóng cửa', 'Mở từ 8 giờ', 'Mở sau 13 giờ'], 0, 'Fermé nghĩa là đóng cửa.'),
      ],
    },
    speaking: {
      duration: '30–45 giây',
      prompt: 'Giới thiệu tên, xác nhận giờ và nơi gặp. Sau đó nói bạn muốn gọi món gì.',
      followUp: 'Tu veux un café ou un thé ?',
      sample: 'Salut Léa ! Je m’appelle Linh. Samedi, à dix heures, devant le Café des Fleurs. Je voudrais un thé et un croissant, s’il te plaît.',
      criteria: [
        criterion('Nói được tên', 'Người nghe biết bạn tên gì.'),
        criterion('Xác nhận giờ và nơi', 'Bạn nêu thứ Bảy, 10 giờ và tên quán.'),
        criterion('Gọi được một món', 'Tên món đủ rõ và dùng được một cách gọi lịch sự.'),
      ],
    },
    writing: {
      words: [20, 40],
      prompt: 'Nhắn Léa rằng bạn đồng ý gặp. Tự giới thiệu tên, xác nhận giờ và nơi, rồi hỏi bạn ấy muốn uống gì.',
      sample: 'Salut Léa ! Je m’appelle Linh. On se retrouve samedi à dix heures devant le Café des Fleurs. Tu veux un café ou un thé ? À samedi !',
      criteria: [
        criterion('Có lời chào và tên', 'Léa biết ai đang nhắn.'),
        criterion('Thông tin hẹn chính xác', 'Tin nhắn giữ đúng ngày, giờ và địa điểm.'),
        criterion('Có một câu hỏi đơn giản', 'Léa có thể trả lời muốn uống gì.'),
      ],
    },
  },
  A2: {
    title: 'Đổi lượt đặt phòng cuối tuần',
    context: 'Bạn đến muộn hơn dự kiến. Kiểm tra phương án của khách sạn, rồi nhắn lại để đổi ngày và xác nhận các chi tiết.',
    oral: {
      title: 'Tin nhắn của lễ tân',
      text: 'Bonjour, ici l’hôtel des Voyageurs. Votre arrivée est prévue vendredi, mais vous pouvez arriver samedi sans supplément. Si vous souhaitez rester deux nuits, le départ sera lundi. La réception ferme à vingt heures. Si vous pensez arriver après, appelez-nous avant dix-huit heures.',
      questions: [
        q('Đổi ngày đến sang thứ Bảy có tốn phí không?', ['Có thêm phí', 'Không thêm phí', 'Chưa có thông tin về phí'], 1, 'Sans supplément nghĩa là không thu thêm phí.'),
        q('Nếu đến thứ Bảy và ở hai đêm thì ngày về là khi nào?', ['Thứ Hai', 'Thứ Ba', 'Chủ nhật'], 0, 'Lễ tân nói le départ sera lundi.'),
        q('Nếu đến sau 20 giờ, cần gọi trước mấy giờ?', ['16 giờ', '20 giờ', '18 giờ'], 2, 'Lễ tân yêu cầu appelez-nous avant dix-huit heures.'),
      ],
    },
    reading: {
      title: 'Thông tin phòng',
      text: 'Chambre double · 78 € la nuit. Petit-déjeuner en option, 9 € par personne. L’arrivée se fait entre 15 h et 20 h. Pour modifier les dates, répondez à ce message en indiquant votre nom et votre référence. Une modification est possible jusqu’à la veille de l’arrivée.',
      questions: [
        q('Bữa sáng có nằm trong giá phòng không?', ['Có, luôn bao gồm', 'Không, đặt thêm với giá 9 € mỗi người', 'Có, nhưng chỉ thứ Bảy'], 1, 'En option và 9 € par personne cho biết bữa sáng là lựa chọn tính thêm.'),
        q('Khi xin đổi ngày, cần gửi thông tin nào?', ['Tên và mã đặt phòng', 'Địa chỉ nhà và hộ chiếu', 'Tên người đón và số tàu'], 0, 'Nom và référence là hai thông tin cần ghi.'),
        q('Có thể thay đổi đến lúc nào?', ['Đến ngày trả phòng', 'Đến lúc lễ tân đóng', 'Đến ngày trước hôm đến'], 2, 'La veille de l’arrivée là ngày ngay trước ngày đến.'),
      ],
    },
    speaking: {
      duration: '45–60 giây',
      prompt: 'Gọi lễ tân, nói bạn sẽ đến thứ Bảy thay vì thứ Sáu và muốn ở hai đêm. Hỏi thêm về bữa sáng.',
      followUp: 'Vous pensez arriver à quelle heure samedi ?',
      sample: 'Bonjour, j’ai réservé une chambre pour vendredi. Mon rendez-vous a changé, alors je voudrais arriver samedi et rester deux nuits. Est-ce que je peux partir lundi ? Je pense arriver vers dix-neuf heures. Est-ce que le petit-déjeuner est compris ?',
      criteria: [
        criterion('Nói rõ điều cần thay đổi', 'Lễ tân nghe được ngày cũ và ngày mới.'),
        criterion('Xác nhận thời lượng ở', 'Bạn nói ở hai đêm hoặc nhắc ngày trả phòng.'),
        criterion('Hỏi rồi đáp thông tin cụ thể', 'Bạn hỏi về bữa sáng và trả lời giờ đến dự kiến.'),
      ],
    },
    writing: {
      words: [50, 80],
      prompt: 'Viết email đổi lượt đặt phòng. Dùng tên Linh Nguyen và mã V42. Giải thích ngắn vì sao đến muộn, đề xuất ở từ thứ Bảy đến thứ Hai và hỏi cách nhận phòng sau 20 giờ.',
      sample: 'Bonjour,\nJe m’appelle Linh Nguyen et ma réservation porte la référence V42. Mon train de vendredi a été annulé. Je voudrais donc arriver samedi et repartir lundi. Mon nouveau train arrive à vingt heures quinze. Est-ce que je peux prendre la chambre après vingt heures ? Merci de me confirmer la modification et de m’indiquer comment entrer à l’hôtel.\nCordialement,\nLinh Nguyen',
      criteria: [
        criterion('Khách sạn xác định được lượt đặt', 'Có tên và mã V42.'),
        criterion('Trình bày hoàn cảnh và ngày mới', 'Có lý do, thứ Bảy và thứ Hai.'),
        criterion('Đưa một yêu cầu cụ thể', 'Bạn hỏi phải làm gì nếu đến sau 20 giờ.'),
      ],
    },
  },
  B1: {
    title: 'Xử lý sự cố trước buổi họp',
    context: 'Tàu đến một buổi họp đã bị hủy. Bạn cần so sánh các phương án và báo một kế hoạch mới cho đội.',
    oral: {
      title: 'Thông báo nhà ga',
      text: 'En raison d’un problème technique, le train de huit heures dix pour Lyon est annulé. Le train de neuf heures vingt partira du quai quatre. Les billets du train annulé seront acceptés sans frais sur ce départ. Un car de remplacement part à huit heures quarante-cinq devant la gare, mais sa durée de trajet est supérieure à deux heures.',
      questions: [
        q('Vì sao chuyến 8 giờ 10 bị hủy?', ['Vì sự cố kỹ thuật', 'Vì đình công', 'Vì thời tiết xấu'], 0, 'Un problème technique nêu nguyên nhân.'),
        q('Dùng vé cũ lên tàu 9 giờ 20 thì sao?', ['Đóng thêm phí', 'Được chấp nhận miễn phí', 'Phải hoàn vé trước'], 1, 'Acceptés sans frais nói rõ vé cũ được dùng mà không mất phí.'),
        q('Điểm bất lợi của xe thay thế là gì?', ['Rời ga sau tàu 9 giờ 20', 'Không dừng tại ga', 'Đi hơn hai tiếng'], 2, 'Supérieure à deux heures cho biết hành trình kéo dài hơn hai giờ.'),
      ],
    },
    reading: {
      title: 'Email từ đồng nghiệp',
      text: 'Objet : réunion de ce matin\nBonjour Linh,\nLa réunion commence à 10 h 30. Si tu arrives en retard, nous pouvons présenter le budget sans toi. En revanche, le client souhaite que tu répondes aux questions sur le lancement à 11 h 15. La salle possède un lien de visioconférence. Peux-tu me dire avant 9 h quel transport tu prends et si tu pourras te connecter ?\nMerci,\nCamille',
      questions: [
        q('Đội có thể tự trình bày phần nào?', ['Phần ngân sách', 'Phần kế hoạch ra mắt', 'Toàn bộ cuộc họp'], 0, 'Présenter le budget là phần đội có thể tự làm.'),
        q('Linh cần sẵn sàng trả lời khách lúc nào?', ['9 giờ', '10 giờ 30', '11 giờ 15'], 2, 'Le client souhaite des réponses à 11 h 15.'),
        q('Camille cần phản hồi trước khi nào?', ['Trước 9 giờ', 'Trước 10 giờ 30', 'Sau buổi họp'], 0, 'Avant 9 h là hạn trả lời.'),
      ],
    },
    speaking: {
      duration: '1–2 phút',
      prompt: 'Báo đã xảy ra chuyện gì. So sánh tàu 9 giờ 20 và xe thay thế, chọn một phương án, rồi nêu dự phòng để trả lời khách lúc 11 giờ 15.',
      followUp: 'Et si le réseau ne fonctionne pas pendant le trajet ?',
      sample: 'Mon train de huit heures dix a été annulé. Je vais prendre celui de neuf heures vingt, car mon billet reste valable. Le car part plus tôt, mais le trajet dure plus de deux heures. Si je suis encore en déplacement à onze heures quinze, je me connecterai en vidéo depuis un endroit calme. Si la connexion ne fonctionne pas, je vous enverrai mes réponses avant la réunion.',
      criteria: [
        criterion('Giải thích được sự cố', 'Người nghe biết chuyến nào bị hủy và chuyện đó ảnh hưởng thế nào.'),
        criterion('Nêu lựa chọn có lý do', 'Bạn đối chiếu thời gian hoặc chi phí của hai phương án.'),
        criterion('Có dự phòng khả thi', 'Bạn đề cập mốc 11 giờ 15 và trả lời về vấn đề kết nối.'),
      ],
    },
    writing: {
      words: [80, 125],
      prompt: 'Trả lời email của Camille. Giải thích sự cố, nói phương tiện bạn chọn và lý do, rồi nêu cách bạn sẽ tham gia phần hỏi đáp nếu đến muộn.',
      sample: 'Bonjour Camille,\nMon train de 8 h 10 pour Lyon a été annulé à cause d’un problème technique. Je vais prendre celui de 9 h 20, car je peux utiliser mon billet sans frais supplémentaires. Le car part plus tôt, mais le trajet dure plus de deux heures.\nTu peux commencer la présentation du budget sans moi. Si je ne suis pas à la salle à 11 h 15, je rejoindrai la réunion grâce au lien vidéo pour répondre aux questions sur le lancement. Je t’enverrai mes notes avant 10 h en cas de problème de connexion.\nMerci,\nLinh',
      criteria: [
        criterion('Nối sự cố với lựa chọn', 'Nêu chuyến bị hủy, chuyến mới và lý do.'),
        criterion('Phân công và báo dự phòng rõ', 'Camille biết phần nào tự làm và cách Linh tham gia lúc 11 giờ 15.'),
        criterion('Các ý nối thành email đọc được', 'Dùng vài từ nối đơn giản như car, mais, si hoặc donc.'),
      ],
    },
  },
  B2: {
    title: 'Bảo vệ đề xuất dùng xe buýt',
    context: 'Thành phố thảo luận việc giảm giá xe buýt cuối tuần. Hãy đọc số liệu, nghe ý kiến trái chiều rồi đưa đề xuất có điều kiện.',
    oral: {
      title: 'Hai ý kiến trong buổi tham vấn',
      text: 'L’adjointe aux transports estime qu’un tarif réduit le samedi pourrait attirer des personnes qui utilisent aujourd’hui leur voiture. Elle propose une expérimentation de trois mois. Le représentant des conducteurs soutient l’objectif, mais rappelle que les bus du centre sont déjà pleins aux heures de pointe. Selon lui, il faudrait d’abord renforcer les lignes les plus chargées. Sans cela, le prix baissera, mais les temps d’attente risquent d’augmenter.',
      questions: [
        q('Phó phụ trách giao thông chủ yếu đề xuất gì?', ['Giảm giá vĩnh viễn ngay', 'Thử giảm giá trong ba tháng', 'Giảm số xe vào thứ Bảy'], 1, 'Une expérimentation de trois mois là thử nghiệm ba tháng.'),
        q('Đại diện tài xế phản biện về điểm nào?', ['Năng lực phục vụ vào giờ cao điểm', 'Giá xăng của xe cá nhân', 'Chất lượng vé điện tử'], 0, 'Các tuyến trung tâm đã đầy vào giờ cao điểm.'),
        q('Đại diện tài xế có bác bỏ mục tiêu không?', ['Có, bác bỏ hoàn toàn', 'Có, vì chỉ ưu tiên khách du lịch', 'Không, ông ủng hộ nhưng nêu điều kiện'], 2, 'Il soutient l’objectif, mais… cho thấy đồng ý về mục tiêu và bổ sung giới hạn.'),
      ],
    },
    reading: {
      title: 'Ghi chú phân tích thử nghiệm',
      text: 'Dans deux quartiers, le tarif du samedi a été réduit durant quatre semaines. La fréquentation a augmenté de 18 %, tandis que le coût d’exploitation est resté stable. Toutefois, le nombre de trajets en voiture n’a pas été mesuré. De plus, les deux quartiers disposent déjà de correspondances fréquentes. Il serait donc imprudent d’attendre le même effet dans les secteurs où les lignes passent moins souvent.',
      questions: [
        q('Kết quả nào thực sự được đo?', ['Lượng người đi xe buýt tăng 18%', 'Số lượt đi ô tô giảm 18%', 'Chi phí vận hành giảm 18%'], 0, 'Fréquentation nói lượng người đi xe buýt, không phải lượng chuyến ô tô.'),
        q('Vì sao không thể kết luận về ô tô?', ['Vì ô tô bị cấm trong hai khu', 'Vì số chuyến ô tô không được đo', 'Vì mức tăng 18% đã tính cả ô tô'], 1, 'Le nombre de trajets en voiture n’a pas été mesuré.'),
        q('Vì sao cần thận trọng khi áp dụng rộng?', ['Hai khu thử nghiệm đã có chuyến nối thường xuyên', 'Kết quả chỉ đến từ dữ liệu ngày thường', 'Không biết giá vé thử nghiệm có giảm không'], 0, 'Tần suất và kết nối tốt là đặc điểm không nhất thiết có ở nơi khác.'),
      ],
    },
    speaking: {
      duration: '2–3 phút',
      prompt: 'Chọn đồng ý, phản đối hoặc đồng ý có điều kiện. Dẫn một số liệu và một giới hạn, trả lời phản biện về sức chứa rồi nêu cách đo kết quả.',
      followUp: 'Que feriez-vous si la fréquentation augmente, mais pas le nombre de places ?',
      sample: 'Je suis favorable à un essai limité. La fréquentation a progressé de 18 % dans les quartiers étudiés. Toutefois, cela ne nous dit pas si des automobilistes ont changé leurs habitudes. Le problème de capacité est sérieux. Je proposerais de renforcer deux lignes avant le lancement, puis de mesurer les temps d’attente et le moyen de transport habituel des nouveaux voyageurs.',
      criteria: [
        criterion('Quan điểm có dẫn chứng đúng', 'Bạn đứng về một phương án và giải thích số 18% đo điều gì.'),
        criterion('Xử lý phản biện và giới hạn', 'Bạn thừa nhận nguy cơ quá tải hoặc dữ liệu chưa đo chuyến ô tô.'),
        criterion('Đề xuất có cách kiểm chứng', 'Có một điều kiện triển khai và ít nhất một chỉ báo theo dõi.'),
      ],
    },
    writing: {
      words: [125, 180],
      prompt: 'Viết ý kiến gửi hội đồng thành phố. Chọn một phương án, sử dụng dữ liệu có sẵn, đối đáp lo ngại về sức chứa và đề xuất hai chỉ báo đánh giá.',
      sample: 'Je recommande de tester un tarif réduit pendant trois mois, sur un nombre limité de lignes. Dans les deux quartiers étudiés, la fréquentation du samedi a augmenté de 18 % sans hausse du coût d’exploitation. Ce résultat justifie un essai, mais il ne permet pas d’affirmer que les habitants ont moins utilisé leur voiture, puisque ces trajets n’ont pas été comptés.\nLes conducteurs soulèvent une difficulté concrète : si les véhicules sont déjà pleins, un prix réduit pourrait allonger l’attente. Il faudrait donc ajouter des départs sur les lignes les plus chargées avant de lancer l’expérimentation.\nJe propose de comparer les temps d’attente avant et après l’essai et de demander aux nouveaux usagers comment ils se déplaçaient auparavant. Le conseil pourrait ensuite décider de maintenir, d’ajuster ou d’arrêter la mesure.',
      criteria: [
        criterion('Có đề xuất và dữ kiện', 'Bạn nêu phương án cụ thể, dùng đúng số liệu hoặc một bằng chứng trong tài liệu.'),
        criterion('Đối đáp một phản biện', 'Bạn trình bày lo ngại về sức chứa và phản hồi bằng một điều kiện có thể làm được.'),
        criterion('Nêu cách đánh giá', 'Có hai chỉ báo rõ. Kết luận phân biệt điều đã đo và điều còn phải kiểm chứng.'),
      ],
    },
  },
  C1: {
    title: 'Tổng hợp hai nguồn về làm việc từ xa',
    context: 'Ban điều hành cần một bản tổng hợp về thử nghiệm làm việc từ xa. Hãy bảo toàn sắc thái của dữ liệu và tách bằng chứng khỏi suy luận.',
    oral: {
      title: 'Nhận xét của người phụ trách đánh giá',
      text: 'Le bilan n’est pas défavorable au télétravail, mais il serait excessif d’y voir la preuve d’un gain de productivité généralisé. Nous avons mesuré les délais de traitement, pas la qualité des réponses. Les équipes se sont portées volontaires. Autrement dit, leurs résultats pourraient tenir en partie à leur organisation préalable. Cela n’interdit pas de poursuivre l’essai, à condition d’élargir les indicateurs et de comparer des équipes de profils différents.',
      questions: [
        q('Người nói đứng ở đâu giữa phản đối và khẳng định hiệu quả?', ['Phản đối mọi thử nghiệm làm việc từ xa', 'Ủng hộ tiếp tục có điều kiện và tránh suy rộng', 'Cho rằng hiệu quả đã được chứng minh ở mọi nhóm'], 1, 'Người nói chấp nhận tiếp tục với chỉ số rộng hơn và mẫu khác nhau.'),
        q('Việc nhóm tự nguyện tham gia gợi ra giới hạn gì?', ['Các nhóm có thể đã khác nhau từ trước', 'Không thể tính thời gian xử lý', 'Mọi công ty trong mẫu đều giống nhau'], 0, 'Tổ chức từ trước có thể là một phần của nguyên nhân.'),
        q('Cặp nào phân biệt đúng điều đã đo và chưa đo?', ['Đo chất lượng, chưa đo thời gian', 'Đo cả chất lượng lẫn thời gian', 'Đo thời gian, chưa đo chất lượng'], 2, 'Les délais de traitement được đo, còn la qualité des réponses chưa được đo.'),
      ],
    },
    reading: {
      title: 'Hai tài liệu',
      text: 'Document A · Note de la direction\nAu terme d’un essai de six mois, la durée moyenne de traitement des dossiers a diminué de 12 % dans quatre équipes volontaires. Le nombre de demandes est resté stable. La direction observe également moins d’interruptions signalées les jours à distance. Elle estime que ces résultats justifient une prolongation du dispositif, sans pour autant modifier les objectifs individuels de performance.\n\nDocument B · Compte rendu des représentants du personnel\nLes entretiens menés dans les mêmes équipes confirment que certains agents se concentrent mieux chez eux. D’autres évoquent toutefois un accès plus lent à l’appui des collègues, notamment les personnes récemment recrutées. Les représentants soulignent que la rapidité ne suffit pas pour juger la qualité du service. Ils proposent de suivre les dossiers réouverts et de prévoir des journées communes pour l’intégration.',
      questions: [
        q('Điểm chung có thể tổng hợp từ cả hai tài liệu là gì?', ['Có dấu hiệu thuận lợi cho việc tập trung ở một số nhân viên', 'Chất lượng trả lời đã tăng đồng đều', 'Cả hai đều đề nghị tăng chỉ tiêu cá nhân'], 0, 'A nói giảm gián đoạn, B ghi nhận một số nhân viên tập trung hơn.'),
        q('Tài liệu B bổ sung yếu tố nào mà số 12% không thể hiện?', ['Thời gian thử nghiệm', 'Khó khăn khi tìm hỗ trợ và chất lượng phục vụ', 'Số nhóm tự nguyện'], 1, 'B chú ý người mới cần hỗ trợ và đề xuất đếm hồ sơ phải mở lại.'),
        q('Cách diễn đạt nào giữ đúng phạm vi quan sát?', ['Làm từ xa làm mọi nhóm xử lý nhanh hơn 12%', 'Chất lượng dịch vụ tăng 12%', 'Trong bốn nhóm tự nguyện, thời gian xử lý trung bình giảm 12%'], 2, 'Câu cuối giữ đúng mẫu, chỉ số và mức thay đổi.'),
      ],
    },
    speaking: {
      duration: '2–3 phút',
      prompt: 'Tóm lược bất đồng cho ban điều hành. Nêu điểm chung, nhắc đúng giới hạn của con số 12% và đề xuất cách tiếp tục kiểm chứng.',
      followUp: 'Peut-on communiquer dès maintenant sur une hausse de la productivité ?',
      sample: 'Les deux sources font état de conditions propices à la concentration pour une partie des agents. La note de la direction relève une baisse de 12 % du délai moyen, mais l’échantillon se limite à quatre équipes volontaires. Les représentants signalent que les nouveaux agents accèdent moins vite à l’aide. Je parlerais donc d’un gain de rapidité observé, pas d’une hausse démontrée de la productivité. On pourrait prolonger l’essai avec des groupes plus variés et suivre la qualité en parallèle.',
      criteria: [
        criterion('Tóm lược công bằng hai bên', 'Nêu được điểm chung và vấn đề mà đại diện nhân viên bổ sung.'),
        criterion('Giữ đúng mức chắc chắn', 'Phân biệt giảm thời gian, năng suất và chất lượng. Nói rõ mẫu tự nguyện.'),
        criterion('Trả lời phản biện có hướng tiếp', 'Đưa cách công bố thận trọng và cách kiểm chứng mới.'),
      ],
    },
    writing: {
      words: [150, 205],
      prompt: 'Viết bản tổng hợp trung lập từ hai văn bản, sắp xếp theo kết quả, giới hạn và biện pháp được đề xuất. Viết bằng lời của bạn và ghi rõ nguồn khi hai bên khác nhau.',
      sample: 'Les deux documents examinent les effets d’un essai de télétravail de six mois. Ils signalent des conditions favorables à la concentration pour certains agents. La direction observe moins d’interruptions, tandis que les représentants du personnel rapportent que certains se concentrent mieux chez eux.\nSur les résultats, la direction relève une baisse de 12 % du délai moyen de traitement à volume stable. Cette observation concerne quatre équipes volontaires. Les représentants rappellent que la rapidité ne suffit pas à mesurer la qualité du service et que l’accès à l’entraide peut être plus lent, notamment pour les nouveaux agents.\nPour la suite, la direction envisage de prolonger le dispositif sans modifier les objectifs individuels. Les représentants proposent de compter les dossiers réouverts afin de compléter le suivi de la qualité. Ils suggèrent aussi des journées communes pour faciliter l’intégration. Les deux documents présentent ainsi des éléments complémentaires sur les résultats observés et les conditions de poursuite de l’expérimentation.',
      criteria: [
        criterion('Gộp ý theo chủ đề', 'Bạn tổ chức theo kết quả và giới hạn, thay vì tóm tắt lần lượt A rồi B.'),
        criterion('Mọi nhận định giữ đúng nguồn và phạm vi', 'Con số 12% gắn đúng chỉ số, đúng nhóm. Những đề xuất riêng được gắn đúng nguồn.'),
        criterion('Giữ văn phong trung lập', 'Diễn đạt bằng lời mình và không đưa thêm nhận xét cá nhân hoặc dữ liệu ngoài hai nguồn.'),
      ],
    },
  },
}
