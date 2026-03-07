export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoneyV2 {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  images: {
    edges: { node: ShopifyImage }[]
  }
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  variants: {
    edges: { node: ShopifyProductVariant }[]
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: ShopifyMoneyV2
    product: {
      id: string
      title: string
      handle: string
      images: {
        edges: { node: ShopifyImage }[]
      }
    }
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: { node: ShopifyCartLine }[]
  }
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
    totalTaxAmount: ShopifyMoneyV2 | null
  }
}

// Normalized types (flattened from edges/nodes)
export interface Product {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  images: ShopifyImage[]
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  variants: ProductVariant[]
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: ShopifyMoneyV2
    product: {
      id: string
      title: string
      handle: string
      image: ShopifyImage | null
    }
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: CartLine[]
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
    totalTaxAmount: ShopifyMoneyV2 | null
  }
}
