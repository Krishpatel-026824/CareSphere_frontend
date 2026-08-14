import { useMemo } from 'react'
import { filterTelemedicineDoctors } from '../data/generators/telemedicineGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setSpecialty,
  toggleAvailable,
  toggleClinic,
  toggleHighRated,
  toggleLocation,
} from '../store/slices/telemedicineSlice'

export function useTelemedicine(doctors) {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.telemedicine)
  const items = useMemo(() => filterTelemedicineDoctors(doctors, filters), [doctors, filters])

  return {
    filters,
    items,
    setSpecialty: (specialty) => dispatch(setSpecialty(specialty)),
    toggleClinic: (clinic) => dispatch(toggleClinic(clinic)),
    toggleLocation: (location) => dispatch(toggleLocation(location)),
    toggleHighRated: () => dispatch(toggleHighRated()),
    toggleAvailable: () => dispatch(toggleAvailable()),
  }
}
