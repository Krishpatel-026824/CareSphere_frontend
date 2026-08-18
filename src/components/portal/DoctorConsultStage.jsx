import { useState } from 'react'
import { Mic, MicOff, ShieldCheck, Video, VideoOff, Wifi } from 'lucide-react'

function ControlButton({ active, danger, label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full inline-flex items-center justify-center cursor-pointer transition-colors ${
        danger
          ? 'bg-rose-500 text-white hover:bg-rose-600'
          : 'bg-white/15 text-white hover:bg-white/25'
      }`}
    >
      {children}
    </button>
  )
}

export default function DoctorConsultStage({
  visit,
  waitingLabel,
  patientWaitingLabel,
  selfViewLabel,
  cameraOffLabel,
  cameraOnLabel,
  micReadyLabel,
  micOffLabel,
  cameraOffHint,
  cameraOnHint,
  connectionLabel,
  connectionValue,
  durationLabel,
  durationValue,
  secureLabel,
}) {
  const [cameraOn, setCameraOn] = useState(false)
  const [micOn, setMicOn] = useState(true)

  return (
    <section className="relative h-full min-h-[380px] overflow-hidden rounded-[28px] bg-[#07141C] text-white flex flex-col shadow-[0_18px_40px_rgba(7,20,28,0.28)]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 shrink-0 flex items-center justify-between gap-2 px-4 sm:px-5 py-3.5">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/35 border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {waitingLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 border border-white/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
          <Wifi className="w-3.5 h-3.5" strokeWidth={2} />
          {connectionValue}
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4 text-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-teal/40 ring-offset-4 ring-offset-[#07141C] bg-white/10">
          {visit?.patientPhoto ? (
            <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <h2 className="mt-4 text-2xl sm:text-[28px] font-bold tracking-tight">{visit?.patientName}</h2>
        <p className="mt-1 text-sm text-white/70">{patientWaitingLabel}</p>
        <p className="mt-3 text-xs text-white/50 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal" strokeWidth={2} />
          {secureLabel}
        </p>
      </div>

      <div className="absolute z-20 bottom-24 sm:bottom-28 right-4 sm:right-5 w-[112px] sm:w-[132px] rounded-2xl overflow-hidden border border-white/20 bg-[#0B1C24] shadow-lg">
        <div
          className={`h-[76px] sm:h-[88px] flex flex-col items-center justify-center gap-1 ${
            cameraOn ? 'bg-teal/30' : 'bg-black/50'
          }`}
        >
          {cameraOn ? (
            <Video className="w-5 h-5 text-white/90" strokeWidth={1.8} />
          ) : (
            <VideoOff className="w-5 h-5 text-white/70" strokeWidth={1.8} />
          )}
          <p className="text-[10px] font-semibold text-white/80">
            {cameraOn ? cameraOnHint : cameraOffHint}
          </p>
        </div>
        <p className="px-2 py-1 text-[10px] font-semibold text-center bg-black/40">{selfViewLabel}</p>
      </div>

      <div className="relative z-10 shrink-0 px-4 pb-5 pt-2 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <ControlButton
            active={cameraOn}
            danger={!cameraOn}
            label={cameraOn ? cameraOnLabel : cameraOffLabel}
            onClick={() => setCameraOn((value) => !value)}
          >
            {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </ControlButton>
          <ControlButton
            active={micOn}
            danger={!micOn}
            label={micOn ? micReadyLabel : micOffLabel}
            onClick={() => setMicOn((value) => !value)}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </ControlButton>
        </div>
        <p className="text-[11px] text-white/55">
          {durationLabel} {durationValue} · {connectionLabel} {connectionValue}
        </p>
      </div>
    </section>
  )
}
