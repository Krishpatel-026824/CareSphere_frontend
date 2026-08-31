import { useMemo, useState } from 'react'
import { Pill } from 'lucide-react'
import {
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartToolbar,
} from './PatientChartTable'

const COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '6%' },
  { key: 'medicine', label: 'Medicine', center: false, width: '34%' },
  { key: 'dose', label: 'Dose', center: true, width: '14%' },
  { key: 'schedule', label: 'Schedule', center: true, width: '18%' },
  { key: 'useFor', label: 'Use for', center: true, width: '28%' },
]

function matchesQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.name, item.pack, item.dose, item.frequency, item.useFor, item.category]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export default function DoctorPatientMedicineTab({ items = [] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => items.filter((item) => matchesQuery(item, query)),
    [items, query],
  )

  return (
    <PatientChartPanel
      title="Medicine"
      subtitle="Full pharmacy catalog available for prescribing"
      count={filtered.length}
      fill
    >
      <PatientChartToolbar>
        <PatientChartSearch
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search medicine, dose, or use for"
          aria-label="Search medicines"
        />
      </PatientChartToolbar>

      {!items.length ? (
        <PatientChartEmpty text="No medicines available in the catalog." />
      ) : !filtered.length ? (
        <PatientChartEmpty text="No medicines match your search." />
      ) : (
        <>
          <PatientChartTable minWidth="100%" fill fixed>
            <colgroup>
              {COLUMNS.map((column) => (
                <col key={column.key} style={{ width: column.width }} />
              ))}
            </colgroup>
            <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
              <tr>
                {COLUMNS.map((column) => (
                  <PatientChartTh key={column.key} center={column.center}>
                    {column.label}
                  </PatientChartTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-[#F0FAF9] ${
                    index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                  }`}
                >
                  <PatientChartTd center>
                    <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                      {index + 1}
                    </span>
                  </PatientChartTd>
                  <PatientChartTd>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-center shadow-sm">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <Pill className="w-4 h-4 text-teal" strokeWidth={1.85} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-navy truncate leading-snug">
                          {item.name}
                        </p>
                        {item.pack ? (
                          <p className="text-[12px] text-body-gray truncate mt-0.5">{item.pack}</p>
                        ) : null}
                      </div>
                    </div>
                  </PatientChartTd>
                  <PatientChartTd center>
                    <span className="text-[13px] font-semibold text-navy tabular-nums">
                      {item.dose || '—'}
                    </span>
                  </PatientChartTd>
                  <PatientChartTd center>
                    <span className="text-[13px] font-medium text-navy">{item.frequency || '—'}</span>
                  </PatientChartTd>
                  <PatientChartTd center>
                    <span className="inline-flex max-w-full items-center justify-center text-[12px] font-semibold text-teal-dark bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full truncate">
                      {item.useFor || 'As advised'}
                    </span>
                  </PatientChartTd>
                </tr>
              ))}
            </tbody>
          </PatientChartTable>
          <PatientChartFooter showing={filtered.length} total={items.length} label="medicines" />
        </>
      )}
    </PatientChartPanel>
  )
}
