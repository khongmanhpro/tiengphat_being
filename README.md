# Học Tiếng Pháp Thực Chiến

Web app học tiếng Pháp dành cho người Việt. Chương trình có 30 bài đầy đủ, mỗi cấp A1–C1 gồm 6 bài. Mỗi bài dẫn người học qua hội thoại, kiểm tra ý chính, luyện cụm, nghe nhại, nhận ra quy tắc và tự xử lý một tình huống. Tiến độ từng phần và nháp cho nhiệm vụ cuối được lưu trên trình duyệt.

## Chạy ứng dụng

Giải nén và mở `Mo_Hoc_Tieng_Phap.html` bằng trình duyệt để học ngay. Nếu muốn dùng Gia sư AI, chạy bản có máy chủ như bên dưới.

Để làm việc với mã nguồn, cần Node.js 22.12 trở lên và npm.

```sh
npm install
npm run dev
```

Mở URL do Vite in ra. Để kiểm tra kiểu dữ liệu và tạo bản dựng:

```sh
npm run build
npm run preview
```

Bản tải xuống có sẵn thư mục `dist`. Có thể chạy bản dựng bằng Node.js mà không cần cài thêm thư viện:

```sh
node server/serve.mjs
```

Mở http://localhost:4173. Máy chủ này chỉ lắng nghe trên máy đang chạy. Đặt biến `PORT` để dùng cổng khác.

## Ôn flashcard

Nếu kho thẻ còn trống, chọn **Ôn tập → Học ngay** để học các cụm từ bài được đề xuất. Cụm được lưu ngay sau khi bạn xác nhận đã học. Khi chưa tới lịch ôn, dùng **Ôn thêm ngay** để luyện thẻ cũ. Lịch SM-2 cập nhật mỗi khi bạn tự đánh giá thẻ trong lượt ôn chính.

## Lộ trình và mốc thực hành

- Các mục tiêu A1–C1 dựa trên mô tả năng lực CEFR và đối chiếu chương trình công khai của Alliance Française Paris. Mỗi chặng có sáu bài ứng dụng và một mốc tự kiểm tra bốn kỹ năng. Đây là lộ trình thực hành rút gọn, không dùng làm chứng chỉ.
- Xem **Lộ trình → Làm mốc** để luyện theo tình huống mới. Nghe và đọc trả kết quả theo đáp án có giải thích. Nói và viết có câu hỏi, bài mẫu và danh sách tự đánh giá. Tiến độ và nháp được lưu trên thiết bị.
- Khối **Quy tắc dùng ngay** ở phần tìm quy tắc có hai cách nói đối chiếu và một bài ngắn áp dụng sang ngữ cảnh khác. Ví dụ và đề được biên soạn riêng.

## Luyện nói và gia sư trực tuyến

- **Luyện mẫu** hoạt động ngay. Ba tình huống A1 có mục tiêu từng câu và 58 đoạn phát âm tiếng Pháp đi kèm, gồm lượt hội thoại, cụm câu và bài luyện liên quan.
- Nút **Thu giọng của tôi** dùng micrô của thiết bị để thu và nghe lại trong trang. Các đoạn thu này nằm trong bộ nhớ phiên mở trang. Có thể nhập lời đáp hoặc dùng **Chuyển lời nói thành chữ** nếu trình duyệt hỗ trợ. Góp ý theo mục tiêu dựa trên câu đã nhập, còn độ khớp bài nghe nhại dựa trên từ được nhận diện.
- Tiến độ từng bài và lượt hội thoại nằm trong dữ liệu của trình duyệt. Dùng cùng địa chỉ web hoặc cùng vị trí tệp HTML để mở lại hồ sơ đó.
- **Nhập vai AI** và **Hỏi nhanh** bật khi người vận hành cấu hình một nhà cung cấp ở máy chủ. Người học đăng nhập ở bản web và gửi câu tiếng Pháp trực tiếp trong app.
- Khi tự vận hành, sao chép `.env.example` thành `.env`. Có thể đặt khóa dự án OpenAI vào `TUTOR_OPENAI_API_KEY` hoặc dùng `GEMINI_API_KEY`. Nếu có cả hai, ứng dụng chọn OpenAI. Các khóa được máy chủ đọc và các chế độ AI chỉ gửi văn bản người học chọn gửi.
- Bản chạy cục bộ chỉ mở ở địa chỉ loopback. Bản triển khai trên Sites sử dụng đăng nhập của nền tảng cho các yêu cầu AI.

## Cập nhật nội dung

- `src/data/curriculum.ts`: cấp độ, chủ đề và cấu trúc dữ liệu.
- `src/data/a1.ts`, `src/data/everyday.ts`, `src/data/intermediate.ts`, `src/data/upper.ts`, `src/data/expert.ts` và `src/data/advanced.ts`: nội dung từng bài, có IPA và cách đọc gợi nhớ.
- `src/data/placement.ts`: câu hỏi, đáp án và giải thích cho bài xếp lớp.
- `src/progress.ts`: tiến độ, lượt ôn SM-2, XP và chuỗi ngày.
