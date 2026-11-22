export const SIZES = [
  { id: 'small', label: 'Small', weight: 'Under 10kg' },
  { id: 'medium', label: 'Medium', weight: '10–25kg' },
  { id: 'large', label: 'Larger', weight: 'Over 25kg' },
]

export const KITS = [
  {
    id: 'starter-kit',
    name: 'Starter Kit',
    price: 2499,
    contents: ['6 tiles', '30 cards', 'bag'],
  },
  {
    id: 'explorer-kit',
    name: 'Explorer Kit',
    price: 3999,
    contents: ['10 tiles', '60 cards', 'bag'],
  },
  {
    id: 'expansion-pack',
    name: 'Expansion Pack',
    price: 1299,
    contents: ['4 tiles', '20 cards'],
  },
]

export const COUPONS = {
  TRAILS10: 10,
}

export const SHIPPING = {
  standard: { price: 99, freeThreshold: 1999 },
  express: { price: 199 },
}
