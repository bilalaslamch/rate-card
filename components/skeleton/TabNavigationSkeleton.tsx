export function Skeleton({ className = "w-64 h-10" }: { className?: string }) {
  return (
    <div className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded ${className}`} />
  );
}

export function TabNavigationSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Skeleton className="h-12 w-48 rounded-full" />
      <Skeleton className="h-12 w-48 rounded-full" />
    </div>
  );
} 