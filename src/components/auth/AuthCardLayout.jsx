import authLoginBg from '../../assets/auth/auth-login-bg.png'

export default function AuthCardLayout({ children, compact = false }) {
  return (
    <div className="fixed inset-0 h-dvh w-screen overflow-hidden bg-[#E8EEF4] flex flex-col md:flex-row">
      {/* Hero — full width mobile, 55% tablet, 70% desktop */}
      <div className="relative w-full h-[26vh] min-h-[150px] max-h-[220px] sm:h-[28vh] sm:max-h-[240px] md:h-full md:max-h-none md:min-h-0 md:w-[55%] lg:w-[70%] shrink-0 overflow-hidden bg-navy">
        <img
          src={authLoginBg}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%] select-none brightness-[1.05] contrast-[1.06] saturate-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,26,47,0.4)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/35 via-transparent to-navy/60 md:bg-gradient-to-r md:from-navy/20 md:via-transparent md:to-navy/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-navy/75 via-navy/30 to-transparent"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 pointer-events-none">
          <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-bold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(7,26,47,0.45)] max-w-lg">
            Care that stays with you
          </p>
          <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm md:text-base text-white/90 max-w-md drop-shadow-[0_1px_8px_rgba(7,26,47,0.4)] line-clamp-2 md:line-clamp-none">
            Book visits, track health, and stay connected with your care team.
          </p>
        </div>
      </div>

      {/* Form — remaining width */}
      <div className="relative flex-1 md:w-[45%] lg:w-[30%] md:flex-none min-h-0 flex flex-col bg-white md:border-l border-[#E6EBF1]">
        <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-teal-dark to-navy" />
        <div
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain auth-no-scrollbar flex flex-col justify-start sm:justify-center safe-bottom ${
            compact
              ? 'px-4 py-4 sm:px-6 sm:py-5 md:px-6 lg:px-7 lg:py-7'
              : 'px-4 py-4 sm:px-6 sm:py-5 md:px-6 lg:px-7 lg:py-7'
          }`}
        >
          <div className="w-full max-w-[400px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
