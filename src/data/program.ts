import type { Level } from './curriculum'

export const skillNames = ['Nghe', 'Đọc', 'Nói', 'Viết'] as const
export type Skill = typeof skillNames[number]
type Band = {
  result: string
  outcomes: Record<Skill, string>
  /** One heading per 2 topics, in `curriculum[level].topics` order (see Roadmap.tsx). */
  blocks: string[]
}

export const program: Record<Level, Band> = {
  A1: {
    result: 'Trao đổi thông tin cơ bản và tự xử lý một việc quen thuộc khi người đối diện nói chậm, rõ.',
    outcomes: {
      Nghe: 'Bắt được tên, giờ, giá hoặc hướng đi trong một thông báo ngắn, đọc rõ.',
      Đọc: 'Tìm đúng món, giờ mở cửa hoặc giá trên bảng thông tin đơn giản.',
      Nói: 'Chào, nói tên, hỏi một câu về việc đang cần và lịch sự kết thúc.',
      Viết: 'Viết tin nhắn ngắn có thông tin cá nhân, giờ và nơi gặp.',
    },
    blocks: ['Giới thiệu và đánh vần', 'Giờ hẹn và gọi món', 'Mua sắm và tìm đường'],
  },
  A2: {
    result: 'Trao đổi trực tiếp trong việc quen thuộc, kể lại ngắn một việc đã xảy ra và thống nhất phương án.',
    outcomes: {
      Nghe: 'Hiểu người nói muốn thay đổi gì trong tin nhắn về đặt chỗ hoặc lịch hẹn.',
      Đọc: 'Lấy đúng thông tin thực tế trong email đơn giản, gồm điều kiện và thời hạn.',
      Nói: 'Giải thích một nhu cầu, đề xuất phương án và hỏi xác nhận.',
      Viết: 'Viết một tin ngắn có hoàn cảnh, sự việc và lời đề nghị.',
    },
    blocks: ['Đặt chỗ và nói về người thân', 'Thói quen và nhu cầu', 'Kể lại và lên hẹn'],
  },
  B1: {
    result: 'Xử lý một thay đổi khi đi lại hoặc làm việc, kể mạch lạc và giải thích ngắn lý do lựa chọn.',
    outcomes: {
      Nghe: 'Hiểu ý chính và chi tiết cần hành động trong một thông báo có lời nói rõ ràng.',
      Đọc: 'Đọc một email công việc, xác định sự việc, lựa chọn và hạn phản hồi.',
      Nói: 'Trình bày sự việc theo thứ tự, so sánh phương án và giải thích lựa chọn.',
      Viết: 'Viết email liền mạch với mục đích rõ, lý do và đề xuất cụ thể.',
    },
    blocks: ['Kinh nghiệm và liên lạc công việc', 'Ý kiến và xử lý sự cố', 'Kế hoạch và lựa chọn thực tế'],
  },
  B2: {
    result: 'Bảo vệ một quan điểm bằng lý do, xử lý ý kiến trái chiều và điều chỉnh phương án.',
    outcomes: {
      Nghe: 'Phân biệt quan điểm, lập luận và giới hạn mà hai người nêu trong một cuộc thảo luận.',
      Đọc: 'Tách kết luận, dẫn chứng và điều kiện trong một bài nêu quan điểm.',
      Nói: 'Bảo vệ một đề xuất, thừa nhận phản biện và đưa cách xử lý.',
      Viết: 'Viết lập luận có bố cục, sử dụng dữ liệu và đặt giới hạn cho kết luận.',
    },
    blocks: ['Kiểm tra lập luận và thương lượng', 'Thuyết trình và nêu điều kiện', 'Sắc thái văn hóa và đánh giá'],
  },
  C1: {
    result: 'Tổng hợp nguồn, nhận ra hàm ý và chọn cách diễn đạt phù hợp trong trao đổi học thuật hoặc nghề nghiệp.',
    outcomes: {
      Nghe: 'Nhận ra hàm ý, mức chắc chắn và điều người nói đang dè dặt.',
      Đọc: 'Đối chiếu hai nguồn và giải thích vì sao chúng có thể cùng đúng dù nhấn vào hai điểm khác nhau.',
      Nói: 'Tóm lược dù có bất đồng, bảo toàn ý của mỗi bên và chốt điểm có thể thống nhất.',
      Viết: 'Tổng hợp tài liệu theo chủ đề, dẫn nguồn rõ và tách dữ kiện khỏi suy luận.',
    },
    blocks: ['Sắc thái trong trao đổi', 'Lập luận và điều chỉnh văn phong', 'Tổng hợp và điều phối bất đồng'],
  },
}

export const curriculumSources = [
  { label: 'Hội đồng châu Âu · Thang CEFR', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale' },
  { label: 'Alliance Française Paris · Chương trình A1–C1', url: 'https://www.alliancefr.org/product/attachment/cours-intensif-de-francais-en-presentiel-892/cours-intensifs-pdf-385389' },
  { label: 'France Éducation international · DELF/DALF', url: 'https://www.france-education-international.fr/article/epreuves-entrainement-delf' },
  { label: 'TV5MONDE · Phát âm tiếng Pháp', url: 'https://apprendre.tv5monde.com/fr/aides/prononciation-les-sons-u-et-y-ou-et-u' },
] as const
