import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import {
  cancelAppointment as cancelAppointmentAction,
  confirmAppointment as confirmAppointmentAction,
} from '../store/slices/appointmentsSlice'
import { appointmentDialogCopy, appointmentMenuOptions } from '../data/generators/appointmentActionsGenerator'

export function useAppointmentActions() {
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState(null)
  const [dialog, setDialog] = useState(null)

  function openMenu(appointment, event) {
    const options = appointmentMenuOptions(appointment)
    if (!options.length) return
    const x = Math.min(event.clientX, window.innerWidth - 220)
    const y = Math.min(event.clientY, window.innerHeight - 120)
    setMenu({ appointment, options, x, y })
  }

  function requestAction(type, appointment) {
    if (!appointment) return
    setMenu(null)
    setDialog({ type, appointment, copy: appointmentDialogCopy(type, appointment) })
  }

  function submitDialog() {
    const id = dialog?.appointment?.id
    if (!id) return
    if (dialog.type === 'confirm') dispatch(confirmAppointmentAction(id))
    if (dialog.type === 'cancel') dispatch(cancelAppointmentAction(id))
    setDialog(null)
  }

  return {
    menu,
    dialog,
    openMenu,
    closeMenu: () => setMenu(null),
    requestAction,
    closeDialog: () => setDialog(null),
    submitDialog,
  }
}
