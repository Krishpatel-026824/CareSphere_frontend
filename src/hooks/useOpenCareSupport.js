import { useNavigate } from 'react-router-dom'
import { careSupportConversationId } from '../data/mocks/messages'
import { PATHS } from '../routes/paths'
import { useAppDispatch } from '../store/hooks'
import { openConversation } from '../store/slices/messagesSlice'

export function useOpenCareSupport() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return function openCareSupport() {
    dispatch(openConversation(careSupportConversationId))
    navigate(PATHS.messages)
  }
}
