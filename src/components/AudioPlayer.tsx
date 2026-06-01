import { useRef, useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

function fmt(t: number) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggle = () => {
    const a = ref.current
    if (!a) return
    if (playing) {
      a.pause()
    } else {
      void a.play()
    }
    setPlaying(!playing)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current
    if (!a || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    a.currentTime = ratio * duration
  }

  return (
    <div className="flex items-center gap-5 rounded-sm border border-cream/15 bg-white/5 p-5 backdrop-blur-sm">
      <button
        onClick={toggle}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-framboise text-white transition-colors hover:bg-framboise-soft"
        aria-label={playing ? 'Pause' : 'Lecture'}
      >
        {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-cream/90">
          <Volume2 size={15} className="text-gold-soft" />
          <span className="truncate text-sm font-medium">{label}</span>
        </div>
        <div
          onClick={seek}
          className="mt-2 h-1.5 cursor-pointer overflow-hidden rounded-full bg-cream/15"
          role="slider"
          aria-label="Position de lecture"
          aria-valuenow={Math.round(progress)}
        >
          <div className="h-full rounded-full bg-gold transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-cream/50">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget
          setCurrent(a.currentTime)
          setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0)
        }}
        onEnded={() => {
          setPlaying(false)
          setProgress(0)
          setCurrent(0)
        }}
      />
    </div>
  )
}
