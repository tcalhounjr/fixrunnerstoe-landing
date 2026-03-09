'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product, ProductVariant } from '@/types/shopify'

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  )

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAtPrice = selectedVariant?.compareAtPrice
  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount)

  // Group variants by option name (e.g. Size, Color)
  const optionNames = [
    ...new Set(
      product.variants.flatMap((v) => v.selectedOptions.map((o) => o.name))
    ),
  ]

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].altText ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  No image
                </div>
              )}
              {isOnSale && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? 'border-black'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText ?? `${product.title} image ${i + 1}`}
                      fill
                      sizes="10vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col gap-6">
            {/* Title & price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-gray-900">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                {isOnSale && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.availableForSale ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {product.availableForSale ? 'In Stock' : 'Sold Out'}
              </span>
            </div>

            {/* Variant selectors */}
            {optionNames.map((optionName) => {
              const values = [
                ...new Set(
                  product.variants.flatMap((v) =>
                    v.selectedOptions
                      .filter((o) => o.name === optionName)
                      .map((o) => o.value)
                  )
                ),
              ]
              const selectedValue = selectedVariant?.selectedOptions.find(
                (o) => o.name === optionName
              )?.value

              return (
                <div key={optionName}>
                  <p className="text-sm font-black uppercase tracking-widest text-gray-700 mb-3">
                    {optionName}:{' '}
                    <span className="font-medium normal-case tracking-normal text-gray-500">
                      {selectedValue}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {values.map((value) => {
                      const variant = product.variants.find((v) =>
                        v.selectedOptions.every((o) => {
                          if (o.name === optionName) return o.value === value
                          return (
                            o.value ===
                            selectedVariant?.selectedOptions.find(
                              (s) => s.name === o.name
                            )?.value
                          )
                        })
                      )
                      const isSelected = selectedValue === value
                      const isAvailable = variant?.availableForSale ?? false

                      return (
                        <button
                          key={value}
                          onClick={() => variant && setSelectedVariant(variant)}
                          disabled={!isAvailable}
                          className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 rounded transition-all ${
                            isSelected
                              ? 'border-black bg-black text-white'
                              : isAvailable
                              ? 'border-gray-300 hover:border-black text-gray-700'
                              : 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                          }`}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Add to Cart */}
            <button
              disabled={!product.availableForSale}
              className={`w-full py-5 font-black text-lg uppercase tracking-widest rounded-full transition-all duration-300 ${
                product.availableForSale
                  ? 'bg-black text-white hover:bg-red-600 transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              data-testid="add-to-cart"
            >
              {product.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </button>

            {/* Description */}
            {product.description && (
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-500 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
