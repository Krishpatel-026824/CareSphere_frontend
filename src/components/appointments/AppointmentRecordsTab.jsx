import { Download } from 'lucide-react'
import { useAppointmentRecords } from '../../hooks/useAppointmentRecords'
import RecordFileCard from './RecordFileCard'
import RecordPreviewModal from './RecordPreviewModal'

export default function AppointmentRecordsTab({ appointment }) {
  const {
    view,
    type,
    setType,
    filtered,
    activeRecord,
    viewRecord,
    closeRecord,
    downloadOne,
    downloadAll,
  } = useAppointmentRecords(appointment)

  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 sm:p-5 lg:p-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-[#1E2124]">{view.title}</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              Showing {filtered.length} of {view.records.length} files · {type}
            </p>
          </div>
          <button
            type="button"
            onClick={downloadAll}
            disabled={filtered.length === 0}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#1E2124] px-3 py-2 text-[12px] font-semibold text-white cursor-pointer hover:bg-[#36393F] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
            Download {type === 'All types' ? 'all' : type}
          </button>
        </div>

        <section className="flex items-center gap-3 rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-3.5 py-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EEF2F6]">
            <img
              src={view.photo}
              alt={view.doctorName}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1E2124]">{view.doctorName}</p>
            <p className="truncate text-[12px] text-[#6B7280]">
              {view.specialty} • {view.clinic}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          {view.typeFilters.map((item) => {
            const empty = item.label !== 'All types' && item.count === 0
            return (
              <button
                key={item.label}
                type="button"
                disabled={empty}
                onClick={() => setType(item.label)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                  type === item.label
                    ? 'bg-[#1E2124] text-white'
                    : 'border border-[#E6E8EC] bg-white text-[#4B5563]'
                } ${empty ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
              >
                {item.label} ({item.count})
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-4 py-6 text-sm text-[#6B7280]">
            No {type === 'All types' ? '' : `${type.toLowerCase()} `}records for {view.doctorName}.
          </p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
            {filtered.map((record) => (
              <RecordFileCard
                key={record.id}
                record={record}
                onView={viewRecord}
                onDownload={downloadOne}
              />
            ))}
          </div>
        )}
      </div>

      <RecordPreviewModal record={activeRecord} onClose={closeRecord} onDownload={downloadOne} />
    </div>
  )
}
