import { ArrowDownToLine, Clock3, FileText } from 'lucide-react'
import { healthRecordRowActionsMock } from '../../data/mocks/healthRecords'
import HealthRecordPhoto from './HealthRecordPhoto'
import HealthRecordRowActions from './HealthRecordRowActions'
import { recordBgPositions, recordTypeIcons, recordTypeTones, recordViewTones } from './healthIcons'

export default function HealthRecordCard({
  record,
  menuOpen = false,
  variant = 'list',
  onOpenMenu,
  onView,
  onAction,
}) {
  const Icon = recordTypeIcons[record.icon] || FileText
  const tone = recordTypeTones[record.icon] || 'bg-teal-light text-teal'
  const viewTone = recordViewTones[record.icon] || recordViewTones.lab
  const bgPosition = recordBgPositions[record.icon] || recordBgPositions.lab
  const provider = [record.doctorName, record.specialty].filter(Boolean).join(' • ')
  const when = [record.dateLabel, record.timeLabel].filter(Boolean).join(' • ')
  const options = healthRecordRowActionsMock[variant] || healthRecordRowActionsMock.list
  const background = record.background || record.preview

  return (
    <article className={`relative overflow-hidden ${menuOpen ? 'ring-1 ring-inset ring-teal/40' : ''}`}>
      <HealthRecordPhoto src={background} position={bgPosition} widthClass="w-[46%]" />

      <div className="relative z-[1] px-4 sm:px-5 py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onOpenMenu?.(record)}
            className="flex-1 min-w-0 flex items-center gap-3 sm:gap-4 text-left cursor-pointer"
          >
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${tone}`}>
              <Icon className="w-5 h-5" strokeWidth={1.75} />
            </span>

            <div className="flex-1 min-w-0">
              <h2 className="text-sm sm:text-[15px] font-bold text-navy leading-snug">{record.title}</h2>
              <p className="text-xs sm:text-sm text-body-gray mt-0.5 truncate">{provider}</p>
              <p className="text-xs text-body-gray/80 mt-1 inline-flex items-center gap-1.5">
                <Clock3 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{when}</span>
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0 self-center">
            {onView ? (
              <button
                type="button"
                onClick={() => onView(record)}
                className={`h-10 px-4 rounded-xl bg-white/95 backdrop-blur-[2px] border text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_2px_10px_rgba(7,26,47,0.12)] ${viewTone}`}
              >
                <ArrowDownToLine className="w-4 h-4" strokeWidth={2} />
                View
              </button>
            ) : null}
            {menuOpen ? (
              <HealthRecordRowActions options={options} onAction={(id) => onAction?.(id, record)} />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
