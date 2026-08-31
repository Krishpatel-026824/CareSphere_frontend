import { useMemo, useState } from 'react'
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

const TYPE_STYLE = {
  visit: 'bg-sky-100 text-sky-800',
  rx: 'bg-teal-light text-teal-dark',
  lab: 'bg-amber-100 text-amber-800',
  note: 'bg-violet-100 text-violet-800',
  edit: 'bg-slate-100 text-slate-700',
}

function matchesAuditQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.at, item.action, item.detail, item.actor, item.type]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export default function DoctorPatientAuditTab({ items = [] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => items.filter((item) => matchesAuditQuery(item, query)),
    [items, query],
  )

  return (
    <PatientChartPanel
      title="Audit trail"
      subtitle="Chronological log of visits, prescriptions, labs, and notes"
      count={filtered.length}
      fill
    >
      <PatientChartToolbar>
        <PatientChartSearch
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search action, detail, or actor"
          aria-label="Search audit trail"
        />
      </PatientChartToolbar>

      {!items.length ? (
        <PatientChartEmpty text="No audit activity recorded for this patient yet." />
      ) : !filtered.length ? (
        <PatientChartEmpty text="No audit entries match your search." />
      ) : (
        <>
          <PatientChartTable minWidth="720px" fill>
            <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
              <tr>
                {['No.', 'When', 'Action', 'Detail', 'By'].map((label, index) => (
                  <PatientChartTh key={label} center={index === 0}>
                    {label}
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
                    <p className="text-[13px] font-semibold text-navy whitespace-nowrap tabular-nums">
                      {item.at}
                    </p>
                  </PatientChartTd>
                  <PatientChartTd>
                    <span
                      className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        TYPE_STYLE[item.type] || TYPE_STYLE.note
                      }`}
                    >
                      {item.action}
                    </span>
                  </PatientChartTd>
                  <PatientChartTd>
                    <p className="text-[13px] text-navy truncate max-w-[320px]" title={item.detail}>
                      {item.detail}
                    </p>
                  </PatientChartTd>
                  <PatientChartTd>
                    <p className="text-[13px] text-body-gray truncate">{item.actor}</p>
                  </PatientChartTd>
                </tr>
              ))}
            </tbody>
          </PatientChartTable>
          <PatientChartFooter showing={filtered.length} total={items.length} label="events" />
        </>
      )}
    </PatientChartPanel>
  )
}
