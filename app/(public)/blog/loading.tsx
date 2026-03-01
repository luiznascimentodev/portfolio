export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-6" />
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-full max-w-xl bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Tag filter skeleton */}
        <div className="mb-10 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              style={{ width: `${60 + i * 14}px` }}
            />
          ))}
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden bg-gray-50/80 dark:bg-gray-900/60"
            >
              {/* Cover image skeleton */}
              <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />

              <div className="p-5 space-y-3">
                {/* Tags */}
                <div className="flex gap-2">
                  <div className="h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                </div>
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
                {/* Excerpt */}
                <div className="space-y-1.5">
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
                </div>
                {/* Meta */}
                <div className="flex justify-between pt-1">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
