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
  const records = useAppSelector(selectHealthRecords)
  const bin = useAppSelector(selectHealthBin)

  return {
    records,
    bin,
    binCount: bin.length,
    moveToBin: (id) => dispatch(moveToBin(id)),
    restoreFromBin: (id) => dispatch(restoreFromBin(id)),
    deleteForever: (id) => dispatch(deleteForever(id)),
  }
}
