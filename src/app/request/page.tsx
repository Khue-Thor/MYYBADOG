"use client"
import React, { useState } from 'react'
import BdcoSkull from '@/components/ui/logo/bdco-skull';
import BdcoWhiteSkull from '@/components/ui/logo/bdco-white-skull';
import MostVotedModal from '@/components/ui/request/most-voted-modal';
import RequestModal from '@/components/ui/request/create-request-modal';
import UserRequest from '@/components/ui/request/user-request';
import UserRequestSearch from '@/components/ui/request/user-request-search';

const page = () => {
  const [mostVotedModalOpen, setMostVotedModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSearchOpen, setRequestSearchOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Most voted');

  // const handleToggleMostVotedModal = () => {
  //   setMostVotedModalOpen((prevOpen) => !prevOpen);
  // };

  const handleToggleMostVotedModal = () => {
    setMostVotedModalOpen(!mostVotedModalOpen);
  };

  const handleOptionSelect = (option: any) => {
    setButtonText(option);
  };

  const handleRequestSearchOpen = () => {
    setRequestSearchOpen(true);
  }
  return (
    <div className='flex justify-center md:pt-20 overflow-auto'>
      <div className='md:w-[660px] md:h-fit h-full w-full bg-accent-light md:rounded-md overflow-auto'>
        <div className='flex flex-col gap-2 m-10'>
          <div className='inline-block dark:hidden'>
            <BdcoSkull />
          </div>
          <div className='hidden dark:block'>
            <BdcoWhiteSkull />
          </div>

          <p className='text-sm'>
            Let us know how we can help you get the most value<br /> from BadDogs. Vote on existing ideas or suggest<br /> new ones.
          </p>
        </div>
        <div className='bg-accent-dark pt-4 pb-4 pl-10 pr-10 md:flex md:justify-between border-jacarta-400 border-t-[1px] border-b-[1px]'>
          <div className='flex gap-2'>
            {mostVotedModalOpen ? (
              <div className='hover:bg-jacarta-300 bg-jacarta-300 w-fit pt-1 pb-1 pl-4 pr-4 rounded-sm relative flex flex-row items-center gap-2' onClick={handleToggleMostVotedModal}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width={26}
                    height={26}
                    className={`h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer ${mostVotedModalOpen ? 'transform rotate-90 dark:fill-white' : ''
                      }`}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4.41 5.41L5.83 4 11.83 10 5.83 16 4.41 14.59 8.83 10 4.41 5.41z" />
                  </svg>
                </span>
                <button className='text-sm'>
                  {buttonText}
                </button>

                {mostVotedModalOpen && <MostVotedModal onOptionSelect={handleOptionSelect} />}
              </div>
            ) : (
              <div className='hover:bg-jacarta-300 w-fit pt-1 pb-1 pl-4 pr-4 rounded-sm relative flex flex-row items-center gap-2' onClick={handleToggleMostVotedModal}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width={26}
                    height={26}
                    className={`h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer ${mostVotedModalOpen ? 'transform rotate-90 dark:fill-white' : ''
                      }`}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4.41 5.41L5.83 4 11.83 10 5.83 16 4.41 14.59 8.83 10 4.41 5.41z" />
                  </svg>
                </span>
                <button className='text-sm'>
                  {buttonText}
                </button>
              </div>
            )}
            <div className='hover:bg-jacarta-300 w-fit pt-1 pb-1 pl-4 pr-4 rounded-sm flex flex-row gap-2 items-center' onClick={handleRequestSearchOpen}>
              <span
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width={26}
                  height={26}
                  className="fill-jacarta-500 h-[14px] w-[14px] dark:fill-jacarta-600  cursor-pointer"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                </svg>
              </span>
              <button className='text-sm'>Search</button>
            </div>
          </div>
          <button className='bg-green text-black text-sm md:pt-1 md:pb-1 md:pr-2 md:pl-2 md:relative md:right-0 md:mr-10 md:top-0 md:w-fit fixed bottom-[80px] left-10 w-[85%] pb-3 pt-3 rounded-sm' onClick={() => setRequestModalOpen(true)}>
            Request a Feature
          </button>
        </div>
        <div className='p-10 bg-accent flex flex-col gap-10'>
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
        </div>
      </div>
      {requestModalOpen && (
        <RequestModal handleClose={() => setRequestModalOpen(false)} />
      )}
      {requestSearchOpen && (
        <UserRequestSearch handleClose={() => setRequestSearchOpen(false)} />
      )}
    </div>
  )
}

export default page