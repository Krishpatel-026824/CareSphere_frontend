import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, CalendarDays } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import DoctorScheduleAgenda from '../../components/portal/DoctorScheduleAgenda'
import DoctorScheduleDateStrip from '../../components/portal/DoctorScheduleDateStrip'
import DoctorScheduleStatStrip from '../../components/portal/DoctorScheduleStatStrip'
import DoctorScheduleSummary from '../../components/portal/DoctorScheduleSummary'
import {
  generateDoctorScheduleDays,
  generateDoctorScheduleSummary,
} from '../../data/generators/doctorScheduleGenerator'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { sortAppointmentsForList } from '../../utils/appointmentFormat'

export default function DoctorScheduleScreen({
  visits = [],
  selectedId,
  onSelectVisit,
  onClearVisit,
  onMessage,
  actions,
}) {
  const list = useMemo(() => sortAppointmentsForList(visits), [visits])
  const summary = useMemo(() => generateDoctorScheduleSummary(list), [list])
  const days = useMemo(() => generateDoctorScheduleDays(list), [list])
  const bp = useBreakpoint()

  const [dayId, setDayId] = useState(summary.todayLabel)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [currentId, setCurrentId] = useState(selectedId || null)

  useEffect(() => {
    if (selectedId) {
      setCurrentId(selectedId)
      const match = list.find((visit) => visit.id === selectedId)
      if (match?.dateLabel) setDayId(match.dateLabel)
      return
    }
    setCurrentId(null)
  }, [selectedId, list])

  useEffect(() => {
    if (!days.some((day) => day.id === dayId) && days[0]) setDayId(days[0].id)
  }, [days, dayId])

  const dayVisits = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list.filter((visit) => {
      if (visit.dateLabel !== dayId) return false
      if (status === 'All') {
        if (visit.status === 'Completed' || visit.status === 'Cancelled') return false
      } else if (visit.status !== status) {
        return false
      }
      if (!q) return true
      return [visit.patientName, visit.clinic, visit.visitType, visit.room]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [dayId, list, query, status])

  const selected = list.find((item) => item.id === currentId) || null
  const activeDay = days.find((day) => day.id === dayId)
  const dayLabel = activeDay?.heading || activeDay?.dateLabel || 'Selected day'
  const showMobileSummary = Boolean(selected) && !bp.xl

  const stats = [
    { label: 'Today', value: summary.todayCount },
    { label: 'Confirmed', value: summary.confirmedCount },
    { label: 'Queue', value: summary.upcomingCount },
  ]

  function handleSelect(visit) {
    setCurrentId(visit.id)
    onSelectVisit?.(visit)
  }

  function handleClear() {
    setCurrentId(null)
    onClearVisit?.()
  }

  useEffect(() => {
    if (!selected) return
    const hiddenInAll =
      status === 'All' && (selected.status === 'Completed' || selected.status === 'Cancelled')
    const hiddenInFilter = status !== 'All' && selected.status !== status
    if (hiddenInAll || hiddenInFilter) handleClear()
  }, [selected, status])

  const summaryProps = selected
    ? {
        visit: selected,
        canAccept: actions.canAccept(selected),
        canDecline: actions.canDecline(selected),
        canComplete: actions.canComplete(selected),
        onAccept: () => actions.requestAction('accept', selected),
        onDecline: () => actions.requestAction('decline', selected),
        onComplete: () => actions.requestAction('complete', selected),
        onMessage: () => onMessage?.(selected),
        onClose: handleClear,
      }
    : null

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <header className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
              <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] font-bold text-navy tracking-tight leading-tight">
                Schedule
              </h1>
              <p className="text-sm text-body-gray mt-1">{summary.dateLine}</p>
            </div>
          </div>
          <DoctorScheduleStatStrip stats={stats} />
        </header>

        {!showMobileSummary ? (
          <DoctorScheduleDateStrip days={days} selectedId={dayId} onSelect={setDayId} />
        ) : null}

        <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-3 overflow-hidden">
          {showMobileSummary ? (
            <DoctorScheduleSummary {...summaryProps} />
          ) : (
            <>
              <DoctorScheduleAgenda
                visits={dayVisits}
                selectedId={selected?.id}
                dayLabel={dayLabel}
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                onSelect={handleSelect}
                onOpenMenu={actions.openMenu}
              />

              {selected ? (
                <DoctorScheduleSummary {...summaryProps} />
              ) : (
                <div className="hidden xl:flex w-[42%] shrink-0 h-full rounded-3xl bg-white/70 border border-white flex-col items-center justify-center gap-3 text-center px-6">
                  <span className="w-14 h-14 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
                    <CalendarDays className="w-7 h-7" strokeWidth={1.75} />
                  </span>
                  <p className="text-base font-bold text-navy">Pick a visit</p>
                  <p className="text-sm text-body-gray max-w-xs">
                    Select a patient from the day agenda to review details and actions.
                  </p>
                </div>
              )}
            </>
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
