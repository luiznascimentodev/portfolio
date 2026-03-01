export default function PostLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Back link skeleton */}
        <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-10" />

        {/* Cover image skeleton */}
        <div className="w-full h-64 sm:h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse mb-10" />

        {/* Tags */}
        <div className="flex gap-2 mb-5">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-3 mb-5">
          <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-9 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>

        {/* Meta (date + reading time) */}
        <div className="flex gap-4 mb-10">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-10" />

        {/* Content body skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div
                className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
                style={{ width: `${75 + Math.sin(i) * 20}%` }}
              />
              <div
                className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse"
                style={{ width: `${85 + Math.cos(i) * 15}%` }}
              />
            </div>
          ))}
        </div>

        {/* Post navigation skeleton */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4">
          <div className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
          <div className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
