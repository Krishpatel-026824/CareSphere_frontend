export function rupee(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}
