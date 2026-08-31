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
    card: 'bg-[#FFF7ED] border-[#FFEDD5]',
    icon: 'bg-orange-100 text-orange-600',
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

const detailCardStyles = {
  mail: {
    card: 'bg-[#EFF6FF] border-[#BFDBFE]',
    icon: 'bg-white text-sky-600 shadow-sm ring-1 ring-sky-200/80',
  },
  phone: {
    card: 'bg-[#ECFDF5] border-[#A7F3D0]',
    icon: 'bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-200/80',
  },
  cake: {
    card: 'bg-[#FFFBEB] border-[#FDE68A]',
    icon: 'bg-white text-amber-600 shadow-sm ring-1 ring-amber-200/80',
  },
  user: {
    card: 'bg-[#F5F3FF] border-[#DDD6FE]',
    icon: 'bg-white text-violet-600 shadow-sm ring-1 ring-violet-200/80',
  },
  droplet: {
    card: 'bg-[#FFF1F2] border-[#FECDD3]',
    icon: 'bg-white text-rose-600 shadow-sm ring-1 ring-rose-200/80',
  },
  map: {
    card: 'bg-[#E8F7F6] border-[#99F6E4]',
    icon: 'bg-white text-teal shadow-sm ring-1 ring-teal/25',
  },
  award: {
    card: 'bg-[#FFFBEB] border-[#FDE68A]',
    icon: 'bg-white text-amber-600 shadow-sm ring-1 ring-amber-200/80',
  },
  building: {
    card: 'bg-[#EEF2FF] border-[#C7D2FE]',
    icon: 'bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-200/80',
  },
  languages: {
    card: 'bg-[#FDF4FF] border-[#F5D0FE]',
    icon: 'bg-white text-fuchsia-600 shadow-sm ring-1 ring-fuchsia-200/80',
  },
}

function ProfileStatCard({ item }) {
  const style = statStyles[item.icon] || statStyles.calendar
  const Icon = style.Icon

  return (
    <div
      className={`rounded-2xl border px-3.5 sm:px-4 py-4 min-w-0 overflow-hidden flex items-start gap-3 h-full ${style.card}`}
    >
      <span
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${style.icon}`}
      >
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[24px] sm:text-[26px] xl:text-[24px] 2xl:text-[28px] font-bold text-navy tabular-nums leading-none">
          {item.value}
        </p>
        <p className="text-[14px] sm:text-[15px] font-semibold text-navy mt-1.5 leading-tight break-words">
          {item.label}
        </p>
        <p className="text-[12px] sm:text-[13px] text-body-gray mt-1 leading-snug break-words">
          {item.hint}
        </p>
      </div>
    </div>
  )
}

function ProfileDetailTile({ row, value }) {
  const Icon = detailIcons[row.icon] || Mail
  const style = detailCardStyles[row.icon] || detailCardStyles.mail

  return (
    <div
      className={`flex items-start gap-3.5 min-w-0 rounded-2xl border px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${style.card}`}
    >
      <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.icon}`}>
        <Icon className="w-5 h-5" strokeWidth={1.85} />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[13px] sm:text-sm font-semibold text-navy/55 uppercase tracking-[0.04em]">
          {row.label}
        </p>
        <p className="text-[17px] sm:text-lg font-bold text-navy mt-1.5 break-words leading-snug">
          {value || '—'}
        </p>
      </div>
    </div>
  )
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
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col min-w-0 h-full">
      <div className="h-1 bg-gradient-to-r from-teal via-[#0C948E] to-[#0B6E6A] shrink-0" />

      <div className="p-5 sm:p-6 flex flex-col gap-5 sm:gap-6 flex-1">
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
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-teal-light flex items-center justify-center text-teal text-2xl font-bold ring-[3px] ring-[#E6EBF1] cursor-pointer hover:ring-teal/40 transition-shadow disabled:cursor-default p-0 border-0"
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

          <div className="min-w-0 flex-1 pt-1">
            <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-navy tracking-tight leading-tight truncate">
              {details.name}
            </h2>
            <p className="text-[15px] sm:text-base text-body-gray mt-1.5 truncate">
              {details.role}
              {details.memberSince ? ` · ${details.memberSince}` : ''}
            </p>
            <div className="flex flex-wrap gap-2.5 mt-3">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] sm:text-sm font-semibold ${badge.tone}`}
                >
                  <badge.icon className="w-4 h-4" strokeWidth={2.25} />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 auto-rows-fr">
          {stats.map((item) => (
            <ProfileStatCard key={item.id} item={item} />
          ))}
        </div>

        <div className="pt-5 border-t border-[#E6EBF1] flex-1">
          <h3 className="text-[17px] sm:text-lg font-bold text-navy flex items-center gap-2.5">
            <User className="w-5 h-5 text-teal" strokeWidth={2} />
            Personal details
          </h3>

          {isEditing ? (
            <form
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              onSubmit={(event) => {
                event.preventDefault()
                onSave()
              }}
            >
              {fields.map((field) => (
                <label key={field.id} className="flex flex-col gap-2 min-w-0">
                  <span className="text-sm font-semibold text-body-gray">{field.label}</span>
                  <input
                    type={field.type}
                    value={draft[field.id] || ''}
                    onChange={(event) => onChange(field.id, event.target.value)}
                    className="min-h-12 rounded-xl border border-[#E6EBF1] bg-white px-3.5 text-[15px] text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                  />
                </label>
              ))}
              <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row gap-3 mt-1">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 min-h-12 rounded-xl border border-[#E6EBF1] bg-white text-[15px] font-semibold text-navy cursor-pointer hover:bg-bg-gray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-12 rounded-xl bg-teal text-white text-[15px] font-semibold cursor-pointer hover:bg-teal-dark transition-colors"
                >
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {infoRows.map((row) => (
                <ProfileDetailTile key={row.id} row={row} value={details[row.id]} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-[#7DD3FC] bg-[#E0F2FE] px-4 py-4 mt-auto shadow-[0_1px_2px_rgba(14,116,144,0.08)]">
          <span className="w-11 h-11 rounded-xl bg-white text-sky-600 flex items-center justify-center shrink-0 shadow-sm ring-1 ring-sky-200/80">
            <Shield className="w-5 h-5" strokeWidth={1.85} />
          </span>
          <p className="text-[14px] sm:text-[15px] font-medium text-navy/75 leading-relaxed flex-1 min-w-0">
            Your information is secure and encrypted. We never share your data with third parties.
          </p>
          <Lock className="w-5 h-5 text-sky-600 shrink-0" strokeWidth={1.85} />
        </div>
      </div>
    </section>
  )
}
