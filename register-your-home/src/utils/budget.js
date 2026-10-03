export const BUDGETS = {
  Rent: [
    { label: 'Any budget', min: '', max: '' },
    { label: 'Under ₹15,000', min: '', max: 15000 },
    { label: '₹15,000 – ₹30,000', min: 15000, max: 30000 },
    { label: '₹30,000 – ₹50,000', min: 30000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: '' },
  ],
  Sale: [
    { label: 'Any budget', min: '', max: '' },
    { label: 'Under ₹50 Lakh', min: '', max: 5000000 },
    { label: '₹50 Lakh – ₹1 Cr', min: 5000000, max: 10000000 },
    { label: '₹1 Cr – ₹2 Cr', min: 10000000, max: 20000000 },
    { label: 'Above ₹2 Cr', min: 20000000, max: '' },
  ],
}
