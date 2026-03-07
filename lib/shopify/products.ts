import { shopifyFetch } from './client'
import { PRODUCT_FRAGMENT } from './fragments'
import type { ShopifyProduct, Product, ProductVariant, ShopifyImage } from '@/types/shopify'

// Normalize Shopify edge/node arrays to flat arrays
function normalizeProduct(product: ShopifyProduct): Product {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    availableForSale: product.availableForSale,
    tags: product.tags,
    images: product.images.edges.map((e) => e.node),
    priceRange: product.priceRange,
    variants: product.variants.edges.map((e): ProductVariant => e.node),
  }
}

// GET ALL PRODUCTS
const GET_ALL_PRODUCTS_QUERY = `
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

interface GetAllProductsData {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string }
    edges: { node: ShopifyProduct }[]
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = []
  let hasNextPage = true
  let after: string | undefined

  while (hasNextPage) {
    const data = await shopifyFetch<GetAllProductsData>(GET_ALL_PRODUCTS_QUERY, {
      first: 50,
      after,
    })

    const page = data.products
    products.push(...page.edges.map((e) => normalizeProduct(e.node)))
    hasNextPage = page.pageInfo.hasNextPage
    after = page.pageInfo.endCursor
  }

  return products
}

// GET PRODUCT BY HANDLE
const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`

interface GetProductByHandleData {
  productByHandle: ShopifyProduct | null
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<GetProductByHandleData>(GET_PRODUCT_BY_HANDLE_QUERY, { handle })

  if (!data.productByHandle) return null

  return normalizeProduct(data.productByHandle)
}

// GET SHOP INFO (for health check)
const GET_SHOP_QUERY = `
  query GetShop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`

interface GetShopData {
  shop: {
    name: string
    primaryDomain: { url: string }
  }
}

export async function getShopInfo() {
  const data = await shopifyFetch<GetShopData>(GET_SHOP_QUERY)
  return data.shop
}
