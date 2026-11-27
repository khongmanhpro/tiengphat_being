import { useRef, useState } from 'react'
import { BookOpen, Check, ChevronLeft, CircleCheck, Layers3, Lightbulb, Mic, RotateCcw, Square, Trophy, Volume2 } from 'lucide-react'
import { topicFor } from '../data'
import { languageLabs } from '../data/language-lab'
import type { Lesson as LessonData } from '../data'
import type { Checkpoint, LessonWork, Outcome } from '../progress'
import { Exercise, ListeningCheck, SoundChoice } from './LessonActivities'
import { canSpeak, compareWords, speak, stopSpeech, useRecognition } from '../speech'
import type { Rate } from '../speech'
import { AudioButton, Bar, ScreenTitle } from './common'
import { VoiceRecorder } from './VoiceRecorder'
import { LanguageLab } from './LanguageLab'

export const stages = ['Hiểu tình huống', 'Nhớ cụm câu', 'Luyện tai và miệng', 'Tìm quy tắc', 'Tự xử lý']
const instructions = [
  'Nghe lần đầu để đoán ý chính. Mở lời thoại hoặc bản dịch nếu bạn cần thêm manh mối.',
  'Đọc và nói thành tiếng từng cụm. Sau đó thử xếp câu bằng trí nhớ.',
  'Nghe hai âm dễ lẫn, nhại một câu, rồi thử viết lại câu bạn nghe được.',
  'Nhìn các ví dụ và tự thử nhận ra điểm chung trước khi mở quy tắc.',
  'Tự tạo câu trả lời cho tình huống mới, rồi đối chiếu với một cách trả lời tự nhiên.',
]
const checkpointGroups: Checkpoint[][] = [['listen', 'fill'], ['order'], ['dictate'], ['translate']]

const alphabet = [
  ['A', 'a'], ['B', 'be'], ['C', 'se'], ['D', 'de'], ['E', 'ə'], ['F', 'ɛf'], ['G', 'ʒe'], ['H', 'aʃ'], ['I', 'i'], ['J', 'ʒi'], ['K', 'ka'], ['L', 'ɛl'], ['M', 'ɛm'], ['N', 'ɛn'], ['O', 'o'], ['P', 'pe'], ['Q', 'ky'], ['R', 'ɛʁ'], ['S', 'ɛs'], ['T', 'te'], ['U', 'y'], ['V', 've'], ['W', 'du.blə ve'], ['X', 'iks'], ['Y', 'i ɡʁɛk'], ['Z', 'zɛd'],
]

export function Lesson({ lesson, initialStep, work, onCheckpoint, onWork, onDraft, onStep, onSpeech, onComplete, onBack, onTutor, onReview, onNext, nextTitle, onAssessment, completed }: {
  lesson: LessonData; initialStep: number; work?: LessonWork; completed: boolean
  onCheckpoint: (type: Checkpoint, outcome: Outcome) => void; onWork: (patch: Partial<LessonWork>) => void; onDraft: (draft: string) => void
  onStep: (step: number) => void; onSpeech: (score: number) => void; onComplete: () => void
  onBack: () => void; onTutor: () => void; onReview: () => void; onNext?: () => void; nextTitle?: string; onAssessment?: () => void
}) {
  const [step, setStep] = useState(initialStep)
  const [legacyStep] = useState(work ? 0 : initialStep)
  const [subtitles, setSubtitles] = useState(false)
  const [transcript, setTranscript] = useState(!canSpeak)
  const [audioFailed, setAudioFailed] = useState(!canSpeak)
  const [rate, setRate] = useState<Rate>(0.8)
  const [voiceActive, setVoiceActive] = useState(false)
  const [result, setResult] = useState<{ transcript: string; words: { word: string; correct: boolean }[]; score: number }>()
  const [showGrammar, setShowGrammar] = useState(false)
  const [showSample, setShowSample] = useState(false)
  const [missionHint, setMissionHint] = useState(false)
  const mission = work?.draft ?? ''
  const checks = work?.checks ?? {}
  const canContinue = completed || legacyStep > step || (checkpointGroups[step]?.every(item => checks[item]) ?? false)
  const recalled = Object.values(checks).filter(outcome => outcome === 'recalled').length
  const assisted = Object.values(checks).filter(outcome => outcome === 'withHelp').length
  const [focusedLine, setFocusedLine] = useState<number>()
  const [playingDialogue, setPlayingDialogue] = useState(false)
  const playGeneration = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [done, setDone] = useState<"review" | "new">()
  const microphone = useRecognition()
  const [id, title, , objective] = topicFor(lesson)
  const language = languageLabs[id]

  function stopDialogue() {
    playGeneration.current++
    setPlayingDialogue(false)
    setFocusedLine(undefined)
    stopSpeech()
  }

  function playDialogue() {
    if (playingDialogue) { stopDialogue(); return }
    setPlayingDialogue(true)
    const generation = ++playGeneration.current
    function playLine(index: number) {
      if (generation !== playGeneration.current) return
      if (index >= lesson.dialogue.length) { stopDialogue(); return }
      setFocusedLine(index)
      speak(lesson.dialogue[index][1], rate, () => playLine(index + 1), () => {
        stopDialogue()
        setAudioFailed(true)
        setTranscript(true)
      })
    }
    playLine(0)
  }

  function addPhrase(phrase: string) {
    const inserted = phrase.replace(/[.…!?]+$/, '')
    onDraft(mission.trim() ? `${mission.trimEnd()}
${inserted}` : inserted)
    setShowSample(false)
  }

  function move(next: number) {
    if (microphone.recording) microphone.listen(() => {})
    stopDialogue()
    setVoiceActive(false)
    setStep(next)
    onStep(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
    requestAnimationFrame(() => sectionRef.current?.focus({ preventScroll: true }))
  }

  if (done) return <main className="narrow page"><section className="card empty-state lesson-finish">
    <span className="tile-icon amber"><Trophy size={28} /></span>
    <ScreenTitle title="Bạn đã hoàn thành bài học">{topicFor(lesson)[3]}. {done === 'new' && 'Bạn nhận 50 XP.'}</ScreenTitle>
    <div className="finish-stats"><span><strong>{recalled}</strong> tự trả lời đúng</span><span><strong>{assisted}</strong> có trợ giúp</span><span><strong>{lesson.chunks.length}</strong> cụm để ôn</span></div>
    {nextTitle && <p>Bài có thể học tiếp là <strong>{nextTitle}</strong>.</p>}
    <div className="token-row finish-actions">
      <button className="button primary" onClick={onNext ?? onBack}>{onNext ? 'Học bài tiếp theo' : 'Về lộ trình'}</button>
      {onAssessment && <button className="button secondary" onClick={onAssessment}>Làm mốc thực hành {lesson.level}</button>}
      <button className="button secondary" onClick={onReview}><Layers3 size={17} /> Ôn cụm vừa học</button>
      <button className="text-button" onClick={onTutor}>Luyện thêm một lượt hội thoại</button>
    </div>
  </section></main>

  return <main className="narrow page">
    <button className="text-button back" onClick={onBack}><ChevronLeft size={18} /> Lộ trình</button>
    <ScreenTitle label={`CẤP ĐỘ ${lesson.level} · ${lesson.minutes} PHÚT`} title={title}>{lesson.context}</ScreenTitle>
    {language && <p className="lesson-goal"><strong>Học xong, bạn có thể</strong> {objective.charAt(0).toLowerCase() + objective.slice(1)}. <span className="stat-pill cool">Trọng tâm {language.skill.toLowerCase()}</span></p>}
    <div className="lesson-progress"><Bar value={step / stages.length * 100} label="Tiến độ bài học" />
      <ol className="lesson-steps" aria-label="Các phần của bài">{stages.map((stage, index) => <li key={stage} aria-current={index === step ? 'step' : undefined}><span>{index < step ? <Check size={14} /> : index + 1}</span><small>{stage}</small></li>)}</ol>
    </div>
    <section className="card lesson-card" aria-label={stages[step]} tabIndex={-1} ref={sectionRef}>
      <div className="section-toolbar"><h2>{stages[step]}</h2>{step < 3 && <label className="rate"><span>Tốc độ nghe</span><select value={rate} onChange={event => setRate(Number(event.target.value) as Rate)}><option value={0.6}>0.6×</option><option value={0.8}>0.8×</option><option value={1}>1×</option></select></label>}</div>
      <p className="lesson-instruction">{instructions[step]}</p>
      {!canSpeak && step < 3 && <p className="notice">Trình duyệt chưa hỗ trợ đọc tiếng Pháp. Bạn vẫn có thể đọc hội thoại và làm các bài tập khác.</p>}
      {step === 0 && <>
        <div className="section-toolbar dialogue-controls">
          <button type="button" className="button primary" disabled={audioFailed} onClick={playDialogue}>{playingDialogue ? <Square size={16} /> : <Volume2 size={18} />}{playingDialogue ? 'Dừng hội thoại' : 'Nghe cả đoạn'}</button>
          <button type="button" className="button secondary" aria-expanded={transcript} onClick={() => setTranscript(!transcript)}><BookOpen size={17} />{transcript ? 'Ẩn lời thoại' : 'Xem lời thoại'}</button>
          <button role="switch" aria-checked={subtitles} className="switch-button" onClick={() => { setSubtitles(!subtitles); if (!subtitles) { setTranscript(true); onWork({ usedTranslation: true }) } }}><span className={`switch ${subtitles ? 'on' : ''}`} /> Bản dịch tiếng Việt</button>
        </div>
        {audioFailed && canSpeak && <p className="notice">Thiết bị chưa phát được hội thoại. Hãy đọc lời thoại để trả lời câu hỏi.</p>}
        {(lesson.level === 'A1' || lesson.level === 'A2') && <details className="warmup"><summary>Cần gợi ý trước khi nghe?</summary><dl>{lesson.chunks.slice(0, 2).map(([fr, vi]) => <div key={fr}><dt lang="fr">{fr}</dt><dd>{vi}</dd></div>)}</dl></details>}
        {transcript && <div className="dialogue">
          {lesson.dialogue.map(([name, fr, vi], index) => <div className={`dialogue-line ${focusedLine === index ? 'speaking-line' : ''}`} key={`${index}-${fr}`}><span className={`speaker ${index % 2 ? 'rose' : 'blue'}`}>{name[0]}</span><div><strong className="speaker-name">{name}</strong><p lang="fr">{fr}</p>{subtitles && <p className="muted">{vi}</p>}</div><button type="button" className="icon-button audio-button" disabled={audioFailed} aria-label={`Nghe câu ${index + 1}`} onClick={() => { stopDialogue(); speak(fr, rate, undefined, () => setAudioFailed(true)) }}><Volume2 size={18} /></button></div>)}
        </div>}
        <ListeningCheck question={lesson.listen} previous={checks.listen} assisted={Boolean(work?.usedTranslation)} onPass={outcome => onCheckpoint('listen', outcome)} />
        <Exercise key="fill" type="fill" exercise={lesson.exercises.fill} previous={checks.fill} onPass={outcome => onCheckpoint('fill', outcome)} />
      </>}
      {step === 1 && <>
        <div className="chunks">
          {lesson.chunks.map(([fr, vi, ipa, read, emoji, example, exampleVi]) => <article className="chunk-card" key={fr}><div className="chunk-head"><span className="chunk-emoji" aria-hidden="true">{emoji}</span><div><h3 lang="fr">{fr}</h3><p>{vi}</p></div><AudioButton text={fr.replace('…', '')} rate={rate} compact label={`Nghe ${fr}`} /></div><p className="phonetic">{ipa} · Gần đúng: {read}</p><p lang="fr">{example}</p><p className="muted">{exampleVi}</p></article>)}
        </div>
        <Exercise key="order" type="order" exercise={lesson.exercises.order} previous={checks.order} onPass={outcome => onCheckpoint('order', outcome)} />
      </>}
      {step === 2 && <>
        <div className="tip"><Lightbulb size={20} /><div><h3>{lesson.pronunciation.title}</h3><p>{lesson.pronunciation.tip}</p></div></div>
        {id === 'sons' && <details className="alphabet"><summary>Bảng chữ cái tiếng Pháp (A–Z)</summary><div className="alphabet-grid">{alphabet.map(([letter, ipa]) => <div key={letter}><AudioButton text={letter} rate={rate} label={`Nghe chữ ${letter}`} compact /><strong>{letter}</strong><span>/{ipa}/</span></div>)}</div></details>}
        <SoundChoice pairs={lesson.pronunciation.pairs} rate={rate} />
        <div className="shadow-card"><h3>Nghe rồi nhại lại</h3><p className="shadow-target" lang="fr">{lesson.pronunciation.target}</p><div className="token-row"><AudioButton text={lesson.pronunciation.target} rate={rate} />
          {microphone.supported && <button className="button secondary" disabled={voiceActive} onClick={() => microphone.listen(transcript => { const measured = compareWords(lesson.pronunciation.target, transcript); setResult({ ...measured, transcript }); onSpeech(measured.score) })}>{microphone.recording ? <Square size={16} /> : <Mic size={17} />}{microphone.recording ? 'Dừng nhận lời' : 'Nhận lời để so với mẫu'}</button>}
        </div>
        {!microphone.supported && <p className="notice">Trình duyệt chưa hỗ trợ nhận diện giọng nói. Hãy nhại theo nếu có âm thanh, rồi tiếp tục bài học.</p>}
        {microphone.error && <p className="notice" role="status">{microphone.error}</p>}
        {result && <div className="speech-result" role="status"><strong>{result.score}% khớp với câu mẫu</strong><div className="token-row" lang="fr">{result.words.map(({ word, correct }, index) => <span key={index} className={`word ${correct ? 'good' : 'retry'}`} aria-label={`${word}: ${correct ? 'khớp' : 'chưa khớp'}`}>{word}</span>)}</div><p>Trình duyệt nghe được: <span lang="fr">{result.transcript}</span></p><p className="muted">Điểm ước tính dựa trên từ được nhận diện.</p></div>}
        {!microphone.recording && <VoiceRecorder onActive={setVoiceActive} />}
        </div>
        <Exercise key="dictate" type="dictate" exercise={lesson.exercises.dictate} rate={rate} previous={checks.dictate} onPass={outcome => onCheckpoint('dictate', outcome)} />
      </>}
      {step === 3 && <>
        <div className="examples">{lesson.grammar.examples.map(([fr, vi]) => <div key={fr}><p lang="fr">{fr}</p><p className="muted">{vi}</p></div>)}</div>
        <p className="prompt">{lesson.grammar.question}</p>
        <textarea className="input" rows={2} value={work?.grammarNote ?? ''} maxLength={1200} onChange={event => onWork({ grammarNote: event.target.value })} placeholder="Thử viết quy tắc bạn nhận ra" aria-label="Quy tắc bạn rút ra" />
        <button className="button secondary" onClick={() => setShowGrammar(!showGrammar)} aria-expanded={showGrammar}><Lightbulb size={17} />{showGrammar ? 'Ẩn tóm tắt' : 'Xem quy tắc và tóm tắt'}</button>
        {showGrammar && <div className="grammar"><p>{lesson.grammar.rule}</p><table><thead><tr><th>Cấu trúc</th><th>Cách dùng hoặc ví dụ</th></tr></thead><tbody>{lesson.grammar.rows.map(([fr, vi]) => <tr key={fr}><td>{fr}</td><td>{vi}</td></tr>)}</tbody></table></div>}
        {showGrammar && language && <LanguageLab content={language} chosen={work?.languageChoice} onChoose={languageChoice => onWork({ languageChoice })} />}
        <Exercise key="translate" type="translate" exercise={lesson.exercises.translate} draft={work?.translation ?? ''} onDraft={translation => onWork({ translation })} previous={checks.translate} onPass={outcome => onCheckpoint('translate', outcome)} />
      </>}
      {step === 4 && <>
        <p className="prompt">{lesson.mission.prompt}</p>
        <textarea className="input" rows={4} value={mission} onChange={event => { onDraft(event.target.value); setShowSample(false) }} maxLength={1800} placeholder="Viết câu trả lời bằng tiếng Pháp" aria-label="Câu trả lời cho nhiệm vụ thực tế" lang="fr" />
        <div className="token-row">
          {microphone.supported && <button className="button secondary" onClick={() => microphone.listen(draft => { onDraft(draft); setShowSample(false) })}>{microphone.recording ? <Square size={16} /> : <Mic size={17} />}{microphone.recording ? 'Dừng ghi âm' : 'Nói câu trả lời'}</button>}
          <button className="button secondary" aria-expanded={missionHint} onClick={() => setMissionHint(!missionHint)}><Lightbulb size={17} />{missionHint ? 'Ẩn cụm gợi ý' : 'Cần cụm gợi ý'}</button>
          <button className="button primary" disabled={!mission.trim()} onClick={() => setShowSample(!showSample)} aria-expanded={showSample}>{showSample ? 'Ẩn phần đối chiếu' : 'Đối chiếu câu trả lời'}</button>
        </div>
        {microphone.error && <p className="notice" role="status">{microphone.error}</p>}
        {missionHint && <div className="mission-hints"><p>Chọn một cụm để chèn vào câu trả lời rồi sửa thành câu của bạn.</p><div className="token-row">{lesson.chunks.map(([fr]) => <button className="token" key={fr} lang="fr" onClick={() => addPhrase(fr)}>{fr}</button>)}</div></div>}
        {showSample && <div className="mission-compare" role="region" aria-label="Đối chiếu câu trả lời">
          <div><h3>Câu của bạn</h3><p lang="fr">{mission}</p></div>
          <div><h3>Một cách trả lời</h3><p lang="fr">{lesson.mission.sample}</p><AudioButton text={lesson.mission.sample} rate={rate} compact /></div>
          <ul>{lesson.mission.criteria.map(item => <li key={item}>{item}</li>)}</ul>
        </div>}
      </>}
    </section>
    <footer className="lesson-footer">
      {step > 0 && <button className="button secondary" onClick={() => move(step - 1)}><ChevronLeft size={18} /> Phần trước</button>}
      {step < 4 ? <><p className="footer-hint">{!canContinue && 'Thử bài tập hoặc xem giải thích để tiếp tục.'}</p><button className="button primary" disabled={!canContinue} onClick={() => move(step + 1)}>Phần tiếp theo</button></> : <>
        {!showSample && <p className="footer-hint">{mission.trim() ? 'Đối chiếu câu của bạn trước khi hoàn thành bài.' : 'Viết hoặc nói một câu theo tình huống để tiếp tục.'}</p>}
        <button className="button primary" disabled={!mission.trim() || !showSample} onClick={() => { onComplete(); setDone(completed ? 'review' : 'new'); window.scrollTo(0, 0) }}>{completed ? <RotateCcw size={17} /> : <CircleCheck size={17} />}{completed ? 'Kết thúc ôn bài' : 'Hoàn thành bài học'}</button>
      </>}
    </footer>
  </main>
}
