import { useState } from 'react'
import { Pill, Info } from 'lucide-react'

function splitSubtitle(subtitle = '') {
  const parts = subtitle.split(/\s+[-•]\s+/)
  return {
    useCase: parts[0] || subtitle,
    packSize: parts[1] || '',
  }
}

export default function PharmacyItemCard({ item }) {
  const [imageError, setImageError] = useState(false)
  const showImage = item.image && !imageError

  const { useCase, packSize } = splitSubtitle(item.subtitle)

  return (
    <article className="group rounded-2xl border border-gray-100 p-4 bg-white min-w-0 transition-all hover:shadow-lg hover:border-teal/30 hover:scale-[1.01] cursor-pointer relative overflow-hidden">
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Info className="w-3.5 h-3.5 text-teal" strokeWidth={2.5} />
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-white shadow-sm flex items-center justify-center">
          {showImage ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
              <Pill className="w-7 h-7 text-orange-400" strokeWidth={1.5} />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-bold text-navy leading-snug break-words group-hover:text-teal transition-colors">
            {item.name}
          </h2>
          <p className="text-[12px] text-gray-500 leading-snug mt-0.5">{useCase}</p>
          {packSize && <p className="text-[11px] text-gray-400 mt-0.5">{packSize}</p>}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">View details</span>
        <span className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
          <svg className="w-3 h-3 text-teal" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </span>
      </div>
    </article>
  )
}
