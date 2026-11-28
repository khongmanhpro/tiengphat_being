export const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const
export type Level = typeof levels[number]
export type Topic = [id: string, title: string, icon: string, description: string]
export const curriculum: Record<Level, { name: string; description: string; topics: Topic[] }> = {
  A1: { name: 'Nhập môn', description: 'Chào hỏi, hỏi thông tin và tự tin nói những câu đầu tiên.', topics: [
    ['bonjour', 'Chào hỏi & giới thiệu', 'message', 'Chào hỏi, nói tên và hỏi thăm người đối diện'],
    ['sons', 'Phát âm & bảng chữ cái', 'audio', 'Đánh vần tên và phân biệt những âm dễ nhầm'],
    ['heure', 'Số, giờ & ngày tháng', 'clock', 'Hỏi giờ, đọc ngày và hẹn gặp'],
    ['cafe', 'Gọi món ở quán cà phê', 'coffee', 'Gọi đồ uống, món ăn và xin tính tiền'],
    ['achats', 'Mua sắm & hỏi giá', 'bag', 'Hỏi giá, kích cỡ và thử đồ'],
    ['chemin', 'Hỏi đường', 'map', 'Hỏi và chỉ đường đến một địa điểm'],
    ['nombres', 'Đếm số và tính tiền', 'bag', 'Hỏi giá theo cân và tính tổng số tiền phải trả'],
    ['metier', 'Nghề nghiệp', 'briefcase', 'Nói nghề nghiệp và nơi làm việc của mình'],
    ['meteo', 'Thời tiết', 'map', 'Mô tả thời tiết hiện tại và dự đoán sắp tới'],
    ['couleurs', 'Màu sắc & mô tả đồ vật', 'bag', 'Mô tả đồ vật bằng màu sắc, kích thước và vị trí'],
    ['gouts', 'Sở thích ăn uống', 'coffee', 'Nói món ăn/đồ uống yêu thích và so sánh lựa chọn'],
    ['chambre', 'Mô tả phòng ở', 'bag', 'Mô tả đồ vật trong phòng và vị trí của chúng'],
    ['telephone', 'Gọi điện & để lại lời nhắn', 'message', 'Xin nói chuyện với ai đó và để lại lời nhắn'],
    ['corps', 'Cơ thể & triệu chứng nhẹ', 'heart', 'Nói triệu chứng bằng avoir mal à và nhận lời khuyên'],
    ['bus', 'Mua vé xe buýt', 'map', 'Mua vé, chọn loại vé và hỏi giờ xe chạy'],
    ['semaine', 'Ngày trong tuần & hẹn gặp', 'clock', 'Nói ngày rảnh và chốt giờ hẹn cụ thể'],
    ['banque', 'Ở ngân hàng', 'bag', 'Đổi tiền và hỏi mở tài khoản'],
    ['appartement_a1', 'Hỏi thuê căn hộ', 'bag', 'Hỏi diện tích, giá thuê và xin hẹn xem nhà'],
    ['anniversaire', 'Mời dự sinh nhật', 'coffee', 'Mời bạn, nói giờ và nhận lời đề nghị giúp đỡ'],
    ['etudes', 'Nói về việc học', 'book', 'Nói môn học, thời gian học và tần suất'],
    ['animaux', 'Thú cưng', 'heart', 'Giới thiệu thú cưng bằng qui s’appelle'],
    ['quartier', 'Mô tả khu phố', 'map', 'Nói về khu phố mình sống và nơi mua sắm gần đó'],
    ['reservation', 'Đặt bàn nhà hàng', 'coffee', 'Đặt bàn qua điện thoại: số người, ngày giờ'],
    ['perdu', 'Báo mất đồ', 'bag', 'Báo mất một món đồ và những gì cần xử lý'],
    ['projet_vacances', 'Dự định nghỉ hè', 'map', 'Kể dự định đi đâu, bao lâu và đã chuẩn bị gì'],
    ['sport', 'Thể thao yêu thích', 'heart', 'Nói về môn thể thao mình chơi, tần suất và từ bao lâu'],
  ] },
  A2: { name: 'Sơ cấp', description: 'Xử lý các tình huống quen thuộc và kể về cuộc sống của bạn.', topics: [
    ['hotel', 'Đặt phòng khách sạn', 'bag', 'Kiểm tra phòng trống và xác nhận lượt đặt'],
    ['famille', 'Gia đình & người thân', 'people', 'Giới thiệu người thân và mô tả quan hệ gia đình'],
    ['routine', 'Thói quen hằng ngày', 'clock', 'Kể về lịch sinh hoạt và tần suất'],
    ['medecin', 'Đi khám bệnh', 'heart', 'Diễn tả triệu chứng và hiểu lời dặn'],
    ['passe', 'Kể chuyện quá khứ', 'message', 'Phân biệt passé composé và imparfait'],
    ['invitation', 'Rủ bạn đi chơi', 'coffee', 'Mời, nhận lời và đề xuất thời gian'],
    ['velo', 'Thuê xe đạp', 'bag', 'Thuê theo thời gian và báo một vấn đề kỹ thuật'],
    ['pharmacie', 'Ở hiệu thuốc', 'heart', 'Mô tả triệu chứng nhẹ và hiểu lời khuyên dùng thuốc'],
    ['valise', 'Hành lý thất lạc', 'map', 'Báo mất hành lý và mô tả đặc điểm để tìm lại'],
    ['restaurant_avis', 'Nhận xét món ăn', 'coffee', 'Khen và nêu nhận xét nhẹ về món ăn'],
    ['excuse', 'Xin lỗi vì đến trễ', 'message', 'Xin lỗi, giải thích lý do và trấn an người kia'],
    ['apparence', 'Mô tả ngoại hình', 'people', 'Mô tả chiều cao, tóc và trang phục để nhận ra ai đó'],
    ['meteo_passe', 'Kể thời tiết đã qua', 'map', 'Kể thời tiết trong một chuyến đi và so sánh với hiện tại'],
    ['ville_comparaison', 'So sánh hai thành phố', 'map', 'So sánh nơi ở hiện tại với một nơi trước đây'],
    ['plainte_a2', 'Phàn nàn dịch vụ khách sạn', 'bag', 'Nêu vấn đề và nói thiếu gì một cách lịch sự'],
    ['fete', 'Lên kế hoạch tổ chức tiệc', 'coffee', 'Thống nhất địa điểm, số khách và phân công'],
  ] },
  B1: { name: 'Trung cấp', description: 'Diễn đạt ý kiến, kể trải nghiệm và ứng phó khi có thay đổi.', topics: [
    ['emploi', 'Công việc & phỏng vấn', 'bag', 'Kể về kinh nghiệm và trình bày một điểm mạnh'],
    ['courriel', 'Email công việc', 'message', 'Viết email đề nghị, xác nhận và nhắc lịch'],
    ['avis', 'Nêu ý kiến', 'people', 'Đồng ý và phản đối một cách lịch sự'],
    ['incident', 'Du lịch & xử lý sự cố', 'map', 'Giải thích vấn đề và đề xuất giải pháp'],
    ['projets', 'Kế hoạch tương lai', 'clock', 'Trình bày kế hoạch bằng các thì tương lai'],
    ['logement', 'Tìm chỗ ở', 'heart', 'So sánh lựa chọn và nêu điều kiện thuê'],
    ['reclamation', 'Phàn nàn về sản phẩm', 'bag', 'Mô tả vấn đề và đề xuất giải pháp bằng conditionnel'],
    ['etudes_projet', 'Kế hoạch học tiếp', 'book', 'Nói dự định học lên cao và điều kiện để nó xảy ra'],
    ['actualite_discussion', 'Bàn luận tin tức', 'message', 'Nêu ý kiến nhẹ nhàng và thừa nhận lo ngại trái chiều'],
    ['conseil_ami', 'Khuyên bạn bè', 'people', 'Đưa lời khuyên bằng à ta place và tu devrais'],
    ['hobby_approfondi', 'Kể chi tiết sở thích', 'heart', 'Kể một sở thích lâu năm và nhấn mạnh chi tiết'],
    ['itineraire', 'Lên kế hoạch chuyến đi', 'map', 'Nêu điều kiện bằng à condition de và phương án dự phòng'],
    ['environnement', 'Tái chế & môi trường', 'bag', 'Nói khó khăn và mẹo phân loại rác bằng il suffit de'],
    ['habitudes_sante', 'Thói quen sức khỏe', 'heart', 'Mô tả ăn uống, giấc ngủ và dự định cải thiện'],
    ['serie_tv', 'Giới thiệu phim/series', 'message', 'Giới thiệu nội dung và góc nhìn kể chuyện'],
    ['cause_effet', 'Giải thích nguyên nhân–kết quả', 'briefcase', 'Phân biệt à cause de và grâce à'],
  ] },
  B2: { name: 'Trung cao cấp', description: 'Diễn đạt quan điểm có sắc thái và thuyết phục người nghe.', topics: [
    ['actualites', 'Thảo luận tin tức', 'message', 'Nêu lợi ích, giới hạn và điều kiện của một đề xuất'],
    ['negociation', 'Đàm phán', 'people', 'Đặt điều kiện và tìm tiếng nói chung'],
    ['presentation', 'Thuyết trình', 'audio', 'Dẫn dắt lập luận và trả lời câu hỏi'],
    ['subjonctif', 'Subjonctif trong đối thoại', 'book', 'Bày tỏ sự cần thiết và thái độ'],
    ['culture', 'Văn hóa Pháp', 'coffee', 'So sánh thói quen và góc nhìn văn hóa'],
    ['critique', 'Đánh giá tác phẩm', 'heart', 'Viết nhận xét có dẫn chứng'],
    ['debat_social', 'Tranh luận xã hội', 'people', 'Phản biện và đề xuất phương án ôn hòa hơn'],
    ['email_formel', 'Email phàn nàn trang trọng', 'message', 'Mở đầu trang trọng và nêu mong muốn bằng subjonctif'],
    ['offre_emploi', 'Cân nhắc lời mời làm việc', 'briefcase', 'So sánh lợi/hại và diễn đạt tiếc nuối'],
    ['statistiques', 'Phân tích số liệu', 'book', 'Nêu mức thay đổi và giải thích thận trọng'],
    ['dilemme_ethique', 'Tình huống đạo đức', 'heart', 'Bàn một lựa chọn khó xử bằng câu điều kiện'],
    ['feedback_constructif', 'Góp ý xây dựng', 'message', 'Khen tổng quát trước rồi góp ý cụ thể bằng conditionnel'],
    ['teletravail', 'Tranh luận chính sách làm từ xa', 'briefcase', 'Nêu lợi ích/rủi ro và cách giảm rủi ro'],
    ['politique_env', 'Tranh luận chính sách môi trường', 'people', 'Thừa nhận lo ngại và nêu điều kiện chấp nhận'],
    ['immigration_respect', 'Bàn chủ đề nhạy cảm tôn trọng', 'people', 'Tôn trọng quan điểm khác và gắn ý kiến với selon moi'],
    ['publicite', 'Phân tích quảng cáo', 'message', 'Nhận diện kỹ thuật thuyết phục và đánh giá hiệu quả'],
  ] },
  C1: { name: 'Nâng cao', description: 'Xây dựng lập luận chặt chẽ và điều chỉnh giọng điệu theo ngữ cảnh.', topics: [
    ['seminaire', 'Tranh luận học thuật', 'people', 'Chất vấn giả thuyết và diễn đạt mức độ chắc chắn'],
    ['idiomes', 'Thành ngữ & tiếng lóng', 'message', 'Hiểu nghĩa bóng và mức độ thân mật'],
    ['essai', 'Viết luận', 'book', 'Tổ chức luận điểm, phản biện và dẫn chứng'],
    ['registre', 'Trang trọng & thân mật', 'audio', 'Đổi cách diễn đạt theo đối tượng và mục đích'],
    ['synthese', 'Tổng hợp nhiều nguồn', 'bag', 'Tóm lược và đối chiếu quan điểm từ nhiều văn bản'],
    ['mediation', 'Điều phối thảo luận', 'heart', 'Diễn giải bất đồng và gợi mở phương án chung'],
    ['discours_formel', 'Phát biểu trang trọng', 'message', 'Mở đầu, cảm ơn và chuyển ý trong một bài phát biểu'],
    ['questions_hostiles', 'Xử lý câu hỏi gay gắt', 'people', 'Thừa nhận câu hỏi rồi bổ sung thông tin bình tĩnh'],
    ['resume_academique', 'Tóm tắt học thuật', 'book', 'Giới thiệu chủ đề, phương pháp và kết luận nghiên cứu'],
    ['desaccord_nuance', 'Bất đồng tinh tế', 'briefcase', 'Nghi ngờ lịch sự và mở đầu bất đồng giữ thể diện'],
    ['rhetorique_debat', 'Kỹ thuật tu từ tranh luận', 'audio', 'Trả lời bằng câu hỏi và nhấn mạnh nhân quả'],
    ['conference_style', 'Thuyết trình kiểu TED', 'message', 'Mở đầu bằng câu chuyện và khép kín bài nói'],
    ['mediation_juridique', 'Điều phối tranh chấp pháp lý', 'briefcase', 'Tìm điểm chung và trấn an về quyền lợi'],
    ['compromis_donnees', 'Đánh đổi chính sách theo số liệu', 'book', 'Trình bày lợi ích thận trọng và cái giá phải trả'],
    ['lettre_recommandation', 'Thư tiến cử', 'message', 'Nhấn mạnh phẩm chất và dẫn ví dụ cụ thể'],
    ['defis_traduction', 'Thách thức dịch thuật', 'audio', 'Đề xuất giải pháp và thừa nhận hạn chế'],
  ] },
}

export type Chunk = [fr: string, vi: string, ipa: string, approximation: string, emoji: string, example: string, exampleVi: string]
export type DialogueLine = [speaker: string, fr: string, vi: string]
export type Lesson = {
  id: string
  level: Level
  minutes: number
  context: string
  role: string
  opening: string
  hint: string
  listen: { prompt: string; options: readonly string[]; correct: number }
  dialogue: DialogueLine[]
  chunks: Chunk[]
  pronunciation: { title: string; tip: string; target: string; pairs: [string, string][] }
  grammar: { examples: [string, string][]; question: string; rule: string; rows: [string, string][] }
  exercises: {
    fill: { prompt: string; options: string[]; answer: string; feedback: string }
    order: { prompt: string; words: string[]; answer: string; feedback: string }
    dictate: { answer: string; feedback: string }
    translate: { prompt: string; answer: string; variants?: string[]; feedback: string }
  }
  mission: { prompt: string; criteria: string[]; sample: string }
}
