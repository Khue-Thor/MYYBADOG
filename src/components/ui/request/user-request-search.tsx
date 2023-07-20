import React from 'react'

const UserRequestSearch = ({ handleClose }) => {
  return (
    <div className='fixed w-full top-0 left-0 md:bg-black md:bg-opacity-70 bg-jacarta-900 h-full md:flex md:justify-center md:items-center z-40'>
      <div className='relative md:top-[-150px]'>
        <span
          className="md:absolute right-[-50px] top-[-50px] md:flex hidden backdrop:items-center md:justify-center rounded-2xl"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width={26}
            height={26}
            className="fill-jacarta-500 xl:w-[40px] lg:h-[35px] lg:w-[35px] md:w-[30px] md:h-[30px] dark:fill-jacarta-400 hover:dark:fill-white cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
        <div className='md:w-[580px] w-full dark:bg-jacarta-700 md:p-6 border-jacarta-500 border-b-[1px] md:border-0 p-[22.5px] md:rounded-lg flex'>
          <span
            className="md:hidden flex justify-center items-center dark:bg-jacarta-600 rounded-tl-md rounded-bl-md pl-3"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width={26}
              height={26}
              className="fill-jacarta-500 h-[15px] w-[15px] dark:fill-jacarta-400 hover:dark:fill-white cursor-pointer"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19z" />
            </svg>
          </span>
          <input className='w-full text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 md:rounded-lg rounded-tr-md rounded-br-md border py-[0.6875rem] dark:border-transparent dark:bg-jacarta-600 dark:text-white dark:placeholder-white pt-[10px] pb-[10px] px-5 placeholder:text-sm placeholder:text-jacarta-600 outline-0' placeholder='Search...' />
        </div>
      </div>
    </div>
  )
}

export default UserRequestSearch