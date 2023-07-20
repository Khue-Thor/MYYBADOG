import React from 'react'

const MostVotedModal = ({ onOptionSelect }) => {
  const handleOptionSelect = (option: any) => {
    onOptionSelect(option)
  }
  return (
    <div className='absolute top-[40px] left-0 h-[230px] overflow-hidden bg-accent-dark flex flex-row justify-between  border-[1px] rounded-md border-jacarta-500'>
      <ul className='list-none flex flex-col border-r-[2px] border-jacarta-500 w-[200px]'>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5'>
          <p className='text-sm gap-2 w-[220px]'>Roadmap</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5'>
          <p className='text-sm'>Most voted</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5'>
          <p className='text-sm'>Trending</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5'>
          <p className='text-sm'>Newest</p>
        </li>
      </ul>
      <ul className='list-none flex flex-col overflow-auto'>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('Planed')}>
          <div className='w-[10px] h-[10px] rounded-full border-blue border-[3px]' />
          <p className='text-sm w-[220px]'>Planed</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('In Progress')}>
          <div className='w-[10px] h-[10px] rounded-full border-yellow-500 border-[3px]' />
          <p className='text-sm w-[220px]'>In Progress</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('Not currently planed')}>
          <div className='w-[10px] h-[10px] rounded-full border-orange border-[3px]' />
          <p className='text-sm w-[220px]'>Not currently planed</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('Completed')}>
          <div className='w-[10px] h-[10px] rounded-full border-green-background border-[3px]' />
          <p className='text-sm w-[220px]'>Completed</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('Archived')}>
          <div className='w-[10px] h-[10px] rounded-full border-gray-700 border-[3px]' />
          <p className='text-sm w-[220px]'>Archived</p>
        </li>
        <li className='hover:dark:bg-green hover:text-black hover:cursor-pointer flex flex-row gap-3 items-center pt-3 pb-3 pl-5' onClick={() => handleOptionSelect('Merged')}>
          <div className='w-[10px] h-[10px] rounded-full border-gray-700 border-[3px]' />
          <p className='text-sm w-[220px]'>Merged</p>
        </li>
      </ul>
    </div>
  )
}

export default MostVotedModal