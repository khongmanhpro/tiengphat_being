# Hướng dẫn biên soạn nội dung

Tài liệu này mô tả schema dữ liệu bài học và các quy ước biên soạn áp dụng cho dự án. Mục tiêu: mọi bài mới hoặc bài sửa đi theo cùng một khuôn mẫu, để dữ liệu nhất quán và dễ kiểm tra tự động (xem `src/data/data-integrity.test.ts`).

## 1. Schema `Lesson` (`src/data/curriculum.ts`)

```ts
type Chunk = [fr, vi, ipa, approximation, emoji, example, exampleVi]
type DialogueLine = [speaker, fr, vi]
type Lesson = {
  id, level, minutes, context, role, opening, hint,
  listen: { prompt, options, correct },
  dialogue: DialogueLine[],
  chunks: Chunk[],
  pronunciation: { title, tip, target, pairs },
  grammar: { examples, question, rule, rows },
  exercises: { fill, order, dictate, translate },
  mission: { prompt, criteria, sample },
}
```

`ipa` luôn ở định dạng `/.../`. Mỗi bài có đúng 2 người nói trong `dialogue` (một vài bài trung gian/điều phối ở C1 có thể có 3 — đây là ngoại lệ có chủ ý, không phải lỗi).

## 2. Cách viết nội dung: chỉ dùng DSL `unit()`

`src/data/lesson-authoring.ts` cung cấp hàm `unit()` — đây là **cách viết duy nhất được hỗ trợ** cho bài mới hoặc bài sửa. DSL tham chiếu các dòng hội thoại theo chỉ số (`line: number`) thay vì lặp lại văn bản, giảm nguy cơ lệch giữa `dialogue`, `grammar.examples`, `exercises.order.answer`, `exercises.dictate.answer`. Xem `src/data/everyday.ts` làm ví dụ.

(Lịch sử: `a1.ts`/`advanced.ts` từng viết object `Lesson` trực tiếp — các file này đã được chuyển sang `unit()` để thống nhất toàn bộ 30 bài.)

## 3. Ngân hàng ngữ âm (`src/data/phonology.ts`)

Thay vì lặp lại một mẹo phát âm trong từng bài, mỗi hiện tượng ngữ âm được viết **một lần** thành một `PhonemeRule` có `id`, rồi các bài liên quan trỏ tới id đó qua `phonologyByLesson: Record<lessonId, ruleId[]>`. Trường `pronunciation` sẵn có trong `Lesson` (tip/target/pairs riêng của từng bài) **không đổi** — `phonology.ts` là lớp bổ sung, không thay thế.

Tiến trình đề xuất theo cấp độ (mở rộng dần, không bắt buộc đủ hết ở A1):
- A1: nguyên âm mũi, phân biệt nguyên âm (u/ou…), liaison, elision.
- A2–B1: enchaînement, mute e (e câm), liaison bắt buộc vs tùy chọn.
- B2–C1: nhịp điệu câu (rhythm), ngữ điệu trong lập luận/nhượng bộ.

Khi thêm rule mới: đặt `category` đúng loại hiện tượng (`nasal`/`vowel`/`liaison`/`elision`/`mute-e`/`rhythm`/`consonant`), dùng `minimalPairs` cho các cặp từ tối thiểu thật sự tương phản nghĩa, dùng `examples` cho hiện tượng nối âm/lược âm (không phải cặp từ tối thiểu). Component `SoundChoice` (`src/components/LessonActivities.tsx`) có thể tái dùng để hiển thị `minimalPairs`.

## 4. Bảng chia động từ (`src/data/conjugation.ts`)

`ConjugationTable` chỉ có ý nghĩa khi gắn với bài **giới thiệu** một thì/thức cụ thể — không cần điền cho mọi bài. Gắn theo `Record<lessonId, ConjugationTable[]>`, dùng cùng kiểu tuple `[string, string][]` như `grammar.rows` cho trường `forms`, để tái dùng được pattern `<table>` đã có khi render (`Lesson.tsx`).

## 5. Gắn nhãn văn phong (`axis: 'register'` trong `src/data/language-lab.ts`)

Không dựng hệ thống riêng cho văn phong/tu-vous — `LanguageLab` (đối chiếu hai cách nói) đã đủ hình dạng để biểu diễn một tương phản văn phong. Khi một entry `lab(...)` đối chiếu formal/informal, tu/vous, hoặc thành ngữ/trung tính, truyền `'register'` làm tham số cuối. Việc này giúp sau này có thể lọc riêng các bài tập văn phong xuyên suốt A1–C1 thay vì chỉ có 1 bài (C1 "registre") xử lý chủ đề này.

## 6. Kiểm tra trước khi commit nội dung mới

```sh
npm run check   # tsc --noEmit
npm test        # vitest run — bao gồm data-integrity.test.ts
```

`data-integrity.test.ts` kiểm tra: mọi trường IPA/ngữ pháp/bài tập không rỗng, `curriculum[level].topics` khớp 1:1 với dữ liệu bài học, mọi id trong `phonologyByLesson` trỏ tới một `PhonemeRule` có thật, và mọi key trong `voice-samples.json` trỏ tới file âm thanh có thật trong `public/voice/`.
