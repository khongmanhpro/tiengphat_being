import { AudioLines, BookOpen, BriefcaseBusiness, Clock3, Coffee, HeartPulse, Map, MessageCircle, ShoppingBag, Users, Volume2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { canSpeak, speak } from '../speech'
import type { Rate } from '../speech'

const topicIcons = { audio: AudioLines, book: BookOpen, clock: Clock3, coffee: Coffee, heart: HeartPulse, map: Map, message: MessageCircle, bag: ShoppingBag, people: Users, briefcase: BriefcaseBusiness }

export function TopicIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = topicIcons[name as keyof typeof topicIcons] ?? BookOpen
  return <Icon size={size} aria-hidden="true" />
}

export function AudioButton({ text, rate = 1, label = 'Nghe mẫu', compact = false }: { text: string; rate?: Rate; label?: string; compact?: boolean }) {
  return <button type="button" className={compact ? 'icon-button audio-button' : 'button secondary'} onClick={() => speak(text, rate)} disabled={!canSpeak} title={canSpeak ? label : 'Trình duyệt chưa hỗ trợ âm thanh'} aria-label={label}><Volume2 size={18} />{!compact && label}</button>
}

export function ScreenTitle({ label, title, children }: { label?: string; title: string; children?: ReactNode }) {
  return <header className="screen-title">{label && <p className="eyebrow">{label}</p>}<h1>{title}</h1>{children && <p>{children}</p>}</header>
}

export function Bar({ value, label }: { value: number; label: string }) {
  return <div className="bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.min(100, value))}><span style={{ width: `${Math.min(100, value)}%` }} /></div>
}
