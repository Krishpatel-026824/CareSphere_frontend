import { CalendarPlus, FlaskConical } from 'lucide-react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import { generateLabTestsData } from '../../data/generators/quickActionsGenerator'

export default function LabTestsScreen({ onBack }) {
  const { tests } = generateLabTestsData()

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <QuickActionHeader
          title="Lab tests"
          subtitle="Book home sample collection or visit a partner lab"
          onBack={onBack}
        />

        <div className="flex flex-col gap-3">
          {tests.map((test) => (
            <article
              key={test.id}
              className="bg-white border border-border-gray rounded-2xl p-4 shadow-sm flex items-start gap-3.5"
            >
              <span className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-navy">{test.name}</h2>
                <p className="text-xs text-body-gray mt-1 leading-relaxed">{test.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <p className="text-sm font-bold text-navy">₹{test.price}</p>
                  <p className="text-xs text-body-gray">Results in {test.turnaround}</p>
                </div>
              </div>
              <button
                type="button"
                className="min-h-9 px-3.5 rounded-xl bg-teal text-white text-xs font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-1.5 shrink-0"
              >
                <CalendarPlus className="w-3.5 h-3.5" strokeWidth={1.75} />
                Book
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
