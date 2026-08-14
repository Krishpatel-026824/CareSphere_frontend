import { ArrowUpRight } from 'lucide-react'
import { profileMenuIcons } from './profileIcons'

export default function ProfileMenuCard({ items, onSelect }) {
  return (
    <section className="rounded-3xl border border-[#E6EBF1] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-bold text-navy">Quick access</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = profileMenuIcons[item.icon]
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.pathKey)}
                className="group h-full w-full rounded-2xl border border-[#E6EBF1] bg-white p-4 text-left cursor-pointer hover:border-teal/30 hover:shadow-sm transition-all"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`}>
                    {Icon ? <Icon className="w-5 h-5" strokeWidth={1.75} /> : null}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-teal shrink-0" strokeWidth={1.75} />
                </span>
                <span className="block text-sm font-semibold text-navy mt-3 leading-tight">{item.label}</span>
                <span className="block text-[12px] text-body-gray mt-1 leading-snug">{item.hint}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
