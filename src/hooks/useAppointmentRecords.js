import { useEffect, useMemo, useState } from 'react'
import {
  filterAppointmentRecords,
  generateAppointmentRecords,
} from '../data/generators/appointmentRecordsGenerator'
import { downloadRecordFile, downloadRecordFiles } from '../utils/downloadRecord'

export function useAppointmentRecords(appointment) {
  const view = useMemo(() => generateAppointmentRecords(appointment), [appointment])
  const [type, setType] = useState('All types')
  const [activeRecord, setActiveRecord] = useState(null)

  useEffect(() => {
    setType('All types')
    setActiveRecord(null)
  }, [appointment?.id])

  const filtered = useMemo(() => filterAppointmentRecords(view, type), [view, type])

  function downloadOne(record) {
    downloadRecordFile(record)
  }

  function downloadAll() {
    downloadRecordFiles(filtered, view.doctorName)
  }

  return {
    view,
    type,
    setType,
    filtered,
    activeRecord,
    viewRecord: setActiveRecord,
    closeRecord: () => setActiveRecord(null),
    downloadOne,
    downloadAll,
  }
}
