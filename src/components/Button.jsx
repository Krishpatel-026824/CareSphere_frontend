export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const base = 'min-h-[44px] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 px-6 py-3 w-full cursor-pointer'
  const variants = {
    primary: 'bg-teal text-white hover:bg-teal-dark active:scale-[0.98]',
    secondary: 'bg-white text-teal border border-teal hover:bg-teal-light',
    ghost: 'bg-transparent text-teal hover:bg-teal-light',
    dark: 'bg-navy text-white hover:bg-navy-light',
  }

  // herer test comment added
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
