import { useEffect, useMemo, useState } from 'react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import AppointmentListCard from '../../components/appointments/AppointmentListCard'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'
import { countUpcomingAppointments, sortAppointmentsForList } from '../../utils/appointmentFormat'

export default function DoctorScheduleScreen({
  visits = [],
  selectedId,
  onSelectVisit,
  onMessage,
  actions,
}) {
  const list = useMemo(() => sortAppointmentsForList(visits), [visits])
  const defaultId = list[0]?.id
  const [currentId, setCurrentId] = useState(selectedId || defaultId)

  useEffect(() => {
    if (selectedId) setCurrentId(selectedId)
  }, [selectedId])

  const selected = list.find((item) => item.id === currentId) || list[0] || null

  function handleSelect(visit) {
    setCurrentId(visit.id)
    onSelectVisit?.(visit)
  }

  return (
    <div className="w-full min-h-full lg:h-[100dvh] lg:max-h-[100dvh] bg-[#E8F1F2] flex flex-col overflow-x-hidden lg:overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4">
        <AppointmentPageHeader
          title="Schedule"
          count={visits.length}
          upcomingCount={countUpcomingAppointments(visits)}
        />

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-3 sm:gap-4">
          <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-2 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            {list.length === 0 ? (
              <p className="rounded-xl border border-border-gray bg-white p-4 text-sm text-body-gray">
                No visits in your clinic queue yet.
              </p>
            ) : (
              list.map((visit) => (
                <AppointmentListCard
                  key={visit.id}
                  appointment={visit}
                  selected={selected?.id === visit.id}
                  onSelect={handleSelect}
                  onOpenMenu={actions.openMenu}
                />
              ))
            )}
          </div>

          {selected ? (
            <div className="flex-1 min-w-0 lg:min-h-0 lg:overflow-y-auto">
              <DoctorVisitPanel
                visit={selected}
                canAccept={actions.canAccept(selected)}
                canDecline={actions.canDecline(selected)}
                canComplete={actions.canComplete(selected)}
                onAccept={() => actions.requestAction('accept', selected)}
                onDecline={() => actions.requestAction('decline', selected)}
                onComplete={() => actions.requestAction('complete', selected)}
                onMessage={() => onMessage?.(selected)}
              />
            </div>
          ) : null}
        </div>
      </div>

      <AppointmentActionMenu
        open={Boolean(actions.menu)}
        options={actions.menu?.options}
        x={actions.menu?.x}
        y={actions.menu?.y}
        onClose={actions.closeMenu}
        onSelect={(id) => actions.requestAction(id, actions.menu?.visit)}
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
