# Học Tiếng Pháp Thực Chiến

Web app học tiếng Pháp dành cho người Việt. Chương trình có 30 chủ đề A1–C1, trong đó 8 bài có đầy đủ nội dung. Các chủ đề đang soạn được đánh dấu trong lộ trình. Mỗi bài đã xuất bản có hội thoại, cụm câu, luyện phát âm, bài tập có giải thích và một nhiệm vụ thực tế.

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

## Gia sư Gemini

- Mở **Gia sư AI → Cài đặt gia sư** và nhập khóa API từ [Google AI Studio](https://aistudio.google.com/apikey). Khóa vừa nhập được giữ trong bộ nhớ của trang và mất khi tải lại.
- Khi tự vận hành máy chủ, sao chép `.env.example` thành `.env` để đặt `GEMINI_API_KEY` và tùy chỉnh `GEMINI_MODEL`. Biến khóa chỉ được đọc ở máy chủ. Trình duyệt gọi cùng nguồn tại `/api/tutor`.
- Hội thoại, bài học, bài xếp lớp và flashcard hoạt động khi chưa có khóa. Nhận diện và đọc tiếng Pháp phụ thuộc vào trình duyệt và giọng nói có sẵn trên thiết bị. Điểm nghe nhại là độ khớp của các từ được máy nhận diện với câu mẫu.
- Dữ liệu học tập nằm trong localStorage của trình duyệt. Khi dùng một địa chỉ web hoặc trình duyệt khác, tiến độ là một hồ sơ riêng.

## Cập nhật nội dung

- `src/data/curriculum.ts`: cấp độ, chủ đề và cấu trúc dữ liệu.
- `src/data/a1.ts`, `src/data/advanced.ts`: nội dung từng bài, có IPA và cách đọc gợi nhớ.
- `src/data/placement.ts`: câu hỏi, đáp án và giải thích cho bài xếp lớp.
- `src/progress.ts`: tiến độ, lượt ôn SM-2, XP và chuỗi ngày.
