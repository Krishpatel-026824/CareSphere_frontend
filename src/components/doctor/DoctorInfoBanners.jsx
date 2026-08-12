import { Activity, HeartPulse, Stethoscope } from 'lucide-react'

const banners = [
  {
    id: 'same-day',
    title: 'Same-day slots',
    description: 'Book available doctors for today evening in Ahmedabad.',
    icon: Activity,
    cardClass: 'bg-[#F2FAF8] border border-teal-light/70',
    iconWrapClass: 'bg-teal-light',
    iconClass: 'text-teal-dark',
    titleClass: 'text-navy',
    descClass: 'text-navy/70',
  },
  {
    id: 'verified',
    title: 'Verified specialists',
    description: 'All doctors are verified with experience and patient ratings.',
    icon: Stethoscope,
    cardClass: 'bg-[#F0F6FC] border border-sky-100',
    iconWrapClass: 'bg-sky-100',
    iconClass: 'text-sky-600',
    titleClass: 'text-navy',
    descClass: 'text-navy/70',
  },
  {
    id: 'urgent',
    title: 'Need urgent care?',
    description: 'Start with General Physician and get guided next steps.',
    icon: HeartPulse,
    cardClass: 'bg-teal border border-teal shadow-md shadow-teal/20',
    iconWrapClass: 'bg-teal-dark',
    iconClass: 'text-white',
    titleClass: 'text-white',
    descClass: 'text-white/90',
  },
]

export default function DoctorInfoBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.map((banner) => {
        const Icon = banner.icon
        return (
          <article
            key={banner.id}
            className={`rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 min-h-[96px] ${banner.cardClass}`}
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${banner.iconWrapClass}`}
            >
              <Icon className={`w-5 h-5 ${banner.iconClass}`} strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h3 className={`text-sm font-bold leading-snug ${banner.titleClass}`}>{banner.title}</h3>
              <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${banner.descClass}`}>{banner.description}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
