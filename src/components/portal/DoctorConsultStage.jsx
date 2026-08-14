import { useState } from 'react'
import { Mic, MicOff, Video, VideoOff } from 'lucide-react'

export default function DoctorConsultStage({
  title,
  hint,
  waitingLabel,
  cameraOffLabel,
  cameraOnLabel,
  micReadyLabel,
  micOffLabel,
}) {
  const [cameraOn, setCameraOn] = useState(false)
  const [micOn, setMicOn] = useState(true)

  return (
    <section className="relative h-full min-h-[280px] overflow-hidden rounded-2xl bg-navy text-white flex flex-col">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-teal blur-3xl" />
        <div className="absolute -bottom-20 -right-8 w-72 h-72 rounded-full bg-teal blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 px-6 py-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center">
          {cameraOn ? (
            <Video className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.6} />
          ) : (
            <VideoOff className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.6} />
          )}
        </div>
        <div className="text-center max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-light">{waitingLabel}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm text-white/70">{hint}</p>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/20 px-4 py-3 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCameraOn((value) => !value)}
          className="min-h-10 px-3.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          {cameraOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
          {cameraOn ? cameraOnLabel : cameraOffLabel}
        </button>
        <button
          type="button"
          onClick={() => setMicOn((value) => !value)}
          className="min-h-10 px-3.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          {micOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          {micOn ? micReadyLabel : micOffLabel}
        </button>
      </div>
    </section>
  )
}
