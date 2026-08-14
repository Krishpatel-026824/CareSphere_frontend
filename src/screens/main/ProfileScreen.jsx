import { LogOut } from 'lucide-react'
import ProfileCareCircleCard from '../../components/profile/ProfileCareCircleCard'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileHero from '../../components/profile/ProfileHero'
import ProfileInfoCard from '../../components/profile/ProfileInfoCard'
import ProfileMenuCard from '../../components/profile/ProfileMenuCard'
import ProfilePrefsCard from '../../components/profile/ProfilePrefsCard'

export default function ProfileScreen({
  details,
  stats,
  infoRows,
  fields,
  menu,
  careCircle,
  prefs,
  isEditing,
  draft,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
  onMenu,
  onTogglePref,
  onLogout,
}) {
  return (
    <div className="w-full min-h-full bg-[#F3F7FA]">
      <div className="w-full min-h-full page-pad py-5 sm:py-6 lg:py-7 flex flex-col gap-6 max-w-[1440px] mx-auto">
        <ProfileHeader onEdit={onStartEdit} isEditing={isEditing} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-w-0 lg:items-start">
          <div className="lg:col-span-3 min-w-0 flex flex-col gap-6">
            <ProfileHero details={details} stats={stats} />
            <ProfileInfoCard
              details={details}
              infoRows={infoRows}
              fields={fields}
              isEditing={isEditing}
              draft={draft}
              onChange={onChange}
              onSave={onSave}
              onCancel={onCancel}
            />
            <ProfileCareCircleCard members={careCircle} />
          </div>

          <div className="lg:col-span-2 min-w-0 flex flex-col gap-6">
            <ProfileMenuCard items={menu} onSelect={onMenu} />
            <ProfilePrefsCard prefs={prefs} onToggle={onTogglePref} />
            <button
              type="button"
              onClick={onLogout}
              className="min-h-12 rounded-2xl border border-red-200 bg-white text-red-500 text-sm font-semibold cursor-pointer hover:bg-red-50 inline-flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
