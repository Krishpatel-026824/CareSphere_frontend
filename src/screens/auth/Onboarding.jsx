import { useState } from 'react'
import { CalendarCheck, Pill, FlaskConical, ChevronRight, FileText } from 'lucide-react'
import Button from '../../components/Button'
import CareSphereLogo from '../../components/brand/CareSphereLogo'

const slides = [
  {
    icon: CalendarCheck,
    title: 'Book Appointments',
    desc: 'Schedule visits with top doctors across specialties in just a few taps.',
  },
  {
    icon: FileText,
    title: 'Health Records',
    desc: 'Keep reports, prescriptions, and visit history in one secure place.',
  },
  {
    icon: Pill,
    title: 'Order Medicines',
    desc: 'Get prescribed medicines delivered to your doorstep, quickly and safely.',
  },
  {
    icon: FlaskConical,
    title: 'Lab Tests',
    desc: 'Book lab tests online and receive digital reports when they are ready.',
  },
]

export default function Onboarding({ onNext }) {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]
  const Icon = slide.icon
  const isLast = current === slides.length - 1

  function handleNext() {
    if (!isLast) setCurrent((value) => value + 1)
    else onNext()
  }

  return (
    <div className="app-viewport w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <aside className="hidden lg:flex bg-navy text-white relative overflow-hidden flex-col justify-center px-12 xl:px-16 2xl:px-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-10 w-64 h-64 rounded-full bg-teal blur-3xl" />
          <div className="absolute bottom-16 right-8 w-72 h-72 rounded-full bg-teal blur-3xl" />
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="mb-10">
            <CareSphereLogo variant="dark" size="lg" layout="stack" />
          </div>
          <h2 className="font-display text-4xl xl:text-5xl font-bold leading-tight mb-4">
            Your complete health companion
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Appointments, pharmacy, lab tests, and health records — connected in one platform.
          </p>
        </div>
      </aside>

      <section className="h-full bg-white flex flex-col px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="lg:hidden pt-8 pb-2">
          <CareSphereLogo variant="light" size="sm" layout="stack" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-teal-light rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Icon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] text-teal" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-3">
            {slide.title}
          </h1>
          <p className="text-body-gray text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            {slide.desc}
          </p>
        </div>

        <div className="pb-8 sm:pb-10 w-full max-w-md mx-auto flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2" aria-label={`Step ${current + 1} of ${slides.length}`}>
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current ? 'w-8 bg-teal' : 'w-2 bg-border-gray hover:bg-teal/40'
                }`}
              />
            ))}
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <Button onClick={handleNext}>
              {isLast ? 'Get Started' : 'Next'}
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </Button>
            {!isLast ? (
              <Button variant="ghost" onClick={onNext}>
                Skip
              </Button>
            ) : (
              <p className="text-center text-xs text-body-gray pt-1">Continue to sign in</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
