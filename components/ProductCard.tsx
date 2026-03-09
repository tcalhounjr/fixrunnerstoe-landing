import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/shopify'

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]
  const price = product.priceRange.minVariantPrice
  const compareAtPrice = product.variants[0]?.compareAtPrice

  return (
    <Link
      href={`/products/${product.handle}`}
      data-testid="product-card"
      className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors"
    >
      <div className="relative aspect-square bg-gray-50">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
        {!product.availableForSale && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Sold out
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-medium">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
