import React from 'react'
import BdcoSkull from '@/components/ui/logo/bdco-skull';
import BdcoWhiteSkull from '@/components/ui/logo/bdco-white-skull';

const page = () => {
  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[600px] bg-accent rounded-sm'>
        <div className='flex flex-col gap-2 m-10'>
          <div className='inline-block dark:hidden'>
            <BdcoSkull />
          </div>
          <div className='inline-block dark:block'>
            <BdcoWhiteSkull />
          </div>

          <p className='text-sm'>
            Let us know how we can help you get the most value<br /> from BadDogs. Vote on existing ideas or suggest<br /> new ones.
          </p>
        </div>
        <div className='bg-accent-dark'>
          asd
        </div>
      </div>
    </div>
  )
}

export default page