import { Activity, ShieldCheck, Sparkles } from 'lucide-react'
import { doctorInfoBannersMock } from '../../data/mocks/doctorBanners'

const iconMap = {
  activity: Activity,
  shield: ShieldCheck,
  sparkles: Sparkles,
}

export default function DoctorInfoBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctorInfoBannersMock.map((banner) => {
        const Icon = iconMap[banner.icon] || Activity
        return (
          <article
            key={banner.id}
            className={`rounded-2xl p-5 flex items-start gap-3.5 min-h-[96px] ${
              banner.dark
                ? 'bg-teal text-white shadow-[0_8px_24px_rgba(14,165,160,0.25)]'
                : banner.id === 'same-day'
                  ? 'bg-teal-light/60 border border-teal/15'
                  : 'bg-sky-50 border border-sky-100'
            }`}
          >
            <Icon
              className={`w-5 h-5 mt-0.5 shrink-0 ${
                banner.dark ? 'text-white' : banner.id === 'same-day' ? 'text-teal' : 'text-sky-600'
              }`}
              strokeWidth={1.75}
            />
            <div className="min-w-0">
              <h3 className={`text-sm font-bold leading-snug ${banner.dark ? 'text-white' : 'text-navy'}`}>
                {banner.title}
              </h3>
              <p className={`text-sm mt-1 leading-relaxed ${banner.dark ? 'text-white/85' : 'text-body-gray'}`}>
                {banner.description}
              </p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
