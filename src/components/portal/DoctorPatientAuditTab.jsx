import {
  PatientChartEmpty,
  PatientChartPanel,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
} from './PatientChartTable'

const TYPE_STYLE = {
  visit: 'bg-sky-100 text-sky-800',
  rx: 'bg-teal-light text-teal-dark',
  lab: 'bg-amber-100 text-amber-800',
  note: 'bg-violet-100 text-violet-800',
}

export default function DoctorPatientAuditTab({ items = [] }) {
  return (
    <PatientChartPanel title="Audit trail" count={items.length} fill>
      {!items.length ? (
        <PatientChartEmpty text="No audit activity recorded for this patient yet." />
      ) : (
        <PatientChartTable minWidth="680px" fill>
          <thead className="bg-[#E8F7F6] sticky top-0 z-10">
            <tr>
              {['No.', 'When', 'Action', 'Detail', 'By'].map((label, index) => (
                <PatientChartTh key={label} center={index === 0}>
                  {label}
                </PatientChartTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                <PatientChartTd center>{index + 1}</PatientChartTd>
                <PatientChartTd>
                  <p className="font-semibold text-navy whitespace-nowrap">{item.at}</p>
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
                  <p className="text-navy truncate max-w-[280px]">{item.detail}</p>
                </PatientChartTd>
                <PatientChartTd>
                  <p className="text-body-gray truncate">{item.actor}</p>
                </PatientChartTd>
              </tr>
            ))}
          </tbody>
        </PatientChartTable>
      )}
    </PatientChartPanel>
  )
}
