
export function CollectionItemSkeleton() {
  const skeleton = (
    <div className="animate-pulse flex justify-center items-center">
      <div className="mb-5 rounded-2.5xl block border p-[1.1875rem]">
        <div className="h-48 w-48 bg-gray-300 rounded-[0.625rem] mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
      </div>
      <div className="ml-5 mb-5 rounded-2.5xl block border p-[1.1875rem]">
        <div className="h-48 w-48 bg-gray-300 rounded-[0.625rem] mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
      </div>
      <div className="ml-5 mb-5 rounded-2.5xl block border p-[1.1875rem]">
        <div className="h-48 w-48 bg-gray-300 rounded-[0.625rem] mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
      </div>
      <div className="mb-4 ml-5 rounded-2.5xl block border p-[1.1875rem]">
        <div className="h-48 w-48 bg-gray-300 rounded-[0.625rem] mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
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