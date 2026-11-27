import { useEffect, useRef, useState } from 'react'
import { AudioLines, Mic, Square } from 'lucide-react'
import { stopSpeech } from '../speech'

function microphoneError(error: unknown) {
  switch ((error as { name?: string } | null)?.name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'Micrô chưa được cấp quyền. Bạn có thể bật quyền trong cài đặt của trang hoặc tiếp tục tự luyện nói.'
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'Thiết bị chưa tìm thấy micrô. Hãy cắm micrô hoặc tiếp tục tự luyện nói.'
    case 'NotReadableError':
      return 'Micrô đang bận hoặc không đọc được. Hãy thử lại sau khi đóng ứng dụng đang dùng micrô.'
    default:
      return 'Chưa thu được giọng. Bạn có thể thử lại hoặc tiếp tục tự luyện nói.'
  }
}

export function VoiceRecorder({ onRecorded, onActive, limitSeconds = 45 }: { onRecorded?: () => void; onActive?: (active: boolean) => void; limitSeconds?: number }) {
  const supported = typeof MediaRecorder !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
  const [audio, setAudio] = useState('')
  const [error, setError] = useState('')
  const [state, setState] = useState<'idle' | 'requesting' | 'recording'>('idle')
  const [seconds, setSeconds] = useState(0)
  const current = useRef<{ stream?: MediaStream; recorder?: MediaRecorder; timer?: number; generation: number; url: string }>({ generation: 0, url: '' })

  function release(stream?: MediaStream) {
    stream?.getTracks().forEach(track => track.stop())
  }

  useEffect(() => () => {
    const active = current.current
    active.generation++
    if (active.timer !== undefined) window.clearInterval(active.timer)
    if (active.recorder?.state === 'recording') active.recorder.stop()
    release(active.stream)
    if (active.url) URL.revokeObjectURL(active.url)
  }, [])

  function stop() {
    const recorder = current.current.recorder
    if (recorder?.state === 'recording') recorder.stop()
  }

  async function start() {
    const active = current.current
    const generation = ++active.generation
    setError('')
    setSeconds(0)
    setState('requesting')
    onActive?.(true)
    let stream: MediaStream | undefined
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (generation !== active.generation) { release(stream); return }
      stopSpeech()
      active.stream = stream
      const chunks: Blob[] = []
      const recorder = new MediaRecorder(stream)
      active.recorder = recorder
      let failed = false
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data) }
      recorder.onerror = () => {
        failed = true
        if (generation === active.generation) setError('Quá trình thu âm bị gián đoạn. Hãy thử lại.')
      }
      recorder.onstop = () => {
        if (generation !== active.generation) return
        release(stream)
        active.stream = undefined
        active.recorder = undefined
        if (active.timer !== undefined) {
          window.clearInterval(active.timer)
          active.timer = undefined
        }
        setState('idle')
        onActive?.(false)
        if (failed || !chunks.length) {
          if (!failed) setError('Chưa có âm thanh trong đoạn thu. Hãy thử nói vài giây.')
          return
        }
        const next = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || chunks[0].type }))
        if (active.url) URL.revokeObjectURL(active.url)
        active.url = next
        setAudio(next)
        onRecorded?.()
      }
      recorder.start()
      setState('recording')
      const started = Date.now()
      active.timer = window.setInterval(() => {
        const elapsed = Math.min(limitSeconds, Math.floor((Date.now() - started) / 1000))
        setSeconds(elapsed)
        if (elapsed === limitSeconds) stop()
      }, 250)
    } catch (failure) {
      release(stream)
      if (generation !== active.generation) return
      setError(microphoneError(failure))
      setState('idle')
      onActive?.(false)
    }
  }

  return <div className="voice-recorder">
    {supported ? <>
      <div className="token-row">
        <button type="button" className={`button ${state === 'recording' ? 'primary' : 'secondary'}`} disabled={state === 'requesting'} onClick={() => state === 'recording' ? stop() : void start()}>
          {state === 'recording' ? <Square size={17} /> : <Mic size={17} />}
          {state === 'requesting' ? 'Đang chờ quyền micrô…' : state === 'recording' ? `Dừng thu · ${seconds}s` : audio ? 'Thu lại giọng của tôi' : 'Thu giọng của tôi'}
        </button>
        {state === 'recording' && <span className="muted">Tối đa {limitSeconds >= 60 ? `${limitSeconds / 60} phút` : `${limitSeconds} giây`}</span>}
      </div>
      {audio && state === 'idle' && <div className="voice-playback"><strong><AudioLines size={16} /> Nghe lại giọng của bạn</strong><audio src={audio} controls preload="metadata" /></div>}
      {error && <p className="notice" role="status">{error}</p>}
    </> : <p className="notice">Môi trường này chưa hỗ trợ thu âm. Bạn vẫn có thể nghe mẫu và tự luyện nói.</p>}
  </div>
}
