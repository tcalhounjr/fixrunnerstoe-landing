import { Suspense } from 'react'
import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import ProductListSkeleton from '@/components/ProductListSkeleton'

async function ProductList() {
  const products = await getAllProducts()

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16">No products found.</p>
    )
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </main>
  )
}
