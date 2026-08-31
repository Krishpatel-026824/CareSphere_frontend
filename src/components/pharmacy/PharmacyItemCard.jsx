import { useState } from 'react'
import { ChevronRight, Info, Pill } from 'lucide-react'

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
    <article className="group h-full min-h-[92px] rounded-2xl border border-gray-100 p-3 sm:p-3.5 bg-white min-w-0 transition-all hover:shadow-md hover:border-teal/30 cursor-pointer relative overflow-hidden flex items-center">
      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <Info className="w-3 h-3 text-teal" strokeWidth={2.5} />
      </div>

      <div className="flex items-center gap-3 w-full min-w-0">
        <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm flex items-center justify-center">
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
              <Pill className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h2 className="text-[14px] sm:text-[15px] font-bold text-navy leading-5 h-10 line-clamp-2 group-hover:text-teal transition-colors">
            {item.name}
          </h2>
          <p className="text-[12px] text-gray-500 leading-4 h-4 line-clamp-1 mt-0.5">{useCase}</p>
          <p className="text-[11px] text-gray-400 leading-4 h-4 line-clamp-1 mt-0.5">
            {packSize || '\u00A0'}
          </p>
        </div>

        <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center shrink-0 self-center group-hover:bg-teal/20 transition-colors">
          <ChevronRight className="w-3.5 h-3.5 text-teal" strokeWidth={2.5} />
        </span>
      </div>
    </article>
  )
}
