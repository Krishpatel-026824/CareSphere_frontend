import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import AppointmentDetailPanel from '../../components/appointments/AppointmentDetailPanel'
import AppointmentListCard from '../../components/appointments/AppointmentListCard'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import { useAppointmentActions } from '../../hooks/useAppointmentActions'
import { resolveAppointmentImages } from '../../data/mocks/appointmentImages'
import { PATHS } from '../../routes/paths'

export default function AppointmentsScreen({
  appointments = [],
  selectedId = null,
  onSelectAppointment,
  onReschedule,
  onNewAppointment,
}) {
  const navigate = useNavigate()
  const actions = useAppointmentActions()
  const defaultId = appointments.find((item) => item.status === 'Upcoming')?.id || appointments[0]?.id
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(selectedId || defaultId)

  useEffect(() => {
    if (selectedId) setSelectedAppointmentId(selectedId)
  }, [selectedId])

  const selectedAppointment = useMemo(() => {
    const match = appointments.find((item) => item.id === selectedAppointmentId) || appointments[0]
    return resolveAppointmentImages(match)
  }, [appointments, selectedAppointmentId])

  function handleSelect(appointment) {
    setSelectedAppointmentId(appointment.id)
    onSelectAppointment?.(appointment)
  }

  function handleReschedule(appointment) {
    if (onReschedule) {
      onReschedule(appointment)
      return
    }
    navigate(PATHS.reschedule, { state: { appointment } })
  }

  return (
    <div className="w-full min-h-full lg:h-[100dvh] lg:max-h-[100dvh] bg-[#E8F1F2] flex flex-col overflow-x-hidden lg:overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4">
        <AppointmentPageHeader count={appointments.length} onNewAppointment={onNewAppointment} />

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-3 sm:gap-4">
          <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-2 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            {appointments.map((appointment) => (
              <AppointmentListCard
                key={appointment.id}
                appointment={resolveAppointmentImages(appointment)}
                selected={selectedAppointment?.id === appointment.id}
                onSelect={handleSelect}
                onOpenMenu={actions.openMenu}
              />
            ))}
          </div>

          <AppointmentDetailPanel
            appointment={selectedAppointment}
            onReschedule={handleReschedule}
            onCancel={(appointment) => actions.requestAction('cancel', appointment)}
            onConfirm={(appointment) => actions.requestAction('confirm', appointment)}
          />
        </div>
      </div>

      <AppointmentActionMenu
        open={Boolean(actions.menu)}
        x={actions.menu?.x}
        y={actions.menu?.y}
        options={actions.menu?.options}
        onSelect={(id) => actions.requestAction(id, actions.menu.appointment)}
        onClose={actions.closeMenu}
      />
      <AppointmentActionDialog
        open={Boolean(actions.dialog)}
        copy={actions.dialog?.copy}
        onClose={actions.closeDialog}
        onConfirm={actions.submitDialog}
      />
    </div>
  )
}
