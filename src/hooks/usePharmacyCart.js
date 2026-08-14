import { useMemo } from 'react'
import { generatePharmacyBill } from '../data/generators/pharmacyBillingGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addToCart,
  payBill as payBillAction,
  removeFromCart,
  requestRestock,
  restockItem,
  setPaymentMethod,
} from '../store/slices/pharmacySlice'

export function usePharmacyCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.pharmacy.items)
  const cart = useAppSelector((state) => state.pharmacy.cart)
  const restockRequests = useAppSelector((state) => state.pharmacy.restockRequests)
  const paymentMethod = useAppSelector((state) => state.pharmacy.paymentMethod)
  const paid = useAppSelector((state) => state.pharmacy.paid)

  const bill = useMemo(() => generatePharmacyBill(items, cart), [items, cart])

  function payBill() {
    if (bill.total <= 0) return
    dispatch(payBillAction())
  }

  return {
    items,
    cart,
    bill,
    restockRequests,
    paymentMethod,
    setPaymentMethod: (value) => dispatch(setPaymentMethod(value)),
    paid,
    addToCart: (itemId) => dispatch(addToCart(itemId)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
    requestRestock: (itemId) => dispatch(requestRestock(itemId)),
    restockItem: (itemId) => dispatch(restockItem(itemId)),
    payBill,
  }
}
