import { Heart } from 'lucide-react'

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
      <aside className="hidden lg:flex bg-navy text-white relative overflow-hidden flex-col justify-between px-10 xl:px-16 2xl:px-20 py-10 xl:py-14">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-teal blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-teal rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" strokeWidth={1.75} />
            </div>
            <span className="text-2xl font-bold tracking-tight">CareSphere</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="font-display text-3xl xl:text-5xl font-bold leading-tight">{brandTitle}</h2>
          <p className="text-white/70 text-base xl:text-lg mt-4 leading-relaxed">{brandDesc}</p>
        </div>

        <p className="relative z-10 text-white/40 text-sm">© 2026 CareSphere. All rights reserved.</p>
      </aside>

      <section className="h-full min-h-0 bg-white flex flex-col overflow-y-auto">
        <div className="lg:hidden bg-navy pt-[max(2rem,env(safe-area-inset-top))] pb-7 px-5 sm:px-6 shrink-0">
          {onBack ? (
            <button type="button" onClick={onBack} className="text-white/90 mb-4 cursor-pointer text-sm font-medium">
              ← Back
            </button>
          ) : null}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" strokeWidth={1.75} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CareSphere</span>
          </div>
          <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-white/60 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex-1 flex items-start sm:items-center justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-12 safe-bottom">
          <div className="w-full max-w-md">
            <div className="hidden lg:block mb-8">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-teal mb-4 cursor-pointer text-sm font-semibold hover:opacity-80"
                >
                  ← Back
                </button>
              ) : null}
              <h1 className="text-3xl xl:text-4xl font-bold text-navy tracking-tight">{title}</h1>
              <p className="text-body-gray text-base mt-2">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}
