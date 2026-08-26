import { Check } from 'lucide-react'
import { getDoctorVisitTimelineHint } from '../../data/generators/doctorVisitTimelineGenerator'

function stepClass(state) {
  if (state === 'done') return 'bg-[#E8F7F6] text-teal'
  if (state === 'current') return 'bg-teal text-white shadow-sm'
  if (state === 'cancelled') return 'bg-rose-50 text-rose-600'
  return 'bg-[#F4F7FA] text-body-gray'
}

export default function DoctorVisitTimeline({ steps = [], tasks = [], compact = false }) {
  if (!steps.length) return null

  const hint = getDoctorVisitTimelineHint(steps, tasks)

  return (
    <div className="shrink-0">
      <div className={`grid grid-cols-4 ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${compact ? 'rounded-xl px-1 py-1.5 gap-0.5' : 'rounded-2xl px-1.5 py-2 gap-1'} flex flex-col items-center min-w-0 ${stepClass(step.state)}`}
          >
            {step.state === 'done' ? (
              <Check className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={3} />
            ) : (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  step.state === 'current' ? 'bg-white' : step.state === 'cancelled' ? 'bg-rose-400' : 'bg-[#C5CED8]'
                }`}
              />
            )}
            <span className="text-[11px] font-semibold tracking-tight text-center leading-tight truncate w-full">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {hint ? (
        <p
          className={`text-body-gray px-0.5 font-medium tracking-tight ${
            compact ? 'text-[13px] mt-2' : 'text-[13px] mt-2.5'
          }`}
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
