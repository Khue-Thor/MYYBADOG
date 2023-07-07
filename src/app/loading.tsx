import Image from 'next/image'
import React from 'react'

export default function Fire() {
  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <div className="flex justify-center items-center w-[80px] h-[80px] rounded-3xl" style={{ backgroundColor: '#7750f8' }}>
        <Image src="/images/bdco-skull-white-28x40.svg" width="36" height="52" alt='logo'></Image>
      </div>
      <div className="text-center mt-12 font-display font-extrabold dark:text-white text-2xl">
        BADDOGS.XYZ
      </div>
      <p className="text-center mt-6 font-display dark:text-white text-sm font-semibold">LOADING...</p>

      <div className="page-loader-indicator loader-bars">
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
      </div>
    </div>
  )
}