import { useEffect, useRef, useState } from 'react'
import voiceSamples from './data/voice-samples.json'

export type Rate = 0.6 | 0.8 | 1

type RecognitionResult = { results: ArrayLike<ArrayLike<{ transcript: string }>> }
type Recognition = {
  lang: string
  interimResults: boolean
  onresult: ((event: RecognitionResult) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}
type SpeechWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }

const hasSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window
const hasSamples = typeof Audio !== 'undefined' && Boolean(new Audio().canPlayType('audio/mpeg'))
const samples: Record<string, string> = voiceSamples
export const canSpeak = hasSamples || hasSynthesis

let playing: HTMLAudioElement | undefined
let playbackId = 0

export function stopSpeech() {
  playbackId++
  if (playing) {
    playing.onended = null
    playing.onerror = null
    playing.pause()
    playing = undefined
  }
  if (hasSynthesis) window.speechSynthesis.cancel()
}

export function speak(fr: string, rate: Rate = 1, onEnd?: () => void, onFailure?: () => void) {
  stopSpeech()
  const id = playbackId
  let settled = false

  function finish(failed = false) {
    if (id !== playbackId || settled) return
    settled = true
    playing = undefined
    if (failed) onFailure?.()
    onEnd?.()
  }

  function synthesize() {
    if (id !== playbackId || settled) return false
    if (!hasSynthesis) { finish(true); return false }
    const line = new SpeechSynthesisUtterance(fr)
    line.lang = 'fr-FR'
    line.rate = rate
    const voices = window.speechSynthesis.getVoices()
    line.voice = voices.find(voice => voice.lang.toLowerCase() === 'fr-fr') ?? voices.find(voice => voice.lang.toLowerCase().startsWith('fr')) ?? null
    if (voices.length && !line.voice) { finish(true); return false }
    line.onend = () => finish()
    line.onerror = event => { if (!['canceled', 'interrupted'].includes(event.error)) finish(true) }
    try { window.speechSynthesis.speak(line); return true }
    catch { finish(true); return false }
  }

  const clip = hasSamples ? samples[fr.trim()] : undefined
  if (!clip) return synthesize()

  const audio = new Audio(clip)
  playing = audio
  audio.playbackRate = rate
  audio.onended = () => finish()
  let fellBack = false
  function fallback() {
    if (id !== playbackId || fellBack) return
    fellBack = true
    audio.onended = null
    audio.onerror = null
    playing = undefined
    synthesize()
  }
  audio.onerror = fallback
  try { void audio.play().catch(fallback) } catch { fallback() }
  return true
}

export function useRecognition() {
  const scopedWindow = window as SpeechWindow
  const Constructor = scopedWindow.SpeechRecognition ?? scopedWindow.webkitSpeechRecognition
  const recognition = useRef<Recognition | null>(null)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState('')
  function listen(onResult: (value: string) => void) {
    if (recognition.current) {
      recognition.current.stop()
      return
    }
    if (!Constructor) return
    stopSpeech()
    const input = new Constructor()
    input.lang = 'fr-FR'
    input.interimResults = false
    input.onresult = event => {
      const transcript = event.results[0]?.[0]?.transcript
      if (transcript) onResult(transcript)
    }
    input.onerror = event => {
      const errors: Record<string, string> = {
        'not-allowed': 'Quyền dùng micrô đang tắt. Bạn có thể cấp quyền hoặc tiếp tục bằng bàn phím.',
        'no-speech': 'Chưa nghe thấy giọng nói. Hãy thử lại gần micrô hơn.',
        network: 'Dịch vụ nhận giọng nói đang mất kết nối. Bạn có thể thử lại hoặc bỏ qua.',
        'audio-capture': 'Trình duyệt không tìm thấy micrô.',
        'service-not-allowed': 'Trình duyệt chưa cho phép dịch vụ nhận giọng nói.',
      }
      if (event.error !== 'aborted') setError(errors[event.error] ?? 'Không nhận được giọng nói. Hãy thử lại hoặc bỏ qua.')
    }
    input.onend = () => { setRecording(false); recognition.current = null }
    setError('')
    try {
      recognition.current = input
      input.start()
      setRecording(true)
    } catch {
      recognition.current = null
      setError('Chưa thể bật micrô. Bạn có thể thử lại hoặc bỏ qua.')
    }
  }
  useEffect(() => () => {
    if (recognition.current) {
      recognition.current.onend = null
      recognition.current.abort()
    }
  }, [])
  return { supported: Boolean(Constructor), recording, error, listen }
}

export function normalize(text: string) {
  return text.toLocaleLowerCase('fr').normalize('NFC').replaceAll(/[’‘ʼ]/g, "'")
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ').trim().replace(/\s+/g, ' ')
}

export function compareWords(expected: string, spoken: string) {
  const target = normalize(expected).split(' ').filter(Boolean)
  const heard = normalize(spoken).split(' ').filter(Boolean)
  const distance = target.map(() => Array<number>(heard.length + 1).fill(0))
  distance.push(Array<number>(heard.length + 1).fill(0))
  for (let i = 0; i <= target.length; i++) distance[i][0] = i
  for (let j = 0; j <= heard.length; j++) distance[0][j] = j
  for (let i = 1; i <= target.length; i++) {
    for (let j = 1; j <= heard.length; j++) {
      distance[i][j] = Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1, distance[i - 1][j - 1] + Number(target[i - 1] !== heard[j - 1]))
    }
  }
  const words = target.map(word => ({ word, correct: false }))
  let i = target.length
  let j = heard.length
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && distance[i][j] === distance[i - 1][j - 1] + Number(target[i - 1] !== heard[j - 1])) {
      words[i - 1].correct = target[i - 1] === heard[j - 1]
      i--
      j--
    } else if (i > 0 && distance[i][j] === distance[i - 1][j] + 1) {
      i--
    } else {
      j--
    }
  }
  const score = Math.max(0, Math.round((1 - distance[target.length][heard.length] / Math.max(target.length, heard.length, 1)) * 100))
  return { words, score }
}
