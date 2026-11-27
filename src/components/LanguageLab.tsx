import { Lightbulb } from 'lucide-react'
import type { LanguageLab as LessonLanguage } from '../data/language-lab'

export function LanguageLab({ content, chosen, onChoose }: { content: LessonLanguage; chosen?: number; onChoose: (choice: number) => void }) {
  return <section className="language-lab" aria-label="Tủ quy tắc">
    <h3><Lightbulb size={17} /> Quy tắc dùng ngay</h3>
    <p>{content.rule}</p>
    <div className="rule-examples">
      <p lang="fr">{content.model}</p>
      <p lang="fr">{content.compare}</p>
    </div>
    <p>{content.why}</p>
    <fieldset>
      <legend>Thử trong tình huống khác</legend>
      <p>{content.transfer}</p>
      <div className="quiz-options">{content.options.map((option, index) => <button type="button" key={option} className={`quiz-option ${chosen === index ? 'selected' : ''}`} aria-pressed={chosen === index} onClick={() => onChoose(index)} lang="fr">{option}</button>)}</div>
    </fieldset>
    {chosen !== undefined && <p className={`feedback ${chosen === content.answer ? 'good' : 'retry'}`} role="status">{chosen === content.answer ? 'Đúng theo tình huống. ' : 'Đọc hai câu rồi thử lại. '}{content.feedback}</p>}
  </section>
}
