import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Pill, Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import { usePager } from '../../hooks/usePager'
import { useMedicineReminders } from '../../hooks/useMedicineReminders'
import { useAppSelector } from '../../store/hooks'
import { isPrefOn } from '../../utils/notificationPrefs'
import MedicineFormModal from './MedicineFormModal'

const iconStroke = 1.75

export default function MedicineReminderCard() {
  const { medicines, takenById, startIndex, pendingCount, markAsTaken, addMedicine, updateMedicine, removeMedicine } = useMedicineReminders()
  const medicineAlertsOn = useAppSelector((state) => isPrefOn(state.profile.prefs, 'medicine'))
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState(null)
  const { item: medicine, index, count, canPage, goNext, goPrev } = usePager(medicines, startIndex)

  if (!medicine) return null

  const remainingCount = medicine.remainingCount
  const takenToday = Boolean(takenById[medicine.id])
  const refillPct = Math.round((remainingCount / medicine.remainingTotal) * 100)
  const canMarkTaken = medicineAlertsOn && !takenToday && remainingCount > 0

  return (
    <section className="h-full min-h-0 bg-white rounded-2xl border border-border-gray shadow-sm p-5 sm:p-6 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <h2 className="text-[15px] sm:text-base font-semibold text-navy tracking-tight">Medicine reminder</h2>
          <p className="text-[11px] text-body-gray mt-0.5">
            {medicineAlertsOn ? `${medicine.period} dose • ${pendingCount} today` : 'Reminders paused in Preferences'}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-navy px-3 py-1.5 rounded-full shrink-0">
          <Clock3 className="w-3.5 h-3.5" strokeWidth={2} />
          {medicine.timeLabel}
        </span>
      </div>

      <div key={medicine.id} className="flex items-center gap-3.5 animate-[fadeIn_400ms_ease] shrink-0">
        <div className="w-[56px] h-[56px] rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-white shadow-sm flex items-center justify-center">
          {medicine.image ? (
            <img
              src={medicine.image}
              alt={medicine.medicineName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ECEBFF] to-[#F5F3FF]">
              <Pill className="w-6 h-6 text-[#7C4DFF]" strokeWidth={iconStroke} />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-navy leading-tight">{medicine.medicineName}</p>
          <p className="text-[13px] text-body-gray mt-1 leading-snug">
            {medicine.dosage}
            <span className="mx-1.5 text-body-gray/50">•</span>
            {medicine.timing}
            <span className="mx-1.5 text-body-gray/50">•</span>
            <span className="font-semibold text-[#7C4DFF]">{remainingCount} left</span>
          </p>
        </div>
      </div>

      <div className="h-px bg-border-gray/80 shrink-0" />

      <div className="flex flex-col gap-2.5 flex-1 min-h-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-body-gray">Refill status</p>
          <p className="text-xs font-bold text-[#7C4DFF] tabular-nums">
            {remainingCount}/{medicine.remainingTotal}
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

      <div className="mt-auto shrink-0 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => markAsTaken(medicine.id)}
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
          {takenToday ? 'Taken today' : medicineAlertsOn ? 'Mark as taken' : 'Reminders off'}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setEditingMedicine(null); setModalOpen(true) }}
            className="flex-1 h-9 rounded-xl border border-dashed border-[#7C4DFF]/40 text-[#7C4DFF] text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F0EFFF] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add medicine
          </button>
          <button
            type="button"
            onClick={() => { setEditingMedicine(medicine); setModalOpen(true) }}
            className="h-9 px-3 rounded-xl border border-[#E4E0FF] text-[#7C4DFF] text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F0EFFF] transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" strokeWidth={2} />
            Edit
          </button>
        </div>

        {canPage ? (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous medicine"
              className="w-9 h-9 rounded-full border border-[#E4E0FF] text-[#7C4DFF] flex items-center justify-center cursor-pointer hover:bg-[#F0EFFF] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <p className="text-[11px] font-semibold text-[#7C4DFF] tabular-nums">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next medicine"
              className="w-9 h-9 rounded-full border border-[#E4E0FF] text-[#7C4DFF] flex items-center justify-center cursor-pointer hover:bg-[#F0EFFF] transition-colors"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        ) : null}
      </div>

      <MedicineFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        medicine={editingMedicine}
        onSave={(data) => (editingMedicine ? updateMedicine(data) : addMedicine(data))}
        onDelete={removeMedicine}
      />
    </section>
  )
}
