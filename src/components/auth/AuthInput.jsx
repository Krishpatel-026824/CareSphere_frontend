import { Eye, EyeOff } from 'lucide-react'

export default function AuthInput({
  id,
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
  showPassword,
  onTogglePassword,
}) {
  const isPassword = type === 'password'

  return (
    <div>
      <label htmlFor={id} className="block mb-1.5 text-[13px] font-medium text-navy">
        {label}
      </label>
      <div className="flex items-center gap-3 min-h-[50px] px-3.5 rounded-xl border border-[#D0D9E3] bg-[#F7FAFC] focus-within:border-teal focus-within:bg-white focus-within:ring-2 focus-within:ring-teal/15 transition-all">
        {Icon ? (
          <Icon className="w-[18px] h-[18px] shrink-0 text-teal" strokeWidth={1.85} />
        ) : null}
        <input
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="flex-1 min-w-0 border-none outline-none bg-transparent text-sm text-navy placeholder:text-body-gray/50 font-sans"
        />
        {isPassword && onTogglePassword ? (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="border-none bg-transparent p-1 cursor-pointer text-body-gray flex"
          >
            {showPassword ? (
              <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.75} />
            ) : (
              <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  )
}
