import {
  Building2,
  CalendarDays,
  DoorOpen,
  GraduationCap,
  Languages,
  MapPin,
  Phone,
  School,
} from 'lucide-react'

const icons = {
  languages: Languages,
  calendar: CalendarDays,
  graduation: GraduationCap,
  school: School,
  clinic: Building2,
  room: DoorOpen,
  phone: Phone,
  distance: MapPin,
}

export default function ProfileInfoCards({ cards = [], compact = false }) {
  if (!cards.length) return null

  return (
    <div
      className={`grid ${
        compact ? 'grid-cols-1 gap-1.5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3'
      }`}
    >
      {cards.map((card) => {
        const Icon = icons[card.icon] || Languages
        return (
          <article
            key={card.id}
            className={`rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] ${compact ? 'px-3 py-2.5' : 'px-4 py-3.5'}`}
          >
            <p
              className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.06em] text-body-gray ${
                compact ? 'mb-1.5 text-[10px]' : 'mb-2 text-[11px] sm:text-xs'
              }`}
            >
              <span className={`flex items-center justify-center rounded-lg bg-teal-light ${compact ? 'h-6 w-6' : 'h-7 w-7'}`}>
                <Icon className={`text-teal ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} strokeWidth={1.85} />
              </span>
              {card.label}
            </p>
            {card.tags?.length ? (
              <div className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full bg-white font-semibold text-navy ring-1 ring-[#E6EBF1] ${
                      compact ? 'px-2 py-0.5 text-[12px]' : 'px-3 py-1 text-[13px]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className={`font-semibold leading-snug text-navy ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
                {card.value}
              </p>
            )}
          </article>
        )
      })}
    </div>
  )
}
