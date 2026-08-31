import CareSphereLogo from './brand/CareSphereLogo'

export default function AuthLayout({
  title,
  subtitle,
  children,
  onBack,
  brandTitle = 'Your Health. Connected.',
  brandDesc = 'Book doctors, manage family health, order medicines, and access lab reports — all in one place.',
}) {
  return (
    <div className="app-viewport w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">
      <aside className="hidden lg:flex bg-[#071A2F] text-white relative overflow-hidden flex-col justify-between px-10 xl:px-16 2xl:px-20 py-10 xl:py-14">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-[18%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-teal/35 blur-[90px]" />
          <div className="absolute -top-16 -left-10 w-56 h-56 rounded-full bg-teal/20 blur-3xl" />
        </div>

        <div className="relative z-10">
          <CareSphereLogo variant="dark" size="lg" layout="stack" />
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="font-display text-4xl xl:text-[52px] font-bold leading-[1.15]">{brandTitle}</h2>
          <p className="text-white/80 text-base xl:text-lg mt-5 leading-relaxed max-w-md">{brandDesc}</p>
        </div>

        <p className="relative z-10 text-white/45 text-sm">© 2026 CareSphere. All rights reserved.</p>
      </aside>

      <section className="h-full min-h-0 bg-white flex flex-col overflow-y-auto">
        <div className="lg:hidden bg-[#071A2F] pt-[max(2rem,env(safe-area-inset-top))] pb-7 px-5 sm:px-6 shrink-0">
          {onBack ? (
            <button type="button" onClick={onBack} className="text-white/90 mb-4 cursor-pointer text-sm font-medium">
              ← Back
            </button>
          ) : null}
          <div className="mb-3">
            <CareSphereLogo variant="dark" size="md" layout="stack" />
          </div>
          <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-white/60 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex-1 flex items-start sm:items-center justify-center px-5 py-6 sm:px-8 sm:py-10 lg:px-14 xl:px-16 safe-bottom">
          <div className="w-full max-w-[420px]">
            <div className="hidden lg:block mb-8">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-teal mb-5 cursor-pointer text-sm font-semibold hover:opacity-80"
                >
                  ← Back
                </button>
              ) : null}
              <h1 className="text-[32px] xl:text-[36px] font-bold text-navy tracking-tight leading-tight">{title}</h1>
              <p className="text-body-gray text-[15px] mt-2">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}
