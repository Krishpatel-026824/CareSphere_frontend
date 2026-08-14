import { pharmacyBillingMock } from '../mocks/pharmacyBilling'

export function generatePharmacyBill(items = [], cart = {}) {
  const lines = items
    .filter((item) => (cart[item.id] || 0) > 0)
    .map((item) => {
      const quantity = cart[item.id]
      return {
        id: item.id,
        name: item.name,
        quantity,
        unitPrice: item.price,
        lineTotal: item.price * quantity,
      }
    })

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const deliveryFee =
    subtotal === 0 || subtotal >= pharmacyBillingMock.freeDeliveryMin ? 0 : pharmacyBillingMock.deliveryFee
  const tax = Math.round((subtotal * pharmacyBillingMock.taxPercent) / 100)
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  return {
    lines,
    subtotal,
    deliveryFee,
    tax,
    taxPercent: pharmacyBillingMock.taxPercent,
    total: subtotal + deliveryFee + tax,
    itemCount,
    freeDeliveryMin: pharmacyBillingMock.freeDeliveryMin,
  }
}
