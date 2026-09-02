import { ChevronDown } from 'lucide-react'

function ScheduleSelect({ label, value, options, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-body-gray mb-0.5 block">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none h-8 rounded-lg border border-[#E6EBF1] bg-white pl-2.5 pr-7 text-[11px] font-semibold text-navy outline-none cursor-pointer focus:border-teal focus:ring-1 focus:ring-teal/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-body-gray"
          strokeWidth={2.25}
          aria-hidden
        />
      </div>
    </label>
  )
}

export default function PrescriptionSchedulePicker({
  schedule,
  onChange,
  doseOptions,
  frequencyOptions,
  durationOptions,
}) {
  return (
    <div className="mt-2 ml-6 rounded-md border border-[#E6EBF1] bg-[#FAFCFD] px-2 py-2 space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <ScheduleSelect
          label="Dose"
          value={schedule.dose}
          options={doseOptions}
          onChange={(value) => onChange('dose', value)}
        />
        <ScheduleSelect
          label="Schedule"
          value={schedule.frequency}
          options={frequencyOptions}
          onChange={(value) => onChange('frequency', value)}
        />
        <ScheduleSelect
          label="Duration"
          value={schedule.duration}
          options={durationOptions}
          onChange={(value) => onChange('duration', value)}
        />
      </div>
      <p className="text-[10px] text-teal font-medium pt-1 border-t border-dashed border-[#E6EBF1] leading-snug">
        {[schedule.dose, schedule.frequency, schedule.duration].filter(Boolean).join(' · ')}
      </p>
    </div>
  )
}
