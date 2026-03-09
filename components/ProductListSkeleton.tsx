export default function ProductListSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="loading-spinner"
      aria-label="Loading products"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
          <div className="aspect-square bg-gray-200" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
