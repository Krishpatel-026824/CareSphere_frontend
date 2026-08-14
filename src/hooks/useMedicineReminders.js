import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  markAsTaken,
  selectMedicines,
  selectMedicineStartIndex,
  selectPendingReminders,
  selectTakenById,
} from '../store/slices/medicinesSlice'

export function useMedicineReminders() {
  const dispatch = useAppDispatch()
  const medicines = useAppSelector(selectMedicines)
  const takenById = useAppSelector(selectTakenById)
  const startIndex = useAppSelector(selectMedicineStartIndex)
  const pendingCount = useAppSelector(selectPendingReminders)

  return {
    medicines,
    takenById,
    startIndex,
    pendingCount,
    markAsTaken: (id) => dispatch(markAsTaken(id)),
  }
}
