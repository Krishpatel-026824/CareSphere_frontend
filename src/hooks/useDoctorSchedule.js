import { useState } from 'react'
import {
  canAcceptVisit,
  canCompleteVisit,
  canDeclineVisit,
  doctorVisitDialogCopy,
  doctorVisitMenuOptions,
} from '../data/generators/doctorActionsGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
} from '../store/slices/appointmentsSlice'
import {
  acceptDoctorVisit,
  completeDoctorVisit,
  declineDoctorVisit,
  selectDoctorNextVisit,
  selectDoctorVisits,
} from '../store/slices/doctorScheduleSlice'

export function useDoctorSchedule() {
  const dispatch = useAppDispatch()
  const visits = useAppSelector(selectDoctorVisits)
  const nextVisit = useAppSelector(selectDoctorNextVisit)
  const [menu, setMenu] = useState(null)
  const [dialog, setDialog] = useState(null)

  function applyStatus(visit, type) {
    if (visit.linkedAppointmentId) {
      if (type === 'accept') dispatch(confirmAppointment(visit.linkedAppointmentId))
      if (type === 'decline') dispatch(cancelAppointment(visit.linkedAppointmentId))
      if (type === 'complete') dispatch(completeAppointment(visit.linkedAppointmentId))
      return
    }
    if (type === 'accept') dispatch(acceptDoctorVisit(visit.id))
    if (type === 'decline') dispatch(declineDoctorVisit(visit.id))
    if (type === 'complete') dispatch(completeDoctorVisit(visit.id))
  }

  function openMenu(visit, event) {
    const options = doctorVisitMenuOptions(visit)
    if (!options.length) return
    const x = Math.min(event.clientX, window.innerWidth - 220)
    const y = Math.min(event.clientY, window.innerHeight - 140)
    setMenu({ visit, options, x, y })
  }

  function requestAction(type, visit) {
    if (!visit) return
    setMenu(null)
    setDialog({ type, visit, copy: doctorVisitDialogCopy(type, visit) })
  }

  function submitDialog() {
    if (!dialog?.visit) return
    applyStatus(dialog.visit, dialog.type)
    setDialog(null)
  }

  return {
    visits,
    nextVisit,
    menu,
    dialog,
    canAccept: canAcceptVisit,
    canDecline: canDeclineVisit,
    canComplete: canCompleteVisit,
    openMenu,
    closeMenu: () => setMenu(null),
    requestAction,
    closeDialog: () => setDialog(null),
    submitDialog,
  }
}
