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
    <div className="w-full min-h-full bg-gradient-to-br from-[#E8F7F5] via-[#F3F0FF] to-[#EAF4FE]">
      <div className="w-full min-h-full page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-6 max-w-[1180px] mx-auto">
        <ProfileHeader onEdit={onStartEdit} isEditing={isEditing} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_0.9fr] gap-5 min-w-0 lg:items-start">
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

          <div className="min-w-0 flex flex-col gap-4">
            <ProfilePrefsCard prefs={prefs} onToggle={onTogglePref} />
            <button
              type="button"
              onClick={onLogout}
              className="min-h-12 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold cursor-pointer hover:bg-red-100/70 hover:border-red-300 transition-all inline-flex items-center justify-center gap-2"
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
