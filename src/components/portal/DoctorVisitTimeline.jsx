import { Check } from 'lucide-react'
import { getDoctorVisitTimelineHint } from '../../data/generators/doctorVisitTimelineGenerator'

function stepClass(state) {
  if (state === 'done') return 'bg-[#E8F7F6] text-teal'
  if (state === 'current') return 'bg-teal text-white shadow-sm'
  if (state === 'cancelled') return 'bg-rose-50 text-rose-600'
  return 'bg-[#F4F7FA] text-body-gray'
}

export default function DoctorVisitTimeline({ steps = [] }) {
  if (!steps.length) return null

  const hint = getDoctorVisitTimelineHint(steps)

  return (
    <div className="shrink-0">
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`rounded-2xl px-1.5 py-2 flex flex-col items-center gap-1 min-w-0 ${stepClass(step.state)}`}
          >
            {step.state === 'done' ? (
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            ) : (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  step.state === 'current' ? 'bg-white' : step.state === 'cancelled' ? 'bg-rose-400' : 'bg-[#C5CED8]'
                }`}
              />
            )}
            <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight truncate w-full">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {hint ? <p className="text-[12px] text-body-gray mt-2.5 px-0.5">{hint}</p> : null}
    </div>
  )
}
