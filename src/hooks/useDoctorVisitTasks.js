import { useMemo } from 'react'
import { generateDoctorVisitDetail } from '../data/generators/doctorVisitDetailGenerator'
import { useAppDispatch } from '../store/hooks'
import { toggleAppointmentTask } from '../store/slices/appointmentsSlice'
import { toggleDoctorVisitTask } from '../store/slices/doctorScheduleSlice'

export function useDoctorVisitTasks(visit) {
  const dispatch = useAppDispatch()
  const tasks = useMemo(() => generateDoctorVisitDetail(visit)?.tasks || [], [visit])

  function toggleTask(taskId) {
    if (!visit || !taskId) return

    if (visit.linkedAppointmentId) {
      dispatch(toggleAppointmentTask({ appointmentId: visit.linkedAppointmentId, taskId }))
      return
    }

    dispatch(toggleDoctorVisitTask({ visitId: visit.id, taskId }))
  }

  return { tasks, toggleTask }
}
