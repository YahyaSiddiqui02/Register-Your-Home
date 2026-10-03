export function formatPrice(price, listingType) {
  const n = Number(price)
  if (listingType === 'Rent') return `₹${n.toLocaleString('en-IN')}/month`
  if (n >= 10000000) return `₹${Number((n / 10000000).toFixed(2))} Cr`
  if (n >= 100000) return `₹${Number((n / 100000).toFixed(2))} L`
  return `₹${n.toLocaleString('en-IN')}`
}
