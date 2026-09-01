function ScheduleChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 px-2 rounded-md text-[11px] font-medium border transition-colors cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-teal border-teal text-white'
          : 'bg-white border-[#E6EBF1] text-navy hover:border-teal/40 hover:bg-[#F8FAFC]'
      }`}
    >
      {label}
    </button>
  )
}

function ScheduleRow({ label, value, options, onChange }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-body-gray mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <ScheduleChip
            key={option}
            label={option}
            active={value === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
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
    <div className="mt-2.5 ml-7 rounded-lg border border-[#E6EBF1] bg-[#FAFCFD] px-2.5 py-2.5 space-y-2.5">
      <ScheduleRow
        label="Dose"
        value={schedule.dose}
        options={doseOptions}
        onChange={(value) => onChange('dose', value)}
      />
      <ScheduleRow
        label="Schedule"
        value={schedule.frequency}
        options={frequencyOptions}
        onChange={(value) => onChange('frequency', value)}
      />
      <ScheduleRow
        label="Duration"
        value={schedule.duration}
        options={durationOptions}
        onChange={(value) => onChange('duration', value)}
      />
      <p className="text-[11px] text-teal font-medium pt-1 border-t border-dashed border-[#E6EBF1] leading-snug">
        {[schedule.dose, schedule.frequency, schedule.duration].filter(Boolean).join(' · ')}
      </p>
    </div>
  )
}
