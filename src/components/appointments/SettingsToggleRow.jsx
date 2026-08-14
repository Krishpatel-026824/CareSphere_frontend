export default function SettingsToggleRow({ item, checked, disabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E6E8EC] px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#1E2124]">{item.label}</p>
        {item.hint ? <p className="mt-0.5 text-[12px] text-[#6B7280]">{item.hint}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={item.label}
        disabled={disabled}
        onClick={() => onToggle(item.id)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-[#2F80ED]' : 'bg-[#D0D5DD]'
        } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}
