import React from 'react'

const UserRequestSearch = ({ handleClose }) => {
  return (
    <div className='fixed w-full top-0 left-0 bg-black bg-opacity-70 h-full flex justify-center items-center z-40'>
      <div className='relative top-[-150px]'>
        <span
          className="absolute right-[-50px] top-[-50px] flex backdrop:items-center justify-center rounded-2xl"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width={26}
            height={26}
            className="fill-jacarta-500 h-[50px] w-[50px] dark:fill-jacarta-400 hover:dark:fill-white cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
        <div className='w-[500px] dark:bg-jacarta-700 p-4 rounded-xl'>
          <input className='w-full text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 rounded-xl border py-[0.6875rem] dark:border-transparent dark:bg-jacarta-500 dark:text-white dark:placeholder-white pt-2 pb-2 px-5' placeholder='Search...' />
        </div>
      </div>
    </div>
  )
}

export default UserRequestSearch