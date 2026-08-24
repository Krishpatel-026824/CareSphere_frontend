import { useRef } from 'react'
import {
  Award,
  Bell,
  Building2,
  CalendarDays,
  Cake,
  Droplet,
  FileText,
  Heart,
  Languages,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  User,
  UserRound,
} from 'lucide-react'

const badges = [
  { icon: Shield, label: 'Verified', tone: 'bg-emerald-50 text-emerald-700' },
  { icon: UserRound, label: 'Active member', tone: 'bg-violet-50 text-violet-700' },
]

const statStyles = {
  calendar: {
    card: 'bg-emerald-50/80 border-emerald-100',
    icon: 'bg-emerald-100 text-emerald-600',
    Icon: CalendarDays,
  },
  file: {
    card: 'bg-violet-50/80 border-violet-100',
    icon: 'bg-violet-100 text-violet-600',
    Icon: FileText,
  },
  bell: {
    card: 'bg-sky-50/80 border-sky-100',
    icon: 'bg-sky-100 text-sky-600',
    Icon: Bell,
  },
  message: {
    card: 'bg-sky-50/80 border-sky-100',
    icon: 'bg-sky-100 text-sky-600',
    Icon: MessageSquare,
  },
}

const detailIcons = {
  mail: Mail,
  phone: Phone,
  cake: Cake,
  user: User,
  droplet: Droplet,
  map: MapPin,
  award: Award,
  building: Building2,
  languages: Languages,
}

const detailTones = {
  mail: 'bg-sky-50 text-sky-600',
  phone: 'bg-emerald-50 text-emerald-600',
  cake: 'bg-amber-50 text-amber-600',
  user: 'bg-violet-50 text-violet-600',
  droplet: 'bg-rose-50 text-rose-600',
  map: 'bg-teal-light text-teal',
  award: 'bg-amber-50 text-amber-600',
  building: 'bg-indigo-50 text-indigo-600',
  languages: 'bg-fuchsia-50 text-fuchsia-600',
}

export default function ProfileHero({
  details,
  stats,
  infoRows,
  fields,
  isEditing,
  draft,
  onChange,
  onSave,
  onCancel,
  onAvatarChange,
}) {
  const fileInputRef = useRef(null)

  function openPhotoPicker() {
    if (!onAvatarChange) return
    fileInputRef.current?.click()
  }

  function handlePhotoSelected(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !file.type.startsWith('image/') || !onAvatarChange) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onAvatarChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="rounded-[28px] border border-slate-100/80 bg-white p-6 sm:p-8 shadow-sm shadow-slate-200/50">
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handlePhotoSelected}
          />
          <button
            type="button"
            onClick={openPhotoPicker}
            disabled={!onAvatarChange}
            aria-label="Change profile photo"
            className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] rounded-full overflow-hidden bg-gradient-to-br from-teal to-violet-500 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-slate-50 cursor-pointer hover:ring-teal/30 transition-shadow disabled:cursor-default disabled:hover:ring-slate-50 p-0 border-0"
          >
            {details.avatar ? (
              <img src={details.avatar} alt={details.name} className="w-full h-full object-cover object-top pointer-events-none" />
            ) : (
              details.initials
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-tight">
            {details.name}
          </h2>
          <p className="text-sm font-medium text-teal mt-1">{details.role}</p>
          <p className="text-xs text-body-gray mt-1">{details.memberSince}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.tone}`}
              >
                <badge.icon className="w-3 h-3" strokeWidth={2.25} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-teal/15 to-sky-100/80 items-center justify-center shrink-0 shadow-inner"
          aria-hidden="true"
        >
          <div className="relative">
            <Shield className="w-10 h-10 text-teal/70" strokeWidth={1.25} fill="currentColor" fillOpacity={0.12} />
            <Heart className="w-4 h-4 text-white fill-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={0} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((item) => {
          const style = statStyles[item.icon] || statStyles.calendar
          const Icon = style.Icon
          return (
            <div key={item.id} className={`rounded-2xl border px-4 py-4 ${style.card}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${style.icon}`}>
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <p className="text-2xl font-extrabold text-navy tabular-nums leading-none mt-3">{item.value}</p>
              <p className="text-sm font-semibold text-navy mt-1.5">{item.label}</p>
              <p className="text-[11px] text-body-gray mt-0.5">{item.hint}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-7 pt-6 border-t border-slate-100">
        <h3 className="text-base font-bold text-navy flex items-center gap-2">
          <User className="w-4 h-4 text-teal" strokeWidth={2} />
          Personal details
        </h3>

        {isEditing ? (
          <form
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              onSave()
            }}
          >
            {fields.map((field) => (
              <label key={field.id} className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-body-gray">{field.label}</span>
                <input
                  type={field.type}
                  value={draft[field.id] || ''}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </label>
            ))}
            <div className="sm:col-span-2 flex gap-3 mt-1">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 min-h-11 rounded-full border border-slate-200 bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 min-h-11 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal/90 transition-all"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {infoRows.map((row) => {
              const Icon = detailIcons[row.icon] || Mail
              const tone = detailTones[row.icon] || detailTones.mail
              return (
                <div key={row.id} className="flex items-start gap-3 min-w-0">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-body-gray">{row.label}</p>
                    <p className="text-sm font-bold text-navy mt-0.5 truncate">{details[row.id] || '—'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-7 flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3.5">
        <span className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <p className="text-[12px] sm:text-[13px] text-body-gray leading-snug flex-1">
          Your information is secure and encrypted. We never share your data with third parties.
        </p>
        <Lock className="w-4 h-4 text-sky-500 shrink-0" strokeWidth={1.75} />
      </div>
    </section>
  )
}
