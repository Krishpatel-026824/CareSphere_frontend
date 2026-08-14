import { createSlice } from '@reduxjs/toolkit'
import { clearAuthSession, loadAuthSession, saveAuthSession } from '../../utils/authStorage'

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthSession(),
  reducers: {
    login(state, action) {
      const user = action.payload || { name: 'Krish', roleType: 'patient' }
      state.user = user
      state.isAuthenticated = true
      saveAuthSession(user)
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      clearAuthSession()
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
