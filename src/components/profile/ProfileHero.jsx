import { useRef } from 'react'
import {
  Award,
  Bell,
  Building2,
  CalendarDays,
  Cake,
  Droplet,
  FileText,
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
  { icon: Shield, label: 'Verified', tone: 'bg-emerald-100 text-emerald-800' },
  { icon: UserRound, label: 'Active member', tone: 'bg-sky-100 text-sky-800' },
]

const statStyles = {
  calendar: {
    card: 'bg-[#F0FDF4] border-[#DCFCE7]',
    icon: 'bg-emerald-100 text-emerald-600',
    Icon: CalendarDays,
  },
  file: {
    card: 'bg-[#F5F3FF] border-[#EDE9FE]',
    icon: 'bg-violet-100 text-violet-600',
    Icon: FileText,
  },
  bell: {
    card: 'bg-[#F0F9FF] border-[#E0F2FE]',
    icon: 'bg-sky-100 text-sky-600',
    Icon: Bell,
  },
  message: {
    card: 'bg-[#F0F9FF] border-[#E0F2FE]',
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
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 min-w-0">
      <div className="flex items-center gap-3 sm:gap-4">
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
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-teal-light flex items-center justify-center text-teal text-xl font-bold ring-2 ring-border-gray cursor-pointer hover:ring-teal/40 transition-shadow disabled:cursor-default p-0 border-0"
          >
            {details.avatar ? (
              <img
                src={details.avatar}
                alt={details.name}
                className="w-full h-full object-cover object-top pointer-events-none"
              />
            ) : (
              details.initials
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-navy tracking-tight leading-tight truncate">
            {details.name}
          </h2>
          <p className="text-sm text-body-gray mt-0.5 truncate">
            {details.role}
            {details.memberSince ? ` · ${details.memberSince}` : ''}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${badge.tone}`}
              >
                <badge.icon className="w-3 h-3" strokeWidth={2.25} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((item) => {
          const style = statStyles[item.icon] || statStyles.calendar
          const Icon = style.Icon
          return (
            <div
              key={item.id}
              className={`rounded-xl border px-2.5 sm:px-3.5 py-2.5 sm:py-3 min-w-0 ${style.card}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${style.icon}`}>
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <p className="text-lg sm:text-xl font-bold text-navy tabular-nums leading-none mt-2">
                {item.value}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-navy mt-1 truncate">{item.label}</p>
              <p className="text-[10px] sm:text-[11px] text-body-gray mt-0.5 truncate">
                {item.hint}
              </p>
            </div>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border-gray">
        <h3 className="text-sm font-bold text-navy flex items-center gap-2">
          <User className="w-4 h-4 text-teal" strokeWidth={2} />
          Personal details
        </h3>

        {isEditing ? (
          <form
            className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              onSave()
            }}
          >
            {fields.map((field) => (
              <label key={field.id} className="flex flex-col gap-1.5 min-w-0">
                <span className="text-xs font-semibold text-body-gray">{field.label}</span>
                <input
                  type={field.type}
                  value={draft[field.id] || ''}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  className="min-h-11 rounded-xl border border-border-gray bg-white px-3 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                />
              </label>
            ))}
            <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row gap-2.5 mt-1">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark transition-colors"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {infoRows.map((row) => {
              const Icon = detailIcons[row.icon] || Mail
              const tone = detailTones[row.icon] || detailTones.mail
              return (
                <div key={row.id} className="flex items-start gap-2.5 min-w-0">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tone}`}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-body-gray">{row.label}</p>
                    <p className="text-sm font-semibold text-navy mt-0.5 break-words">{details[row.id] || '—'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex items-start sm:items-center gap-2.5 rounded-xl border border-[#E0F2FE] bg-[#F0F9FF] px-3.5 py-3">
        <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <p className="text-xs sm:text-[13px] text-body-gray leading-snug flex-1 min-w-0">
          Your information is secure and encrypted. We never share your data with third parties.
        </p>
        <Lock className="w-4 h-4 text-sky-500 shrink-0 hidden sm:block" strokeWidth={1.75} />
      </div>
    </section>
  )
}
