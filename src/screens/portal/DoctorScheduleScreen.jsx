import { useEffect, useMemo, useState } from 'react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorScheduleListCard from '../../components/portal/DoctorScheduleListCard'
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
    <div className="w-full min-h-full lg:h-[100dvh] lg:max-h-[100dvh] bg-[#F3F4F6] flex flex-col overflow-x-hidden lg:overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-3">
        <AppointmentPageHeader
          title="Schedule"
          subtitle={`${countUpcomingAppointments(visits)} upcoming`}
        />

        <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-start gap-3">
          <section className="w-full xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-3 flex flex-col min-h-0 h-[300px] sm:h-[360px] xl:h-[min(640px,calc(100dvh-10rem))]">
            <div className="px-1 pb-2 shrink-0">
              <h2 className="text-sm font-bold text-navy">Visits</h2>
            </div>
            <div className="scroll-y flex-1 min-h-0 pr-2">
              {list.length === 0 ? (
                <p className="rounded-xl border border-border-gray bg-[#F3F4F6] p-4 text-sm text-body-gray">
                  No visits in your clinic queue yet.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {list.map((visit) => (
                    <DoctorScheduleListCard
                      key={visit.id}
                      visit={visit}
                      selected={selected?.id === visit.id}
                      onSelect={handleSelect}
                      onOpenMenu={actions.openMenu}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {selected ? (
            <div className="flex-1 min-w-0 w-full xl:overflow-y-auto scroll-y">
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
