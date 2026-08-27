import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import DoctorScheduleAgenda from '../../components/portal/DoctorScheduleAgenda'
import DoctorScheduleDateStrip from '../../components/portal/DoctorScheduleDateStrip'
import DoctorScheduleVisitModal from '../../components/portal/DoctorScheduleVisitModal'
import {
  generateDoctorScheduleDays,
  generateDoctorScheduleSummary,
} from '../../data/generators/doctorScheduleGenerator'
import { sortAppointmentsForList } from '../../utils/appointmentFormat'

export default function DoctorScheduleScreen({
  visits = [],
  selectedId,
  onSelectVisit,
  onClearVisit,
  actions,
}) {
  const list = useMemo(() => sortAppointmentsForList(visits), [visits])
  const summary = useMemo(() => generateDoctorScheduleSummary(list), [list])
  const days = useMemo(() => generateDoctorScheduleDays(list), [list])

  const [dayId, setDayId] = useState(summary.todayLabel)
  const [query, setQuery] = useState('')
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
      if (visit.status === 'Completed' || visit.status === 'Cancelled') return false
      if (!q) return true
      return [visit.patientName, visit.clinic, visit.visitType, visit.room]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [dayId, list, query])

  const selected = list.find((item) => item.id === currentId) || null
  const activeDay = days.find((day) => day.id === dayId)
  const dayLabel = activeDay?.heading || activeDay?.dateLabel || 'Selected day'

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
    if (selected.status === 'Completed' || selected.status === 'Cancelled') handleClear()
  }, [selected])

  function handleConfirmDialog() {
    const type = actions.dialog?.type

    actions.submitDialog()
    if (type === 'complete' || type === 'decline') handleClear()
  }

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <header className="shrink-0 flex flex-col gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
              <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] font-bold text-navy tracking-tight leading-tight">
                Schedule
              </h1>
              <p className="text-sm sm:text-base text-body-gray mt-1">{summary.dateLine}</p>
            </div>
          </div>

          <DoctorScheduleDateStrip days={days} selectedId={dayId} onSelect={setDayId} />
        </header>

        <DoctorScheduleAgenda
          visits={dayVisits}
          dayLabel={dayLabel}
          query={query}
          onQueryChange={setQuery}
          onSelect={handleSelect}
        />
      </div>

      <DoctorScheduleVisitModal
        open={Boolean(selected)}
        visit={selected}
        canAccept={selected ? actions.canAccept(selected) : false}
        canDecline={selected ? actions.canDecline(selected) : false}
        canComplete={selected ? actions.canComplete(selected) : false}
        onAccept={() => selected && actions.requestAction('accept', selected)}
        onDecline={() => selected && actions.requestAction('decline', selected)}
        onComplete={() => selected && actions.requestAction('complete', selected)}
        onClose={handleClear}
      />

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
        onConfirm={handleConfirmDialog}
      />
    </div>
  )
}
