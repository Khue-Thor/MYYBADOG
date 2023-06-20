import React from 'react'

type params = {
  params: {
    url: string
  }
}

export default function CategoryItemPlaceholder({ params }: params) {
  return (
    <div className="max-w-[230px] h-[230px] rounded-[0.625rem] object-cover dark:bg-jacarta-700 dark:bg-jacarta-600 relative">
      <div className="flex items-center justify-center h-full">
        <img src={params.url} alt="404" className="blur-sm rounded-full" />
      </div>
      <div className=" absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={params.url}
          alt="item 5"
          className="dark:border-jacarta-700 w-1/4 h-1/4 mb-5 rounded-full border-2 border-white"
        />
        <div className="font-display dark:text-jacarta-200 text-sm font-semibold">{`Couldn't load metadata`}</div>
      </div>
    </div>
  )
}
