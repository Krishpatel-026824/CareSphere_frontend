export default function RoleToggle({ value, options, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-bg-gray p-1">
      {options.map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`min-h-10 rounded-xl text-sm font-semibold cursor-pointer ${
              active ? 'bg-white text-navy shadow-sm' : 'bg-transparent text-body-gray'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
