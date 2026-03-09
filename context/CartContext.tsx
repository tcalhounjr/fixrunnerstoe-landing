'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
  type ReactNode,
} from 'react'
import {
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart,
} from '@/lib/shopify'
import type { Cart } from '@/types/shopify'

const CART_ID_KEY = 'shopify_cart_id'

interface CartContextValue {
  cart: Cart | null
  isLoading: boolean
  isPending: boolean
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  // Restore cart from localStorage on mount
  useEffect(() => {
    async function restoreCart() {
      const cartId = localStorage.getItem(CART_ID_KEY)
      if (!cartId) {
        setIsLoading(false)
        return
      }
      try {
        const existing = await getCart(cartId)
        if (existing) {
          setCart(existing)
        } else {
          // Cart expired or not found — clear stale ID
          localStorage.removeItem(CART_ID_KEY)
        }
      } catch {
        localStorage.removeItem(CART_ID_KEY)
      } finally {
        setIsLoading(false)
      }
    }
    restoreCart()
  }, [])

  // Cross-tab sync via storage event
  useEffect(() => {
    async function onStorageChange(e: StorageEvent) {
      if (e.key !== CART_ID_KEY) return
      const newCartId = e.newValue
      if (!newCartId) {
        setCart(null)
        return
      }
      try {
        const updated = await getCart(newCartId)
        if (updated) setCart(updated)
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorageChange)
    return () => window.removeEventListener('storage', onStorageChange)
  }, [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      startTransition(async () => {
        try {
          let cartId = localStorage.getItem(CART_ID_KEY)
          let updated: Cart

          if (!cartId) {
            updated = await createCart([{ merchandiseId, quantity }])
            localStorage.setItem(CART_ID_KEY, updated.id)
          } else {
            updated = await addCartLines(cartId, [{ merchandiseId, quantity }])
          }
          setCart(updated)
        } catch (err) {
          console.error('Failed to add item to cart:', err)
        }
      })
    },
    []
  )

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    startTransition(async () => {
      try {
        const updated = await updateCartLines(cartId, [{ id: lineId, quantity }])
        setCart(updated)
      } catch (err) {
        console.error('Failed to update cart line:', err)
      }
    })
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    startTransition(async () => {
      try {
        const updated = await removeCartLines(cartId, [lineId])
        setCart(updated)
      } catch (err) {
        console.error('Failed to remove cart line:', err)
      }
    })
  }, [])

  return (
    <CartContext.Provider value={{ cart, isLoading, isPending, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
