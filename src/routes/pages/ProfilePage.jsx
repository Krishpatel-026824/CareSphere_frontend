import { useNavigate } from 'react-router-dom'
import ProfileScreen from '../../screens/main/ProfileScreen'
import { useProfile } from '../../hooks/useProfile'
import { PATHS } from '../paths'

export default function ProfilePage() {
  const navigate = useNavigate()
  const profile = useProfile()

  return (
    <ProfileScreen
      details={profile.details}
      stats={profile.stats}
      infoRows={profile.infoRows}
      fields={profile.fields}
      menu={profile.menu}
      careCircle={profile.careCircle}
      prefs={profile.prefs}
      isEditing={profile.isEditing}
      draft={profile.draft}
      onStartEdit={profile.startEdit}
      onChange={profile.updateDraft}
      onSave={profile.saveEdit}
      onCancel={profile.cancelEdit}
      onMenu={(pathKey) => navigate(PATHS[pathKey] || PATHS.home)}
      onTogglePref={profile.togglePref}
      onLogout={() => {
        profile.logoutUser()
        navigate(PATHS.login)
      }}
    />
  )
}
