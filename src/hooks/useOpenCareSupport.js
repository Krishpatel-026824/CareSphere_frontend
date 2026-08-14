import { useNavigate } from 'react-router-dom'
import { careSupportConversationId } from '../data/mocks/messages'
import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'
import { DOCTOR_PATHS, PATHS } from '../routes/paths'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { openConversation } from '../store/slices/messagesSlice'

export function useOpenCareSupport() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const roleType = useAppSelector((state) => state.auth.user?.roleType)

  return function openCareSupport() {
    dispatch(openConversation(careSupportConversationId))
    navigate(roleType === AUTH_ROLE_DOCTOR ? DOCTOR_PATHS.messages : PATHS.messages)
  }
}
