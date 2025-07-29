export function Skeleton({ className = "w-64 h-10" }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded ${className}`}
    />
  );
}

export function CustomResourceCalculatorSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-8 w-72 mb-2" />
          <Skeleton className="h-4 w-60 mb-2" />
          <div className="bg-gray-300 h-[1px] w-full" />
        </div>
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Region Select */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Role Select */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Seniority Radio */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        {/* Rate Display */}
        <div className="flex flex-col justify-center items-end py-8 border-t border-t-gray-300">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
