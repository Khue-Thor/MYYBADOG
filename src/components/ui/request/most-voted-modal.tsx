import React from 'react'

const MostVotedModal = () => {
  return (
    <div className='absolute top-[40px] left-0 h-[230px] overflow-hidden bg-accent-dark flex flex-row justify-between  border-jacarta-500 border-[2px] rounded-md'>
      <ul className='list-none flex gap-5 flex-col p-10 border-r-[2px] border-jacarta-500 w-[200px]'>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Roadmap</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Most voted</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Trending</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Newest</p>
        </li>
      </ul>
      <ul className='list-none flex flex-col overflow-auto'>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-2 pb-2 pr-[150px] pl-5'>
          <div className='w-[10px] h-[10px] rounded-full border-green-background border-[3px]'></div>
          <p className='text-sm '>Planed</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-2 pb-2 pr-[150px] pl-5'>
          <p className='text-sm'>In Progress</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Not currently planed</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Completed</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Archived</p>
        </li>
        <li className='hover:dark:bg-green hover:cursor-pointer'>
          <p className='text-sm'>Merged</p>
        </li>
      </ul>
    </div>
  )
}

export default MostVotedModal