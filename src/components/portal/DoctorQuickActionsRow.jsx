import { ChevronRight, FileText, FlaskConical, Pill, Video } from 'lucide-react'

const icons = {
  telemedicine: Video,
  pharmacy: Pill,
  lab: FlaskConical,
  records: FileText,
}

export default function DoctorQuickActionsRow({ actions = [], onActionClick }) {
  return (
    <section className="bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-4 sm:p-5 shrink-0">
      <h2 className="text-lg font-bold text-navy mb-3 sm:mb-4">Quick actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
        {actions.map((action) => {
          const Icon = icons[action.id]
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onActionClick?.(action.key)}
              className="w-full text-left rounded-2xl border border-[#E6EBF1] bg-[#F7FAFC] px-3.5 py-3 flex items-center gap-3 cursor-pointer hover:border-teal/40 hover:bg-white transition-all"
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${action.tone}`}>
                {Icon ? <Icon className="w-[18px] h-[18px]" strokeWidth={1.7} /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-navy leading-tight">{action.label}</span>
                {action.hint ? (
                  <span className="block text-[12px] text-body-gray mt-0.5 leading-snug truncate">{action.hint}</span>
                ) : null}
              </span>
              <ChevronRight className="w-4 h-4 text-body-gray shrink-0" strokeWidth={2} />
            </button>
          )
        })}
      </div>
    </section>
  )
}
