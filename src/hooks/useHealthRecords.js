import { useMemo } from 'react'
import { filterHealthRecordsForUser } from '../data/generators/healthRecordsGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  deleteForever,
  moveToBin,
  restoreFromBin,
  selectHealthBin,
  selectHealthRecords,
} from '../store/slices/healthSlice'

export function useHealthRecords() {
  const dispatch = useAppDispatch()
  const allRecords = useAppSelector(selectHealthRecords)
  const bin = useAppSelector(selectHealthBin)
  const authUser = useAppSelector((state) => state.auth.user)

  const records = useMemo(() => {
    if (authUser?.roleType === 'patient' && authUser?.name) {
      return filterHealthRecordsForUser(allRecords, authUser.name)
    }
    return allRecords
  }, [allRecords, authUser])

  return {
    records,
    bin,
    binCount: bin.length,
    moveToBin: (id) => dispatch(moveToBin(id)),
    restoreFromBin: (id) => dispatch(restoreFromBin(id)),
    deleteForever: (id) => dispatch(deleteForever(id)),
  }
}
