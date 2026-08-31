import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  generateBookVisitDateOptions,
  generateBookVisitTimeOptions,
} from '../../data/generators/doctorBookVisitGenerator'

export default function DoctorPatientBookVisitPanel({ patientName, onClose, onBook }) {
  const dates = useMemo(() => generateBookVisitDateOptions(14), [])
  const times = useMemo(() => generateBookVisitTimeOptions(), [])
  const [dateLabel, setDateLabel] = useState(dates[1]?.label || dates[0]?.label || '')
  const [timeLabel, setTimeLabel] = useState(times[0]?.label || '')

  const canBook = Boolean(dateLabel && timeLabel)

  return (
    <div className="fixed inset-0 z-[1300] flex items-end sm:items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-navy/35 cursor-pointer"
        aria-label="Close booking"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-[#E6EBF1] bg-white shadow-xl overflow-hidden">
        <div className="px-4 py-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold text-navy truncate">Book next appointment</h3>
            <p className="text-[13px] text-body-gray mt-0.5 truncate">
              {patientName ? `For ${patientName}` : 'Pick any date and time'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-[#E6EBF1] bg-white text-navy inline-flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 max-h-[min(70dvh,520px)] overflow-y-auto">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal-dark mb-2">
              Date
            </p>
            <div className="flex flex-wrap gap-2">
              {dates.map((date) => {
                const active = date.label === dateLabel
                return (
                  <button
                    key={date.id}
                    type="button"
                    onClick={() => setDateLabel(date.label)}
                    className={`min-h-10 px-3 rounded-xl text-[13px] font-semibold border cursor-pointer transition-colors ${
                      active
                        ? 'bg-teal text-white border-teal'
                        : 'bg-[#F8FAFC] text-navy border-[#E6EBF1] hover:border-teal/40'
                    }`}
                  >
                    {date.isToday ? 'Today' : date.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal-dark mb-2">
              Time
            </p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((slot) => {
                const active = slot.label === timeLabel
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setTimeLabel(slot.label)}
                    className={`min-h-10 rounded-xl text-[13px] font-semibold border cursor-pointer transition-colors ${
                      active
                        ? 'bg-teal text-white border-teal'
                        : 'bg-[#F8FAFC] text-navy border-[#E6EBF1] hover:border-teal/40'
                    }`}
                  >
                    {slot.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 px-4 rounded-xl border border-[#E6EBF1] bg-white text-navy text-[13px] font-semibold cursor-pointer hover:bg-[#F4F7FA]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canBook}
            onClick={() => onBook?.({ dateLabel, timeLabel })}
            className={`min-h-10 px-4 rounded-xl text-[13px] font-semibold ${
              canBook
                ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
            }`}
          >
            Book appointment
          </button>
        </div>
      </div>
    </div>
  )
}
