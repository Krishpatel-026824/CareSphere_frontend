import {
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  FilePenLine,
  FilePlus2,
  FileText,
  FlaskConical,
  Pencil,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react'

const look = {
  all: {
    icon: ClipboardList,
    stripe: 'bg-teal',
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    footer: 'bg-[#E8F7F6] text-navy',
  },
  Refill: {
    icon: RefreshCw,
    stripe: 'bg-sky-500',
    iconWrap: 'bg-sky-100 text-sky-700',
    value: 'text-sky-700',
    footer: 'bg-sky-50 text-sky-800',
  },
  Update: {
    icon: Pencil,
    stripe: 'bg-emerald-500',
    iconWrap: 'bg-emerald-100 text-emerald-700',
    value: 'text-emerald-700',
    footer: 'bg-emerald-50 text-emerald-800',
  },
  New: {
    icon: Plus,
    stripe: 'bg-teal',
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    footer: 'bg-[#E8F7F6] text-navy',
  },
  Order: {
    icon: FlaskConical,
    stripe: 'bg-amber-500',
    iconWrap: 'bg-amber-100 text-amber-700',
    value: 'text-amber-700',
    footer: 'bg-amber-50 text-amber-800',
  },
  Urgent: {
    icon: AlertTriangle,
    stripe: 'bg-rose-500',
    iconWrap: 'bg-rose-100 text-rose-700',
    value: 'text-rose-700',
    footer: 'bg-rose-50 text-rose-800',
  },
  Review: {
    icon: Search,
    stripe: 'bg-violet-500',
    iconWrap: 'bg-violet-100 text-violet-700',
    value: 'text-violet-700',
    footer: 'bg-violet-50 text-violet-800',
  },
  Due: {
    icon: FilePenLine,
    stripe: 'bg-amber-500',
    iconWrap: 'bg-amber-100 text-amber-700',
    value: 'text-amber-700',
    footer: 'bg-amber-50 text-amber-800',
  },
  Draft: {
    icon: FileText,
    stripe: 'bg-slate-500',
    iconWrap: 'bg-slate-100 text-slate-700',
    value: 'text-slate-700',
    footer: 'bg-slate-50 text-slate-700',
  },
  Open: {
    icon: FilePlus2,
    stripe: 'bg-teal',
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    footer: 'bg-[#E8F7F6] text-navy',
  },
}

export default function DoctorClinicStatCard({ item, active, onSelect }) {
  const tone = look[item.id] || look.all
  const Icon = tone.icon

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      className={`relative overflow-hidden w-full rounded-2xl border bg-white text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] cursor-pointer hover:shadow-md hover:border-teal/30 transition-all ${
        active ? 'border-teal ring-2 ring-teal/20' : 'border-border-gray'
      }`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-[5px] ${tone.stripe}`} aria-hidden="true" />
      <div className="flex items-center gap-3 pl-4 pr-3.5 pt-3 pb-2.5">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone.iconWrap}`}>
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-bold text-navy truncate">{item.label}</p>
            <p className={`ml-auto text-[28px] font-bold tabular-nums leading-none tracking-tight ${tone.value}`}>
              {item.value}
            </p>
          </div>
          <p className="text-[11px] text-body-gray mt-1 leading-snug truncate">{item.hint}</p>
        </div>
      </div>
      <div className={`mx-2.5 mb-2.5 rounded-xl px-3 py-2 flex items-center gap-2 ${tone.footer}`}>
        <p className="flex-1 min-w-0 text-[11px] font-semibold truncate">{item.footer}</p>
        <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </div>
    </button>
  )
}
