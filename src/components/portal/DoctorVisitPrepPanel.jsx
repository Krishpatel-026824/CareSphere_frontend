import { Clock3, MapPin, UserRound } from 'lucide-react'
import { generateDoctorVisitDetail } from '../../data/generators/doctorVisitDetailGenerator'

export default function DoctorVisitPrepPanel({ visit, compact = false }) {
  const detail = generateDoctorVisitDetail(visit)
  if (!detail) return null

  const meta = detail.patientMeta
  const tiles = [
    {
      icon: UserRound,
      label: 'Patient',
      value: meta ? `${meta.ageLabel} · ${meta.gender}` : 'Not on file',
    },
    {
      icon: MapPin,
      label: 'City',
      value: meta?.city || detail.cityLine,
    },
    {
      icon: Clock3,
      label: 'Duration',
      value: detail.duration,
    },
    {
      icon: Clock3,
      label: 'Arrival',
      value: detail.checkInLabel,
    },
  ]

  return (
    <div
      className={`rounded-2xl bg-[#F7FAFC] border border-[#E6EBF1] flex flex-col ${
        compact ? 'p-2 gap-1.5' : 'p-2.5 gap-2'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-navy`}>Visit prep</h3>
        {detail.specialty ? (
          <span className="text-[11px] font-semibold text-teal bg-[#E8F7F6] px-2 py-0.5 rounded-full truncate">
            {detail.specialty}
          </span>
        ) : null}
      </div>
      <div className={`grid grid-cols-2 ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {tiles.map((tile) => {
          const Icon = tile.icon
          return (
            <div
              key={tile.label}
              className={`rounded-xl bg-white min-w-0 ${compact ? 'px-2 py-1.5' : 'px-2.5 py-2'}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-body-gray flex items-center gap-1">
                <Icon className="w-3 h-3 text-teal" strokeWidth={1.85} />
                {tile.label}
              </p>
              <p className="text-[12px] font-semibold text-navy mt-0.5 truncate">{tile.value}</p>
            </div>
          )
        })}
      </div>
      {detail.visitReason ? (
        <p className="text-[12px] text-body-gray leading-snug px-0.5">
          <span className="font-semibold text-navy">Clinical note · </span>
          {detail.visitReason}
        </p>
      ) : null}
    </div>
  )
}
