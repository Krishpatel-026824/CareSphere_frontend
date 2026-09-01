import { CalendarDays, Clock3, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  generateBookVisitTimeOptions,
  getBookVisitDateSummary,
  getDefaultBookVisitDate,
} from '../../data/generators/doctorBookVisitGenerator'
import { parseAppointmentDate } from '../../utils/appointmentFormat'
import BookVisitCalendar from './BookVisitCalendar'

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-dark">{children}</p>
    </div>
  )
}

function TimeChip({ slot, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`h-[40px] rounded-xl text-[13px] font-semibold tracking-tight border cursor-pointer transition-colors ${
        active
          ? 'bg-teal text-white border-teal shadow-[0_6px_16px_-8px_rgba(14,165,160,0.75)]'
          : 'bg-white text-navy border-[#E6EBF1] hover:border-teal/35 hover:bg-[#F7FCFB]'
      }`}
    >
      {slot.label}
    </button>
  )
}

export default function DoctorPatientBookVisitPanel({ patientName, onClose, onBook }) {
  const times = useMemo(() => generateBookVisitTimeOptions(), [])
  const [dateLabel, setDateLabel] = useState(() => getDefaultBookVisitDate())
  const [viewDate, setViewDate] = useState(() => {
    const parsed = parseAppointmentDate(getDefaultBookVisitDate(), '', new Date())
    return parsed || new Date()
  })
  const [timeLabel, setTimeLabel] = useState(times[0]?.label || '')

  const canBook = Boolean(dateLabel && timeLabel)
  const selectedDate = useMemo(() => getBookVisitDateSummary(dateLabel), [dateLabel])

  function handleSelectDate(label) {
    setDateLabel(label)
    const parsed = parseAppointmentDate(label, '', new Date())
    if (parsed) setViewDate(parsed)
  }

  return (
    <div className="fixed inset-0 z-[1300] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] cursor-pointer"
        aria-label="Close booking"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-visit-title"
        className="book-visit-panel relative w-full max-w-[480px] rounded-[20px] border border-[#E6EBF1] bg-white shadow-[0_28px_64px_-24px_rgba(7,26,47,0.38)] overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-teal via-[#14B8A6] to-[#0D9488]" />

        <div className="px-6 pt-4 pb-3.5 border-b border-[#E6EBF1] bg-gradient-to-r from-white to-[#F5FBFA] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-11 h-11 rounded-2xl bg-teal-light text-teal inline-flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5" strokeWidth={1.85} />
            </span>
            <div className="min-w-0">
              <h3 id="book-visit-title" className="text-[18px] font-bold text-navy leading-snug tracking-tight">
                Book next appointment
              </h3>
              <p className="text-[13px] text-body-gray mt-1 truncate leading-snug">
                {patientName ? (
                  <>
                    For <span className="font-semibold text-navy">{patientName}</span>
                  </>
                ) : (
                  'Pick a date and time'
                )}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E6EBF1] text-navy inline-flex items-center justify-center cursor-pointer hover:border-teal/30 hover:text-teal shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <section>
            <SectionLabel icon={CalendarDays}>Date</SectionLabel>
            <BookVisitCalendar
              viewDate={viewDate}
              selectedLabel={dateLabel}
              onViewDateChange={setViewDate}
              onSelectDate={handleSelectDate}
            />
          </section>

          <section>
            <SectionLabel icon={Clock3}>Time</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {times.map((slot) => (
                <TimeChip
                  key={slot.id}
                  slot={slot}
                  active={slot.label === timeLabel}
                  onSelect={() => setTimeLabel(slot.label)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="px-6 py-2.5 border-t border-teal/15 bg-[#E8F7F6]">
          <p className="text-[13px] text-teal-dark font-medium text-center leading-snug">
            {selectedDate?.isToday ? 'Today' : selectedDate?.isTomorrow ? 'Tomorrow' : selectedDate?.weekday}
            {' · '}
            {selectedDate?.day} {selectedDate?.month}
            {' · '}
            <span className="font-bold text-navy">{timeLabel}</span>
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[#E6EBF1] bg-[#FAFCFD] flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-[#E6EBF1] bg-white text-navy text-[14px] font-semibold cursor-pointer hover:bg-[#F4F7FA]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canBook}
            onClick={() => onBook?.({ dateLabel, timeLabel })}
            className={`flex-[1.15] h-11 rounded-xl text-[14px] font-semibold tracking-tight transition-colors ${
              canBook
                ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark shadow-[0_8px_20px_-10px_rgba(14,165,160,0.85)]'
                : 'bg-[#E8EEF4] text-body-gray/60 cursor-not-allowed'
            }`}
          >
            Book appointment
          </button>
        </div>
      </div>
    </div>
  )
}
