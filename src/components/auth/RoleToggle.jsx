import { Stethoscope, UserRound } from 'lucide-react'

const roleIcons = {
  patient: UserRound,
  doctor: Stethoscope,
}

export default function RoleToggle({ value, options, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F4F7FA] p-1.5 border border-[#EAF0F5]">
      {options.map((option) => {
        const active = value === option.id
        const Icon = roleIcons[option.id] || UserRound
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`min-h-11 rounded-xl text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all ${
              active
                ? 'bg-white text-navy shadow-sm ring-1 ring-teal/25'
                : 'bg-transparent text-body-gray hover:text-navy'
            }`}
          >
            <Icon
              className={`w-4 h-4 ${active ? 'text-teal' : 'text-body-gray'}`}
              strokeWidth={active ? 2.1 : 1.85}
            />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
