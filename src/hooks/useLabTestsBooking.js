import { useMemo } from 'react'
import { generateLabReports } from '../data/generators/labReportGenerator'
import { generateLabTestsBill } from '../data/generators/labTestsBillingGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addLabReports } from '../store/slices/healthSlice'
import {
  bookTest,
  payBill as payBillAction,
  removeTest,
  setPaymentMethod,
} from '../store/slices/labSlice'

export function useLabTestsBooking({ onReportsGenerated } = {}) {
  const dispatch = useAppDispatch()
  const tests = useAppSelector((state) => state.lab.tests)
  const cart = useAppSelector((state) => state.lab.cart)
  const paymentMethod = useAppSelector((state) => state.lab.paymentMethod)
  const paid = useAppSelector((state) => state.lab.paid)
  const reports = useAppSelector((state) => state.lab.reports)

  const bill = useMemo(() => generateLabTestsBill(tests, cart), [tests, cart])

  function payBill() {
    if (bill.total <= 0) return

    const nextReports = generateLabReports({
      tests,
      cart,
      bill,
      paymentMethod,
    })

    dispatch(payBillAction(nextReports))
    dispatch(addLabReports(nextReports))
    onReportsGenerated?.(nextReports)
  }

  return {
    tests,
    cart,
    bill,
    paymentMethod,
    setPaymentMethod: (value) => dispatch(setPaymentMethod(value)),
    paid,
    reports,
    bookTest: (testId) => dispatch(bookTest(testId)),
    removeTest: (testId) => dispatch(removeTest(testId)),
    payBill,
  }
}
