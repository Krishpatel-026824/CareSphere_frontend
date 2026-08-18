import { useEffect, useState } from 'react'
import { isActiveUpcoming } from '../utils/appointmentFormat'

export function useDoctorPatientChart(visits = []) {
  const [currentId, setCurrentId] = useState(visits[0]?.id)

  useEffect(() => {
    if (!visits.some((visit) => visit.id === currentId)) {
      setCurrentId(visits[0]?.id)
    }
  }, [visits, currentId])

  const selected = visits.find((visit) => visit.id === currentId) || visits[0] || null

  return {
    list: visits,
    selected,
    upcoming: visits.filter(isActiveUpcoming),
    history: visits.filter((visit) => !isActiveUpcoming(visit)),
    select: (visit) => setCurrentId(visit.id),
  }
}
