import { useMemo, useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { clinicTaskBadgeStyles } from '../../data/mocks/doctorClinicTools'
import { useAppSelector } from '../../store/hooks'
import { selectSignedRxItems } from '../../store/slices/doctorSignedRxSlice'

export default function DoctorSignedRxScreen({ onBack, onContinue, onOpenPatient }) {
  const items = useAppSelector(selectSignedRxItems)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) =>
      [item.patientName, item.medicine, item.badge, item.dose, item.visitLabel]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    )
  }, [items, query])

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <header className="shrink-0">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 mb-3"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              Back to Write Rx
            </button>
          ) : null}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
                Signed prescriptions
              </h1>
              <p className="text-sm text-body-gray mt-1">
                Patients you signed are stored here in table form
              </p>
            </div>
            {onContinue ? (
              <button
                type="button"
                onClick={onContinue}
                className="rounded-xl bg-teal text-white px-4 py-2.5 text-sm font-semibold cursor-pointer hover:bg-teal-dark"
              >
                Continue signing
              </button>
            ) : null}
          </div>
        </header>

        <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-bold text-navy">
                Signed records{' '}
                <span className="text-body-gray font-semibold tabular-nums">({filtered.length})</span>
              </p>
            </div>
            <label className="flex items-center gap-3 rounded-2xl bg-white border border-[#E6EBF1] px-4 min-h-11 shadow-sm">
              <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search patient, medicine, or type"
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
              No signed prescriptions yet. Sign an Rx to store it here.
            </p>
          ) : (
            <div className="flex-1 min-h-0 overflow-auto">
              <table className="w-full table-fixed min-w-[880px] border-collapse text-left">
                <colgroup>
                  <col className="w-14" />
                  <col className="w-[22%]" />
                  <col className="w-[20%]" />
                  <col className="w-[12%]" />
                  <col className="w-[12%]" />
                  <col className="w-[14%]" />
                  <col className="w-[16%]" />
                </colgroup>
                <thead className="bg-[#CBD5E1] sticky top-0 z-10">
                  <tr>
                    {['No.', 'Patient', 'Medicine', 'Type', 'Dose', 'Signed', 'Visit'].map((label) => (
                      <th
                        key={label}
                        className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center last:border-r-0"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => {
                    const badgeClass =
                      clinicTaskBadgeStyles[item.badge] || clinicTaskBadgeStyles.New
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[#F0FDFA] transition-colors cursor-pointer"
                        onClick={() => onOpenPatient?.(item)}
                      >
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <span className="text-[15px] font-semibold text-navy tabular-nums">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] align-middle">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-teal-light">
                              {item.avatar ? (
                                <img
                                  src={item.avatar}
                                  alt=""
                                  className="w-full h-full object-cover object-top"
                                />
                              ) : null}
                            </div>
                            <p className="text-[14px] font-semibold text-navy truncate">
                              {item.patientName}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <p className="text-[14px] font-semibold text-navy truncate">
                            {item.medicine || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <span
                            className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}
                          >
                            {item.badge}
                          </span>
                        </td>
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <p className="text-[14px] font-semibold text-navy whitespace-nowrap">
                            {item.dose || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <p className="text-[13px] font-semibold text-navy whitespace-nowrap">
                            {item.signedAtLabel || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-b border-[#D5DEE8] text-center align-middle">
                          <p className="text-[13px] font-semibold text-navy whitespace-nowrap">
                            {item.visitLabel || '—'}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
