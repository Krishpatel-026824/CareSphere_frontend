import { Check } from 'lucide-react'
import { getDoctorVisitTimelineHint } from '../../data/generators/doctorVisitTimelineGenerator'

function StepDot({ state }) {
  if (state === 'done') {
    return (
      <span className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center shrink-0">
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
    )
  }

  if (state === 'current') {
    return (
      <span className="w-5 h-5 rounded-full bg-white border-2 border-teal flex items-center justify-center shrink-0">
        <span className="w-2 h-2 rounded-full bg-teal" />
      </span>
    )
  }

  if (state === 'cancelled') {
    return <span className="w-5 h-5 rounded-full bg-rose-100 border-2 border-rose-300 shrink-0" />
  }

  return <span className="w-5 h-5 rounded-full bg-white border-2 border-[#C5CED8] shrink-0" />
}

function StepConnector({ leftState }) {
  const active = leftState === 'done'
  return (
    <span
      className={`block h-0.5 w-full rounded-full ${active ? 'bg-teal' : 'bg-[#D0D9E3]'}`}
      aria-hidden="true"
    />
  )
}

export default function DoctorVisitTimeline({ steps = [] }) {
  if (!steps.length) return null

  const hint = getDoctorVisitTimelineHint(steps)

  return (
    <div className="rounded-xl bg-[#F3F4F6] px-3 sm:px-4 py-3 shrink-0">
      <div className="flex items-start w-full">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-start min-w-0 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
            <div className="flex flex-col items-center gap-1.5 shrink-0 w-[4.5rem] sm:w-[5.5rem]">
              <StepDot state={step.state} />
              <span
                className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight px-0.5 ${
                  step.state === 'done' || step.state === 'current'
                    ? 'text-navy'
                    : step.state === 'cancelled'
                      ? 'text-rose-600'
                      : 'text-body-gray'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className="flex-1 flex items-center px-1 sm:px-2 mt-2.5 min-w-[12px]">
                <StepConnector leftState={step.state} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {hint ? (
        <p className="text-[11px] text-body-gray mt-2.5 pt-2 border-t border-[#E0E6ED]">{hint}</p>
      ) : null}
    </div>
  )
}
