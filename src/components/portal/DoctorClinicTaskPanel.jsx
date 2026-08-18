import { Check, FlaskConical } from 'lucide-react'
import { clinicTaskBadgeStyles } from '../../data/mocks/doctorClinicTools'
import Button from '../Button'

export default function DoctorClinicTaskPanel({
  task,
  instructionsLabel,
  planLabel,
  actionLabel,
  viewReportLabel,
  onViewReport,
  onOpenPatient,
}) {
  if (!task) return null

  const badgeClass = clinicTaskBadgeStyles[task.badge] || clinicTaskBadgeStyles.New
  const personBits = [task.ageLabel, task.gender].filter(Boolean).join(' · ')

  return (
    <section className="bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 sm:p-6 flex flex-col gap-4 h-full min-h-0">
      <div className="flex items-start gap-3.5 shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-teal-light">
          {task.avatar ? (
            <img src={task.avatar} alt="" className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-lg font-bold text-navy truncate">{task.patientName}</h2>
            {task.badge ? (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
                {task.badge}
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-navy mt-0.5">{task.title}</p>
          {personBits ? <p className="text-sm text-body-gray mt-0.5">{personBits}</p> : null}
        </div>
      </div>

      {task.details?.length ? (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5 shrink-0">
          {task.details.map((item) => (
            <div key={item.label} className="rounded-xl bg-[#F4F7FA] p-3 min-w-0">
              <p className="text-[11px] text-body-gray">{item.label}</p>
              <p className="text-sm font-bold text-navy mt-0.5 leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {task.instructions || task.subtitle ? (
        <div className="rounded-2xl bg-[#E7F6F5] px-4 py-3 shrink-0">
          <p className="text-xs font-semibold text-teal">{instructionsLabel}</p>
          <p className="text-sm text-navy mt-1 leading-relaxed">{task.instructions || task.subtitle}</p>
        </div>
      ) : null}

      {task.planItems?.length ? (
        <div className="rounded-2xl bg-[#F4F7FA] px-4 py-3 shrink-0">
          <p className="text-xs font-semibold text-body-gray uppercase tracking-wide shrink-0">
            {planLabel}
          </p>
          <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {task.planItems.map((item) => (
              <li
                key={item}
                className="rounded-xl bg-white border border-[#E6EBF1] px-3 py-2.5 flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-[#E7F6F5] text-teal inline-flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" strokeWidth={2.4} />
                </span>
                <span className="text-sm text-navy leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-2 shrink-0 mt-auto">
        {onViewReport ? (
          <Button variant="secondary" onClick={onViewReport} className="sm:flex-1">
            <FlaskConical className="w-5 h-5" strokeWidth={1.8} />
            {viewReportLabel}
          </Button>
        ) : null}
        <Button onClick={() => onOpenPatient?.(task)} className="sm:flex-1">
          {actionLabel}
        </Button>
      </div>
    </section>
  )
}
