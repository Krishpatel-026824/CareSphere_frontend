import {
  Building2,
  CalendarDays,
  DoorOpen,
  GraduationCap,
  Languages,
  Phone,
  School,
  Video,
} from 'lucide-react'

const icons = {
  languages: Languages,
  calendar: CalendarDays,
  graduation: GraduationCap,
  school: School,
  clinic: Building2,
  room: DoorOpen,
  video: Video,
  phone: Phone,
}

export default function ProfileInfoCards({ cards = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {cards.map((card) => {
        const Icon = icons[card.icon] || Languages
        return (
          <article
            key={card.id}
            className="rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-4 py-3"
          >
            <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#8A8F98]">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EBF5FF]">
                <Icon className="h-3.5 w-3.5 text-[#2F80ED]" strokeWidth={1.8} />
              </span>
              {card.label}
            </p>
            {card.tags?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-[#1E2124] ring-1 ring-[#E6E8EC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[13px] font-semibold leading-snug text-[#1E2124]">{card.value}</p>
            )}
          </article>
        )
      })}
    </div>
  )
}
