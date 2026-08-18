import QuickActionHeader from '../../components/home/QuickActionHeader'
import AppointmentListCard from '../../components/appointments/AppointmentListCard'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'
import { generateDoctorHomeStatPage } from '../../data/generators/doctorHomeGenerator'

export default function DoctorHomeStatusScreen({
  statId,
  visits = [],
  selectedVisit,
  onBack,
  onSelectVisit,
  onMessage,
  actions,
}) {
  const page = generateDoctorHomeStatPage(statId, visits)
  if (!page) return null

  const selected = page.visits.find((visit) => visit.id === selectedVisit?.id) || page.visits[0] || null

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={page.title} subtitle={page.subtitle} onBack={onBack} />

        {page.visits.length === 0 ? (
          <section className="flex-1 min-h-0 bg-white rounded-2xl border border-border-gray p-6 flex flex-col justify-center">
            <p className="text-sm text-body-gray">{page.empty}</p>
          </section>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-start gap-3 sm:gap-4">
            <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 flex flex-col gap-2 max-h-[240px] overflow-y-auto lg:max-h-none lg:min-h-0 lg:overflow-y-auto">
              {page.visits.map((visit) => (
                <AppointmentListCard
                  key={visit.id}
                  appointment={visit}
                  selected={selected?.id === visit.id}
                  onSelect={onSelectVisit}
                />
              ))}
            </div>
            {selected ? (
              <div className="flex-1 min-w-0">
                <DoctorVisitPanel
                  visit={selected}
                  canAccept={actions.canAccept(selected)}
                  canDecline={actions.canDecline(selected)}
                  canComplete={actions.canComplete(selected)}
                  onAccept={() => actions.requestAction('accept', selected)}
                  onDecline={() => actions.requestAction('decline', selected)}
                  onComplete={() => actions.requestAction('complete', selected)}
                  onMessage={() => onMessage?.(selected)}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
