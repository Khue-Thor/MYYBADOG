import React, { useState, useEffect } from 'react';

const RequestModal = ({ handleClose }) => {
  useEffect(() => {
    // Add "overflow-hidden" class to the body when the modal is open
    document.body.classList.add('overflow-hidden');

    // Remove "overflow-hidden" class from the body when the modal is closed
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const [titleValue, setTitleValue] = useState("");
  const [detialValue, setDetialValue] = useState("");

  const handleTitleValue = (e: any) => {
    setTitleValue(e.target.value);
  }

  const handleDetailValue = (e: any) => {
    setDetialValue(e.target.value);
  }

  const handleRequestSubmit = (e: any) => {
    e.preventDefault();
    handleClose()
  }

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 md:flex md:justify-center md:items-center z-40`}>
      <div className={`relative h-full md:h-fit`}>
        <span
          className="absolute right-[-50px] top-[-50px] md:flex hidden backdrop:items-center justify-center rounded-2xl"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width={26}
            height={26}
            className="fill-jacarta-500 xl:h-[40px] xl:w-[40px] lg:h-[35px] lg:w-[35px] md:w-[30px]  md:h-[30px] dark:fill-jacarta-400 hover:dark:fill-white cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
        <div className='md:w-[660px] md:h-[530px] h-full w-full bg-white dark:bg-jacarta-800 rounded-md relative'>
          <div className='relative'>
            <span
              className="md:hidden absolute left-5 top-6 flex backdrop:items-center justify-center rounded-2xl"
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
            <h1 className='border-b-[1px] p-5 text-center border-jacarta-500'>Request a Feature</h1>
          </div>
          <form className='p-10 flex flex-col gap-10'>
            <fieldset>
              <h2 className='mb-2'>Title</h2>
              <input className='w-full dark:bg-jacarta-600 rounded-md pt-3 pb-3 text-jacarta-200 pr-4 pl-4 font-normal text-sm' placeholder='A short, description title' value={titleValue} onChange={handleTitleValue} />
            </fieldset>
            <fieldset>
              <h2 className='mb-2'>Details</h2>
              <textarea className='w-full dark:bg-jacarta-600 h-[170px] rounded-md text-jacarta-200 font-normal text-sm' placeholder='Please include only one suggestion per post' value={detialValue} onChange={handleDetailValue} />
            </fieldset>
            <div>
              <button className='bg-green w-fit pt-1 pb-2 pr-3 pl-3 text-sm rounded-md text-black' onClick={handleRequestSubmit}>Create post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestModal