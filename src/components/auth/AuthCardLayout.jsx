export default function AuthCardLayout({ children, compact = false }) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center relative overflow-auto bg-[#0F3D3E] px-4 py-6 sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(14,165,160,0.28),transparent_70%)]"
      />
      <div className="animate-login-rise relative z-10 w-full max-w-[440px] mx-auto bg-white rounded-[28px] shadow-[0_24px_60px_rgba(7,26,47,0.35)] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-teal via-teal-dark to-navy" />
        <div className={compact ? 'px-6 py-6 sm:px-8 sm:py-7' : 'px-6 py-8 sm:px-8 sm:py-10'}>{children}</div>
      </div>
    </div>
  )
}
