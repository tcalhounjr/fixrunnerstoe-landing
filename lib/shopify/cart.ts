import { shopifyFetch } from './client'
import { CART_FRAGMENT } from './fragments'
import type { ShopifyCart, Cart, CartLine, ShopifyImage } from '@/types/shopify'

function normalizeCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines: cart.lines.edges.map((e): CartLine => {
      const imageEdge = e.node.merchandise.product.images.edges[0]
      return {
        id: e.node.id,
        quantity: e.node.quantity,
        merchandise: {
          id: e.node.merchandise.id,
          title: e.node.merchandise.title,
          price: e.node.merchandise.price,
          product: {
            id: e.node.merchandise.product.id,
            title: e.node.merchandise.product.title,
            handle: e.node.merchandise.product.handle,
            image: imageEdge ? (imageEdge.node as ShopifyImage) : null,
          },
        },
      }
    }),
    cost: cart.cost,
  }
}

// CREATE CART
const CREATE_CART_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`

interface CartCreateData {
  cartCreate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart> {
  const data = await shopifyFetch<CartCreateData>(CREATE_CART_MUTATION, { lines })
  return normalizeCart(data.cartCreate.cart)
}

// ADD LINES
const ADD_LINES_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`

interface CartLinesAddData {
  cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesAddData>(ADD_LINES_MUTATION, { cartId, lines })
  return normalizeCart(data.cartLinesAdd.cart)
}

// UPDATE LINES
const UPDATE_LINES_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`

interface CartLinesUpdateData {
  cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesUpdateData>(UPDATE_LINES_MUTATION, { cartId, lines })
  return normalizeCart(data.cartLinesUpdate.cart)
}

// REMOVE LINES
const REMOVE_LINES_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`

interface CartLinesRemoveData {
  cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<CartLinesRemoveData>(REMOVE_LINES_MUTATION, { cartId, lineIds })
  return normalizeCart(data.cartLinesRemove.cart)
}

// GET CART
const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFragment }
  }
  ${CART_FRAGMENT}
`

interface GetCartData {
  cart: ShopifyCart | null
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<GetCartData>(GET_CART_QUERY, { cartId })
  if (!data.cart) return null
  return normalizeCart(data.cart)
}
