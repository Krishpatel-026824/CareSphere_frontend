import { Check } from 'lucide-react'

export default function BillingOrderStatus({
  steps,
  completedCount,
  estimateLabel,
  estimateValue,
}) {
  return (
    <section className="rounded-2xl bg-white border border-border-gray p-4 sm:p-5">
      <h3 className="text-sm font-bold text-navy mb-4">Order Status</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <ol className="flex-1 flex items-start min-w-0">
          {steps.map((step, index) => {
            const complete = index < completedCount

            return (
              <li key={step.id} className="flex-1 flex flex-col items-center relative">
                {index < steps.length - 1 ? (
                  <span
                    className={`absolute top-3 left-1/2 w-full h-[2px] ${
                      index < completedCount - 1 ? 'bg-teal' : 'bg-border-gray'
                    }`}
                  />
                ) : null}
                <span
                  className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                    complete ? 'bg-teal text-white' : 'bg-white border-2 border-border-gray'
                  }`}
                >
                  {complete ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : null}
                </span>
                <span
                  className={`mt-1.5 text-[11px] text-center leading-tight ${
                    complete ? 'font-bold text-navy' : 'text-body-gray'
                  }`}
                >
                  {step.label}
                </span>
              </li>
            )
          })}
        </ol>
        <div className="sm:text-right shrink-0 sm:pl-4 sm:border-l border-border-gray">
          <p className="text-[11px] text-body-gray">{estimateLabel}</p>
          <p className="text-sm font-bold text-navy mt-0.5">{estimateValue}</p>
        </div>
      </div>
    </section>
  )
}
