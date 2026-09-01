function OptionChip({ label, active, onClick }) {
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

export default function LabBookOptionsPicker({
  options,
  onChange,
  collectionOptions,
  priorityOptions,
}) {
  return (
    <div className="mt-2.5 rounded-lg border border-[#E6EBF1] bg-[#FAFCFD] px-2.5 py-2.5 space-y-2.5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-body-gray mb-1">
          Collection
        </p>
        <div className="flex flex-wrap gap-1.5">
          {collectionOptions.map((option) => (
            <OptionChip
              key={option}
              label={option}
              active={options.collectionType === option}
              onClick={() => onChange('collectionType', option)}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-body-gray mb-1">
          Priority
        </p>
        <div className="flex flex-wrap gap-1.5">
          {priorityOptions.map((option) => (
            <OptionChip
              key={option}
              label={option}
              active={options.priority === option}
              onClick={() => onChange('priority', option)}
            />
          ))}
        </div>
      </div>
      <p className="text-[11px] text-teal font-medium pt-1 border-t border-dashed border-[#E6EBF1] leading-snug">
        {[options.collectionType, options.priority].filter(Boolean).join(' · ')}
      </p>
    </div>
  )
}
