import { useState } from 'react'
import { CalendarDays, Check, Clock3, Pill } from 'lucide-react'

const iconStroke = 1.75

export default function MedicineReminderCard({ medicine: initialMedicine }) {
  const [medicine, setMedicine] = useState(initialMedicine)
  const [takenToday, setTakenToday] = useState(false)

  const refillPct = Math.round((medicine.remainingCount / medicine.remainingTotal) * 100)
  const canMarkTaken = !takenToday && medicine.remainingCount > 0

  function handleMarkAsTaken() {
    if (!canMarkTaken) return

    const nextCount = medicine.remainingCount - 1
    setMedicine((prev) => ({
      ...prev,
      remainingCount: nextCount,
      remaining: `${nextCount} left`,
    }))
    setTakenToday(true)
  }

  return (
    <section className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(7,26,47,0.06)] p-5 sm:p-6 flex flex-col gap-4 shrink-0 w-full">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] sm:text-base font-semibold text-navy tracking-tight">Medicine reminder</h2>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-navy px-3 py-1.5 rounded-full shrink-0">
          <Clock3 className="w-3.5 h-3.5" strokeWidth={2} />
          {medicine.timeLabel}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-[52px] h-[52px] rounded-2xl bg-[#ECEBFF] flex items-center justify-center shrink-0">
          <Pill className="w-6 h-6 text-[#7C4DFF]" strokeWidth={iconStroke} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-navy leading-tight">{medicine.medicineName}</p>
          <p className="text-[13px] text-body-gray mt-1 leading-snug">
            {medicine.dosage}
            <span className="mx-1.5 text-body-gray/50">•</span>
            {medicine.timing}
            <span className="mx-1.5 text-body-gray/50">•</span>
            <span className="font-semibold text-[#7C4DFF]">{medicine.remaining}</span>
          </p>
        </div>
      </div>

      <div className="h-px bg-border-gray/80" />

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-body-gray">Refill status</p>
          <p className="text-xs font-bold text-[#7C4DFF] tabular-nums">
            {medicine.remainingCount}/{medicine.remainingTotal}
          </p>
        </div>
        <div className="h-2 rounded-full bg-[#F0EFFF] overflow-hidden">
          <div className="h-full rounded-full bg-[#7C4DFF] transition-all" style={{ width: `${refillPct}%` }} />
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-body-gray">
          <CalendarDays className="w-3.5 h-3.5 text-[#7C4DFF]" strokeWidth={iconStroke} />
          {medicine.schedule}
        </p>
      </div>

      <button
        type="button"
        onClick={handleMarkAsTaken}
        disabled={!canMarkTaken}
        className={`w-full min-h-[48px] rounded-2xl text-sm font-semibold inline-flex items-center justify-center gap-2.5 shadow-sm transition-colors ${
          canMarkTaken
            ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
            : 'bg-teal/15 text-teal cursor-default'
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            canMarkTaken ? 'border-2 border-white/90' : 'bg-teal/20'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-current" strokeWidth={3} />
        </span>
        {takenToday ? 'Taken today' : 'Mark as taken'}
      </button>
    </section>
  )
}
