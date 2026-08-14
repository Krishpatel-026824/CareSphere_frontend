import { labTestsBillingMock } from '../mocks/labTestsBilling'

export function generateLabTestsBill(tests = [], cart = {}) {
  const lines = tests
    .filter((test) => (cart[test.id] || 0) > 0)
    .map((test) => ({
      id: test.id,
      name: test.name,
      quantity: 1,
      unitPrice: test.price,
      lineTotal: test.price,
    }))

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const collectionFee =
    subtotal === 0 || subtotal >= labTestsBillingMock.freeCollectionMin
      ? 0
      : labTestsBillingMock.collectionFee
  const tax = Math.round((subtotal * labTestsBillingMock.taxPercent) / 100)
  const itemCount = lines.length

  return {
    lines,
    subtotal,
    collectionFee,
    tax,
    taxPercent: labTestsBillingMock.taxPercent,
    total: subtotal + collectionFee + tax,
    itemCount,
    freeCollectionMin: labTestsBillingMock.freeCollectionMin,
  }
}
