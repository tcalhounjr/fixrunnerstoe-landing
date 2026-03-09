import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProducts, getProductByHandle } from '@/lib/shopify'
import ProductDetail from '@/components/ProductDetail'

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProductByHandle(handle)

  if (!product) notFound()

  return <ProductDetail product={product} />
}
