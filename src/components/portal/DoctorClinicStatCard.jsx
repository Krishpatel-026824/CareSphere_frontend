import {
  AlertTriangle,
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
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    accent: 'from-teal-50 to-cyan-50',
    ring: 'ring-teal/25',
    border: 'border-teal/40',
  },
  Refill: {
    icon: RefreshCw,
    iconWrap: 'bg-sky-100 text-sky-700',
    value: 'text-sky-700',
    accent: 'from-sky-50 to-indigo-50',
    ring: 'ring-sky-300/35',
    border: 'border-sky-300/55',
  },
  Update: {
    icon: Pencil,
    iconWrap: 'bg-emerald-100 text-emerald-700',
    value: 'text-emerald-700',
    accent: 'from-emerald-50 to-lime-50',
    ring: 'ring-emerald-300/35',
    border: 'border-emerald-300/55',
  },
  New: {
    icon: Plus,
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    accent: 'from-violet-50 to-fuchsia-50',
    ring: 'ring-violet-300/35',
    border: 'border-violet-300/55',
  },
  Order: {
    icon: FlaskConical,
    iconWrap: 'bg-amber-100 text-amber-700',
    value: 'text-amber-700',
    accent: 'from-amber-50 to-orange-50',
    ring: 'ring-amber-300/35',
    border: 'border-amber-300/55',
  },
  Urgent: {
    icon: AlertTriangle,
    iconWrap: 'bg-rose-100 text-rose-700',
    value: 'text-rose-700',
    accent: 'from-rose-50 to-red-50',
    ring: 'ring-rose-300/35',
    border: 'border-rose-300/55',
  },
  Review: {
    icon: Search,
    iconWrap: 'bg-violet-100 text-violet-700',
    value: 'text-violet-700',
    accent: 'from-violet-50 to-indigo-50',
    ring: 'ring-violet-300/35',
    border: 'border-violet-300/55',
  },
  Due: {
    icon: FilePenLine,
    iconWrap: 'bg-amber-100 text-amber-700',
    value: 'text-amber-700',
    accent: 'from-amber-50 to-yellow-50',
    ring: 'ring-amber-300/35',
    border: 'border-amber-300/55',
  },
  Draft: {
    icon: FileText,
    iconWrap: 'bg-slate-100 text-slate-700',
    value: 'text-slate-700',
    accent: 'from-slate-50 to-zinc-50',
    ring: 'ring-slate-300/35',
    border: 'border-slate-300/55',
  },
  Open: {
    icon: FilePlus2,
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    accent: 'from-cyan-50 to-teal-50',
    ring: 'ring-cyan-300/35',
    border: 'border-cyan-300/55',
  },
}

export default function DoctorClinicStatCard({ item, active, onSelect }) {
  const tone = look[item.id] || look.all
  const Icon = tone.icon

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      className={`w-full rounded-2xl border px-3 py-2 flex items-center justify-between gap-2 cursor-pointer transition-all outline-none bg-gradient-to-r ${tone.accent} ${
        active
          ? `${tone.border} shadow-sm ring-2 ${tone.ring}`
          : 'border-border-gray hover:border-slate-300 hover:shadow-sm'
      } focus-visible:ring-2 ${tone.ring}`}
    >
      <div className="min-w-0 flex items-center gap-2">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tone.iconWrap}`}>
          <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
        </span>
        <p className="text-[13px] font-bold text-navy truncate">{item.label}</p>
      </div>
      <span
        className={`min-w-7 h-7 px-2 rounded-lg inline-flex items-center justify-center text-[28px] font-bold tabular-nums leading-none tracking-tight shrink-0 bg-white/80 ${tone.value}`}
      >
        {item.value}
      </span>
    </button>
  )
}
