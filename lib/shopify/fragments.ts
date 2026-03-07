export const IMAGE_FRAGMENT = `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`

export const MONEY_FRAGMENT = `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    selectedOptions {
      name
      value
    }
  }
  ${MONEY_FRAGMENT}
`

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    images(first: 10) {
      edges {
        node {
          ...ImageFragment
        }
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
    variants(first: 20) {
      edges {
        node {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`

export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                ...MoneyFragment
              }
              product {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      ...ImageFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`
