import Link from 'next/link'
import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export default async function ProductsSection() {
  const products = await getAllProducts()

  if (products.length === 0) return null

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">
              The Line
            </span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-white leading-tight">
              Built to Perform
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            View All Products
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}
