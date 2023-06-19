
export function CollectionActivitySkeleton() {
  const skeleton = (
    <div className="w-1/2 mb-10 animate-pulse bg-white dark:bg-jacarta-700 border border-jacarta-100 dark:border-jacarta-700 rounded-2.5xl relative flex items-center p-8 transition-shadow hover:shadow-lg">
      <div className="mr-5 self-start">
        <div className="bg-gray-400 dark:bg-gray-600 h-10 w-10 rounded-full"></div>
      </div>
      <div>
        <div className="bg-gray-400 dark:bg-gray-600 h-4 w-24 mb-1"></div>
        <div className="bg-gray-400 dark:bg-gray-600 h-3 w-16 mb-3"></div>
        <div className="bg-gray-400 dark:bg-gray-600 h-2 w-10"></div>
      </div>
      <div className="bg-gray-400 dark:bg-gray-600 ml-auto rounded-full p-3">
        <div className="bg-gray-500 dark:bg-gray-400 h-6 w-6 rounded-full"></div>
      </div>
    </div>

  )
  return (
    <>
      {skeleton}
      {skeleton}
      {skeleton}
      {skeleton}
    </>
  )
}