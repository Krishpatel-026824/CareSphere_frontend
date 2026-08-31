import { LogOut } from 'lucide-react'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileHero from '../../components/profile/ProfileHero'
import ProfilePrefsCard from '../../components/profile/ProfilePrefsCard'

export default function ProfileScreen({
  details,
  stats,
  infoRows,
  fields,
  prefs,
  isEditing,
  draft,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
  onTogglePref,
  onLogout,
  onAvatarChange,
}) {
  return (
    <div className="w-full min-h-full bg-transparent">
      <div className="w-full min-h-full page-pad py-4 sm:py-5 lg:py-6 flex flex-col gap-4 sm:gap-5 max-w-[1440px] mx-auto">
        <ProfileHeader onEdit={onStartEdit} isEditing={isEditing} />

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,0.9fr)] gap-4 sm:gap-5 min-w-0 xl:items-stretch">
          <ProfileHero
            details={details}
            stats={stats}
            infoRows={infoRows}
            fields={fields}
            isEditing={isEditing}
            draft={draft}
            onChange={onChange}
            onSave={onSave}
            onCancel={onCancel}
            onAvatarChange={onAvatarChange}
          />

          <div className="min-w-0 flex flex-col gap-3 sm:gap-4">
            <ProfilePrefsCard prefs={prefs} onToggle={onTogglePref} />
            <button
              type="button"
              onClick={onLogout}
              className="min-h-11 sm:min-h-12 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-sm font-semibold cursor-pointer hover:bg-rose-100/80 hover:border-rose-300 transition-colors inline-flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
