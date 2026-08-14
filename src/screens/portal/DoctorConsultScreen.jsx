import { ArrowLeft } from 'lucide-react'
import DoctorConsultReadyCard from '../../components/portal/DoctorConsultReadyCard'
import DoctorConsultStage from '../../components/portal/DoctorConsultStage'
import { generateDoctorConsultPage } from '../../data/generators/doctorConsultGenerator'

export default function DoctorConsultScreen({ visit, onBack, onJoin }) {
  const data = generateDoctorConsultPage(visit)
  const card = data.visit

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <header className="shrink-0 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 min-h-10 px-3.5 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:border-teal hover:text-teal shrink-0"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Back to Home
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none">{data.title}</h1>
            <p className="text-sm text-body-gray mt-1 truncate">{data.subtitle}</p>
          </div>
        </header>

        {card ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 min-h-0 lg:items-stretch">
            <div className="lg:col-span-3 min-w-0 min-h-[320px] lg:min-h-0 h-full">
              <DoctorConsultStage
                title={data.stageTitle}
                hint={data.stageHint}
                waitingLabel={data.waitingLabel}
                cameraOffLabel={data.cameraOffLabel}
                cameraOnLabel={data.cameraOnLabel}
                micReadyLabel={data.micReadyLabel}
                micOffLabel={data.micOffLabel}
              />
            </div>
            <div className="lg:col-span-2 min-w-0 min-h-[320px] lg:min-h-0 h-full">
              <DoctorConsultReadyCard
                visit={card}
                joinLabel={data.joinLabel}
                onJoin={() => onJoin?.(visit)}
              />
            </div>
          </div>
        ) : (
          <section className="flex-1 min-h-0 bg-white rounded-2xl border border-border-gray p-6 flex flex-col justify-center">
            <h2 className="text-lg font-bold text-navy">{data.emptyTitle}</h2>
            <p className="text-sm text-body-gray mt-1">{data.emptyBody}</p>
          </section>
        )}
      </div>
    </div>
  )
}
