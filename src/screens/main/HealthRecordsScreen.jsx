import { Download, FileText } from 'lucide-react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import { generateHealthRecordsData } from '../../data/generators/quickActionsGenerator'

export default function HealthRecordsScreen({ onBack }) {
  const { records } = generateHealthRecordsData()

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <QuickActionHeader
          title="Health records"
          subtitle="View and download your medical reports"
          onBack={onBack}
        />

        <div className="flex flex-col gap-3">
          {records.map((record) => (
            <article
              key={record.id}
              className="bg-white border border-border-gray rounded-2xl p-4 shadow-sm flex items-center gap-3.5"
            >
              <span className="w-11 h-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-navy truncate">{record.title}</h2>
                <p className="text-xs text-body-gray mt-0.5 truncate">{record.doctorName}</p>
                <p className="text-xs text-body-gray mt-1">
                  {record.dateLabel} • {record.type}
                </p>
              </div>
              <button
                type="button"
                className="min-h-9 px-3.5 rounded-xl border border-border-gray bg-bg-gray text-navy text-xs font-semibold cursor-pointer hover:bg-white inline-flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                View
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
