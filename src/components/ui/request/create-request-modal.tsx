import React, { useEffect } from 'react';

const RequestModal = ({ handleClose }) => {
  useEffect(() => {
    // Add "overflow-hidden" class to the body when the modal is open
    document.body.classList.add('overflow-hidden');

    // Remove "overflow-hidden" class from the body when the modal is closed
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <div className='fixed w-full top-0 left-0 bg-black bg-opacity-70 h-full flex justify-center items-center z-40'>
      <div className='relative'>
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
        <div className='w-[660px] h-[500px] bg-white dark:bg-jacarta-800 rounded-md relative'>
          <h1 className='border-b-[1px] p-5 text-center border-jacarta-500'>Request a Feature</h1>
          <div className='p-10 flex flex-col gap-10'>
            <div>
              <h2>Title</h2>
              <input className='w-full dark:bg-jacarta-600 rounded-md pt-2 pb-2 text-jacarta-200 pr-4 pl-4 font-normal text-sm' placeholder='A short, description title' />
            </div>
            <div>
              <h2>Detials</h2>
              <textarea className='w-full dark:bg-jacarta-600 h-[150px] rounded-md text-jacarta-200 font-normal text-sm' placeholder='Please include only one suggestion per post' />

            </div>
            <div>
              <button className='bg-green w-fit pt-1 pb-2 pr-3 pl-3 text-sm rounded-md text-black'>Create post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestModal