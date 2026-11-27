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

## 2. Cách viết nội dung: ưu tiên DSL `unit()`, viết trực tiếp khi bài không vừa khuôn

`src/data/lesson-authoring.ts` cung cấp hàm `unit()`, dùng cho **23/30 bài** (`everyday.ts`, `intermediate.ts`, `upper.ts`, `expert.ts`). DSL tham chiếu dòng hội thoại theo chỉ số thay vì lặp lại văn bản, nhưng đi kèm giả định cố định: đúng 2 ví dụ ngữ pháp (lấy từ 2 dòng hội thoại), đúng 1 cặp âm tối thiểu, và `opening`/`hint` luôn là nguyên văn dòng hội thoại 0/1.

`a1.ts` và `advanced.ts` (8 bài) **cố ý viết object `Lesson` trực tiếp** vì nội dung của chúng không vừa khuôn đó: có bài dùng 3 ví dụ ngữ pháp, có bài dùng 2 cặp âm tối thiểu, và `opening`/`hint` là câu dẫn được biên soạn riêng (không trùng nguyên văn dòng hội thoại — ví dụ `hint` thường là một cụm dang dở gợi ý, không phải câu trả lời đầy đủ). Đây không phải nợ kỹ thuật cần dọn — đừng ép các bài này vào `unit()` chỉ để "thống nhất", việc đó sẽ làm mất ví dụ hoặc cặp âm thật sự có trong nội dung.

Quy tắc chọn cách viết cho bài mới: nếu nội dung của bạn vừa đúng khuôn trên (2 ví dụ/1 cặp âm/opening-hint trùng dòng hội thoại), dùng `unit()`. Nếu cần nhiều ví dụ/cặp âm hơn, hoặc `opening`/`hint` cần viết riêng, viết trực tiếp object `Lesson` như `a1.ts`/`advanced.ts`.

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

## 6. Câu hỏi xếp lớp (`src/data/placement.ts`)

Mỗi câu có `level` (gợi ý điểm bắt đầu), `answers`/`correct`/`explanation` như cũ. Câu hỏi nghe-phân biệt âm thêm trường `audio?: string`: văn bản tiếng Pháp được phát qua `speak()` (component `AudioButton`), độc lập với `prompt` hiển thị — `prompt` có thể hoàn toàn bằng tiếng Việt ("Nghe và chọn từ bạn vừa nghe."), còn `audio` chỉ chứa từ/cụm cần phát. Nguồn nội dung cho các câu này là `phonemeRules`/`minimalPairs`/`examples` trong `phonology.ts` — không tạo cặp âm mới riêng cho bài test, tái dùng ngân hàng đã có để tránh hai nơi dạy khác nhau cho cùng một hiện tượng.

Ngưỡng gợi ý điểm bắt đầu: để "qua" một cấp, cần trả lời đúng ít nhất 60% số câu của cấp đó (`Math.ceil(count * 0.6)`), không phải một số cố định — vì mỗi cấp có thể có số câu khác nhau.

## 7. "Luyện mẫu" (`src/data/starter-practice.ts`)

`practiceCues[lessonId]` là mảng theo **lượt nói của Linh** trong `lesson.dialogue` (mỗi lượt là một chỉ số liên tiếp có `speaker === 'Linh'`) — không phải theo toàn bộ dòng hội thoại. `GuidedConversation.tsx` tự duyệt `lesson.dialogue` để tính các lượt này, nên mảng `practiceCues[lessonId]` không được dài hơn số lượt đó (thừa thì chỉ đơn giản không bao giờ hiển thị; `data-integrity.test.ts` kiểm tra điều này).

Mỗi lượt là một mảng `Cue[]` (1–2 cue là đủ, không cần liệt kê hết mọi khả năng). Mỗi `Cue` ứng với **một mục tiêu giao tiếp riêng biệt**: `patterns` chỉ nên là các cách diễn đạt tương đương của cùng một mục tiêu đó (vì bất kỳ pattern nào khớp cũng tính là đạt — ngữ nghĩa OR); đừng gộp hai mục tiêu khác nhau vào cùng một cue chỉ để tiết kiệm dòng. Patterns so khớp với `normalize(draft)` (chữ thường, dấu nháy cong → thẳng, bỏ dấu câu khác) — viết bằng dấu nháy thẳng `'`, không phải `’`.

Thêm tình huống mới vào `starterPractice` (title/detail tiếng Việt ngắn) là tùy chọn — chỉ cần nếu muốn tình huống đó xuất hiện ở dải chọn nhanh trong "Luyện mẫu"; thiếu nó, tình huống vẫn chọn được qua dropdown đầy đủ các bài.

**Lưu ý khi viết `patterns`:** `\b` (word boundary) của JavaScript chỉ coi `[A-Za-z0-9_]` là "ký tự chữ" — một từ tiếng Pháp bắt đầu hoặc kết thúc bằng chữ có dấu (à, é, ù…) sẽ không bao giờ khớp nếu đặt `\b` ngay sát chữ đó (`/\bà pied\b/` không bao giờ true). Dùng `(?:^|\s)` thay cho `\b` ở đầu, và `(?=\s|$)` thay cho `\b` ở cuối, khi cạnh đó là một chữ có dấu. `\b` vẫn dùng bình thường khi cạnh đó là chữ ASCII (kể cả khi từ có dấu ở giữa, ví dụ `\bnotre père\b` không sao vì biên nằm ở "n" và "e").

Không cần file âm thanh mới trong `public/voice/`: `AudioButton`/`speak()` tự rơi về giọng đọc tổng hợp của trình duyệt (`speechSynthesis`, giọng fr-FR) cho bất kỳ câu nào chưa có trong `voice-samples.json` — ghi âm thật chỉ là nâng cấp chất lượng giọng đọc, không phải điều kiện để tính năng chạy được.

## 8. Rate limit gia sư AI (`server/tutor.ts`)

`withinRateLimit(userId)` giới hạn **8 request/phút** và **60 request/ngày** mỗi `oai-authenticated-user-id`, bằng một `Map` trong bộ nhớ của tiến trình/isolate — tự quét dọn các id đã hết hạn (không gọi lại trong 24h) mỗi phút để bộ nhớ không phình vô hạn. Đây là giới hạn **theo từng instance**, không đồng bộ giữa nhiều instance — đủ dùng ở quy mô hiện tại (chặn một client/tab chạy vòng lặp lỗi), không phải giới hạn phân tán tuyệt đối. Request không có header `oai-authenticated-user-id` (ví dụ khi chạy dev không bật đăng nhập) bỏ qua rate limit vì không có gì để gắn nhãn.

Khi vượt ngưỡng, trả về đúng khuôn lỗi 429 đã dùng cho lỗi 429 từ nhà cung cấp AI (`{ error: string }`, status 429) — phía client (`Tutor.tsx`) không cần sửa gì để xử lý trường hợp này.

## 9. Kiểm tra trước khi commit nội dung mới

```sh
npm run check   # tsc --noEmit
npm test        # vitest run — bao gồm data-integrity.test.ts
```

`data-integrity.test.ts` kiểm tra: mọi trường IPA/ngữ pháp/bài tập không rỗng, `curriculum[level].topics` khớp 1:1 với dữ liệu bài học, mọi id trong `phonologyByLesson` trỏ tới một `PhonemeRule` có thật, và mọi key trong `voice-samples.json` trỏ tới file âm thanh có thật trong `public/voice/`.
