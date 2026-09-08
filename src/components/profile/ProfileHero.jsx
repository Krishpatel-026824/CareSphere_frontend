import { useRef } from 'react'
import {
  Award,
  Bell,
  Building2,
  CalendarDays,
  Cake,
  Camera,
  Droplet,
  FileText,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  User,
  UserRound,
} from 'lucide-react'

const badges = [
  { icon: Shield, label: 'Verified' },
  { icon: UserRound, label: 'Active member' },
]

const statIcons = {
  calendar: CalendarDays,
  file: FileText,
  bell: Bell,
  message: MessageSquare,
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

function ProfileStatCard({ item }) {
  const Icon = statIcons[item.icon] || CalendarDays

  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-[#FAFCFD] px-3.5 py-3 min-w-0 flex items-center gap-3 hover:border-teal/25 hover:bg-white transition-colors">
      <span className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[22px] sm:text-[24px] font-bold text-navy tabular-nums leading-none tracking-tight">
          {item.value}
        </p>
        <p className="text-[13px] font-semibold text-navy mt-1 leading-tight">{item.label}</p>
        <p className="text-[11px] text-body-gray leading-snug mt-0.5">{item.hint}</p>
      </div>
    </div>
  )
}

function ProfileDetailTile({ row, value }) {
  const Icon = detailIcons[row.icon] || Mail

  return (
    <div className="flex items-center gap-3 min-w-0 rounded-xl border border-[#E6EBF1] bg-white px-3.5 py-3 hover:border-teal/20 transition-colors">
      <span className="w-9 h-9 rounded-lg bg-[#F0FAF9] text-teal flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-body-gray uppercase tracking-[0.06em]">
          {row.label}
        </p>
        <p className="text-[14px] sm:text-[15px] font-semibold text-navy mt-0.5 break-words leading-snug">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

function statsGridClass(count) {
  if (count <= 3) return 'grid grid-cols-1 sm:grid-cols-3 gap-2.5'
  return 'grid grid-cols-2 lg:grid-cols-4 gap-2.5'
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
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden min-w-0">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark shrink-0" />

      <div className="relative px-4 sm:px-5 pt-5 pb-4 border-b border-[#E6EBF1] bg-gradient-to-br from-[#F0FDFA] via-white to-[#F8FAFC]">
        <div className="flex items-start gap-3.5 sm:gap-4">
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
              className="group relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-teal-light flex items-center justify-center text-teal text-xl font-bold ring-2 ring-white shadow-[0_4px_14px_rgba(7,26,47,0.08)] cursor-pointer p-0 border-0 disabled:cursor-default"
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
              {onAvatarChange ? (
                <span className="absolute inset-0 bg-navy/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" strokeWidth={1.85} />
                </span>
              ) : null}
            </button>
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-navy tracking-tight leading-tight">
              {details.name}
            </h2>
            <p className="text-[13px] sm:text-[14px] text-body-gray mt-1 leading-snug">
              <span className="font-semibold text-navy/80">{details.role}</span>
              {details.memberSince ? (
                <span className="text-body-gray"> · {details.memberSince}</span>
              ) : null}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-white border border-[#E6EBF1] text-navy shadow-sm"
                >
                  <badge.icon className="w-3.5 h-3.5 text-teal" strokeWidth={2.25} />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4">
        <div className={statsGridClass(stats.length)}>
          {stats.map((item) => (
            <ProfileStatCard key={item.id} item={item} />
          ))}
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-teal-light text-teal-dark inline-flex items-center justify-center">
              <User className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
            <h3 className="text-[15px] sm:text-base font-bold text-navy">Personal details</h3>
          </div>

          {isEditing ? (
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                onSave()
              }}
            >
              {fields.map((field) => (
                <label key={field.id} className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[13px] font-semibold text-body-gray">{field.label}</span>
                  <input
                    type={field.type}
                    value={draft[field.id] || ''}
                    onChange={(event) => onChange(field.id, event.target.value)}
                    className="min-h-11 rounded-xl border border-[#E6EBF1] bg-[#FAFCFD] px-3.5 text-[15px] text-navy outline-none focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/15 transition-all"
                  />
                </label>
              ))}
              <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row gap-2.5 mt-1">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 min-h-11 rounded-xl border border-[#E6EBF1] bg-white text-[15px] font-semibold text-navy cursor-pointer hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-11 rounded-xl bg-teal text-white text-[15px] font-semibold cursor-pointer hover:bg-teal-dark transition-colors shadow-[0_4px_12px_rgba(14,165,160,0.25)]"
                >
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {infoRows.map((row) => (
                <ProfileDetailTile key={row.id} row={row} value={details[row.id]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
