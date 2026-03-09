'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Products page error:', error)
  }, [error])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to load products
        </h2>
        <p className="text-gray-500 mb-8">
          Something went wrong while fetching product data. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
