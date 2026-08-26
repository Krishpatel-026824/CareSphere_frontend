import { ClipboardList, FlaskConical, Users } from 'lucide-react'

const tools = [
  {
    id: 'patients',
    title: 'Patients',
    hint: 'Clinic queue and charts',
    icon: Users,
    tone: 'bg-[#E8F7F6] text-teal border-teal/15',
  },
  {
    id: 'labReports',
    title: 'Labs',
    hint: 'Patient lab reports',
    icon: FlaskConical,
    tone: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    id: 'notes',
    title: 'Notes',
    hint: 'Clinic tasks and notes',
    icon: ClipboardList,
    tone: 'bg-sky-50 text-sky-700 border-sky-100',
  },
]

export default function DoctorHomeToolsGrid({ onSelect }) {
  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm p-4 sm:p-5">
      <div className="mb-3.5">
        <h2 className="text-lg sm:text-xl font-bold text-navy tracking-tight leading-none">
          Shortcuts
        </h2>
        <p className="text-sm text-body-gray mt-1.5">Jump to patients, labs, or notes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {tools.map((tool) => {
          const Icon = tool.icon

          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelect?.(tool.id)}
              className="w-full text-left rounded-xl border border-[#EAF0F5] bg-[#F8FAFC] hover:bg-white hover:border-teal/30 px-3.5 py-3.5 flex items-center gap-3 cursor-pointer transition-colors"
            >
              <span
                className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${tool.tone}`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.85} />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-navy truncate">{tool.title}</p>
                <p className="text-[13px] text-body-gray mt-0.5 truncate">{tool.hint}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
