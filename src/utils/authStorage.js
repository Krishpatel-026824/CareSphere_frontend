import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'

const AUTH_KEY = 'caresphere.auth'

export function loadAuthSession() {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false }

  try {
    const raw = window.localStorage.getItem(AUTH_KEY)
    if (!raw) return { user: null, isAuthenticated: false }

    const parsed = JSON.parse(raw)
    if (!parsed?.isAuthenticated || !parsed?.user?.roleType) {
      return { user: null, isAuthenticated: false }
    }

    return { user: parsed.user, isAuthenticated: true }
  } catch {
    return { user: null, isAuthenticated: false }
  }
}

export function saveAuthSession(user) {
  if (typeof window === 'undefined' || !user) return
  window.localStorage.setItem(AUTH_KEY, JSON.stringify({ user, isAuthenticated: true }))
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_KEY)
}

export function loadAuthWorkspace() {
  return loadAuthSession().user?.roleType === AUTH_ROLE_DOCTOR ? 'doctor' : 'patient'
}
