import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, CalendarDays } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import DoctorScheduleVisitList from '../../components/portal/DoctorScheduleVisitList'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'
import { generateDoctorScheduleSummary } from '../../data/generators/doctorScheduleGenerator'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { sortAppointmentsForList } from '../../utils/appointmentFormat'

export default function DoctorScheduleScreen({
  visits = [],
  selectedId,
  onSelectVisit,
  onMessage,
  actions,
}) {
  const list = useMemo(() => sortAppointmentsForList(visits), [visits])
  const summary = useMemo(() => generateDoctorScheduleSummary(list), [list])
  const bp = useBreakpoint()
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

  const stats = [
    { label: 'Today', value: summary.todayCount },
    { label: 'Confirmed', value: summary.confirmedCount },
    { label: 'Queue', value: summary.upcomingCount },
  ]

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4">
        <header className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
              <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-navy tracking-tight leading-none">
                Schedule
              </h1>
              <p className="text-sm text-body-gray mt-1.5">{summary.dateLine}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[88px] rounded-2xl bg-white/80 border border-white px-3.5 py-2.5 shadow-sm"
              >
                <p className="text-[11px] font-semibold text-body-gray">{stat.label}</p>
                <p className="text-lg font-bold text-navy leading-none mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4 overflow-hidden">
          <DoctorScheduleVisitList
            visits={list}
            selectedId={selected?.id}
            onSelect={handleSelect}
            onOpenMenu={actions.openMenu}
          />

          {selected ? (
            <div className="flex-1 min-w-0 w-full min-h-0 flex flex-col overflow-hidden">
              <DoctorVisitPanel
                visit={selected}
                fillHeight={bp.xl}
                canAccept={actions.canAccept(selected)}
                canDecline={actions.canDecline(selected)}
                canComplete={actions.canComplete(selected)}
                onAccept={() => actions.requestAction('accept', selected)}
                onDecline={() => actions.requestAction('decline', selected)}
                onComplete={() => actions.requestAction('complete', selected)}
                onMessage={() => onMessage?.(selected)}
              />
            </div>
          ) : (
            <div className="flex-1 min-h-0 rounded-3xl bg-white/70 border border-white flex flex-col items-center justify-center gap-3 text-center px-6">
              <span className="w-14 h-14 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
                <CalendarDays className="w-7 h-7" strokeWidth={1.75} />
              </span>
              <p className="text-base font-bold text-navy">No visit selected</p>
              <p className="text-sm text-body-gray">Choose a patient from the list to open the visit workspace.</p>
            </div>
          )}
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
