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
