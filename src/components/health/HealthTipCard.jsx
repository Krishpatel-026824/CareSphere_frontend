import { tipIcons, tipNoteIcons } from './healthIcons'

export default function HealthTipCard({ tip }) {
  const Icon = tipIcons[tip.icon]
  const TipIcon = tipNoteIcons[tip.tipIcon]

  return (
    <article className={`rounded-2xl border p-4 flex flex-col gap-3 min-w-0 h-full ${tip.cardTone}`}>
      <div className="flex items-center gap-3">
        <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tip.iconTone}`}>
          {Icon ? <Icon className="w-5 h-5" strokeWidth={1.75} /> : null}
        </span>
        <div className="min-w-0">
          <p className={`text-[10px] font-bold tracking-[0.12em] ${tip.labelTone}`}>
            STEP {tip.step}
          </p>
          <p className="text-[15px] font-bold text-navy leading-tight mt-0.5">{tip.title}</p>
        </div>
      </div>

      <p className="text-sm text-body-gray leading-relaxed">{tip.text}</p>

      <p className={`mt-auto rounded-xl px-3 py-2 text-[12px] font-medium leading-snug flex items-center gap-2 ${tip.tipTone}`}>
        {TipIcon ? <TipIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} /> : null}
        <span>{tip.tip}</span>
      </p>
    </article>
  )
}
