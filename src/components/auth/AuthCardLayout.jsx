import authLoginBg from '../../assets/auth/auth-login-bg.png'

export default function AuthCardLayout({ children, compact = false }) {
  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full max-w-[100vw] overflow-hidden bg-[#E8EEF4] flex flex-col lg:flex-row">
      {/* Hero — stacked on mobile & tablet; beside form on large screens */}
      <div
        className="relative w-full shrink-0 overflow-hidden bg-navy
          h-[clamp(120px,24vh,200px)]
          sm:h-[clamp(140px,26vh,220px)]
          lg:h-full lg:min-h-0 lg:max-h-none lg:w-[52%] xl:w-[58%] 2xl:w-[62%]"
      >
        <img
          src={authLoginBg}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-[center_28%] lg:object-[center_25%] select-none brightness-[1.05] contrast-[1.06] saturate-[1.05]"
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
          className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/65 lg:bg-gradient-to-r lg:from-navy/25 lg:via-transparent lg:to-navy/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy/80 via-navy/35 to-transparent"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 pointer-events-none safe-x">
          <p className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(7,26,47,0.45)] max-w-lg leading-tight">
            Care that stays with you
          </p>
          <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm lg:text-base text-white/90 max-w-md drop-shadow-[0_1px_8px_rgba(7,26,47,0.4)] line-clamp-2 lg:line-clamp-none">
            Book visits, track health, and stay connected with your care team.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col flex-1 min-h-0 w-full lg:w-[48%] xl:w-[42%] 2xl:w-[38%] lg:flex-none bg-white lg:border-l border-[#E6EBF1]">
        <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-teal-dark to-navy" />

        <div
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain auth-no-scrollbar safe-bottom safe-x ${
            compact ? 'py-3 sm:py-4' : 'py-3 sm:py-5 md:py-6'
          }`}
        >
          <div className="min-h-full flex flex-col justify-center">
            <div className="w-full max-w-[400px] mx-auto px-1 sm:px-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
