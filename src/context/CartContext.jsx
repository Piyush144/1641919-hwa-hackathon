import { createContext, useContext, useReducer, useCallback } from 'react'
import { KITS, SIZES, COUPONS, SHIPPING } from '../data/products'

const STORAGE_KEY = 'treasure-trail-cart'
const COUPON_KEY = 'treasure-trail-coupon'

const kitById = Object.fromEntries(KITS.map((k) => [k.id, k]))
const sizeById = Object.fromEntries(SIZES.map((s) => [s.id, s]))

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const couponRaw = localStorage.getItem(COUPON_KEY)
    const cart = raw ? JSON.parse(raw) : []
    const coupon = couponRaw ? JSON.parse(couponRaw) : null
    return { cart, coupon }
  } catch {
    return { cart: [], coupon: null }
  }
}

const save = (cart, coupon) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon))
  } catch {
    // storage unavailable; ignore
  }
}

const initialState = (() => {
  const { cart, coupon } = load()
  return { cart, coupon }
})()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { kitId, sizeId, qty = 1 } = action.payload
      const key = `${kitId}-${sizeId}`
      const existing = state.cart.find((i) => i.key === key)
      const nextCart = existing
        ? state.cart.map((i) =>
            i.key === key
              ? { ...i, qty: Math.min(10, i.qty + qty) }
              : i
          )
        : [...state.cart, { key, kitId, sizeId, qty: Math.min(10, qty) }]
      save(nextCart, state.coupon)
      return { ...state, cart: nextCart }
    }
    case 'REMOVE': {
      const nextCart = state.cart.filter((i) => i.key !== action.payload.key)
      save(nextCart, state.coupon)
      return { ...state, cart: nextCart }
    }
    case 'SET_QTY': {
      const { key, qty } = action.payload
      const bounded = Math.min(10, Math.max(1, qty))
      if (bounded < 1) {
        return state
      }
      const nextCart = state.cart.map((i) =>
        i.key === key ? { ...i, qty: bounded } : i
      )
      save(nextCart, state.coupon)
      return { ...state, cart: nextCart }
    }
    case 'CLEAR': {
      save([], null)
      return { cart: [], coupon: null }
    }
    case 'APPLY_COUPON': {
      const code = action.payload.code
      if (COUPONS[code] === undefined) {
        return { ...state, coupon: null }
      }
      save(state.cart, code)
      return { ...state, coupon: code }
    }
    case 'REMOVE_COUPON': {
      save(state.cart, null)
      return { ...state, coupon: null }
    }
    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const items = state.cart
  const itemCount = state.cart.reduce((sum, i) => sum + i.qty, 0)

  const subtotal = state.cart.reduce((sum, i) => {
    const kit = kitById[i.kitId]
    return sum + (kit ? kit.price * i.qty : 0)
  }, 0)

  const discountPercent = state.coupon ? COUPONS[state.coupon] : 0
  const discount = Math.round((subtotal * discountPercent) / 100)
  const subtotalAfterDiscount = subtotal - discount

  const shipping = (method) => {
    if (method === 'express') return SHIPPING.express.price
    return subtotalAfterDiscount >= SHIPPING.standard.freeThreshold
      ? 0
      : SHIPPING.standard.price
  }

  const total = (method) => subtotalAfterDiscount + shipping(method)

  const addItem = useCallback((kitId, sizeId, qty = 1) => {
    dispatch({ type: 'ADD', payload: { kitId, sizeId, qty } })
  }, [])

  const removeItem = useCallback((key) => {
    dispatch({ type: 'REMOVE', payload: { key } })
  }, [])

  const setQty = useCallback((key, qty) => {
    dispatch({ type: 'SET_QTY', payload: { key, qty } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const applyCoupon = useCallback((code) => {
    const normalized = code.toUpperCase().trim()
    if (COUPONS[normalized] === undefined) {
      dispatch({ type: 'APPLY_COUPON', payload: { code: null } })
      return { ok: false, message: 'Invalid coupon code' }
    }
    dispatch({ type: 'APPLY_COUPON', payload: { code: normalized } })
    return { ok: true, message: `Coupon ${normalized} applied` }
  }, [])

  const value = {
    items,
    itemCount,
    subtotal,
    discount,
    coupon: state.coupon,
    shipping,
    total,
    subtotalAfterDiscount,
    addItem,
    removeItem,
    setQty,
    clearCart,
    applyCoupon,
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
