import { AudioLines, BookOpen, BriefcaseBusiness, Clock3, Coffee, HeartPulse, Map, MessageCircle, ShoppingBag, Users, Volume2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { speak } from '../speech'
import type { Rate } from '../speech'

const topicIcons = { audio: AudioLines, book: BookOpen, clock: Clock3, coffee: Coffee, heart: HeartPulse, map: Map, message: MessageCircle, bag: ShoppingBag, people: Users, briefcase: BriefcaseBusiness }

export function TopicIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = topicIcons[name as keyof typeof topicIcons] ?? BookOpen
  return <Icon size={size} aria-hidden="true" />
}

export function AudioButton({ text, rate = 1, label = 'Nghe mẫu', compact = false }: { text: string; rate?: Rate; label?: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false)
  return <span className="audio-control"><button type="button" className={compact ? 'icon-button audio-button' : 'button secondary'} onClick={() => {
    setFailed(false)
    if (!speak(text, rate, undefined, () => setFailed(true))) setFailed(true)
  }} title={label} aria-label={label}><Volume2 size={18} />{!compact && label}</button>
    {failed && <span className="audio-error" role="status">Chưa phát được giọng Pháp. Hãy đọc câu mẫu hoặc thử lại sau.</span>}
  </span>
}

export function ScreenTitle({ label, title, children }: { label?: string; title: string; children?: ReactNode }) {
  return <header className="screen-title">{label && <p className="eyebrow">{label}</p>}<h1>{title}</h1>{children && <p>{children}</p>}</header>
}

export function Bar({ value, label }: { value: number; label: string }) {
  return <div className="bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.min(100, value))}><span style={{ width: `${Math.min(100, value)}%` }} /></div>
}
