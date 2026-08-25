import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorConsultReadyCard from '../../components/portal/DoctorConsultReadyCard'
import DoctorConsultStage from '../../components/portal/DoctorConsultStage'
import { generateDoctorConsultPage } from '../../data/generators/doctorConsultGenerator'

export default function DoctorConsultScreen({ visit, onBack, onJoin }) {
  const data = generateDoctorConsultPage(visit)
  const card = data.visit

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={data.title} subtitle={data.subtitle} onBack={onBack} />

        {card ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 xl:items-stretch">
            <div className="xl:col-span-7 min-w-0 min-h-[380px] xl:min-h-0 h-full">
              <DoctorConsultStage
                visit={card}
                waitingLabel={data.waitingLabel}
                patientWaitingLabel={data.patientWaitingLabel}
                selfViewLabel={data.selfViewLabel}
                cameraOffLabel={data.cameraOffLabel}
                cameraOnLabel={data.cameraOnLabel}
                micReadyLabel={data.micReadyLabel}
                micOffLabel={data.micOffLabel}
                cameraOffHint={data.cameraOffHint}
                cameraOnHint={data.cameraOnHint}
                connectionLabel={data.connectionLabel}
                connectionValue={data.connectionValue}
                durationLabel={data.durationLabel}
                durationValue={data.durationValue}
                secureLabel={data.secureLabel}
              />
            </div>
            <div className="xl:col-span-5 min-w-0 min-h-[380px] xl:min-h-0 h-full">
              <DoctorConsultReadyCard
                visit={card}
                joinLabel={data.joinLabel}
                reasonLabel={data.reasonLabel}
                prepLabel={data.prepLabel}
                bringLabel={data.bringLabel}
                detailsTitle={data.detailsTitle}
                onJoin={() => onJoin?.(visit)}
              />
            </div>
          </div>
        ) : (
          <section className="flex-1 min-h-0 bg-white rounded-[28px] border border-border-gray p-6 flex flex-col justify-center">
            <h2 className="text-lg font-bold text-navy">{data.emptyTitle}</h2>
            <p className="text-sm text-body-gray mt-1">{data.emptyBody}</p>
          </section>
        )}
      </div>
    </div>
  )
}
