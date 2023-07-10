"use client"
import React, { useState } from 'react'
import BdcoSkull from '@/components/ui/logo/bdco-skull';
import BdcoWhiteSkull from '@/components/ui/logo/bdco-white-skull';
import MostVotedModal from '@/components/ui/request/most-voted-modal';
import RequestModal from '@/components/ui/request/request-modal';
import UserRequest from '@/components/ui/request/user-request';

const page = () => {
  const [mostVotedModalOpen, setMostVotedModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  // const handleToggleMostVotedModal = () => {
  //   setMostVotedModalOpen((prevOpen) => !prevOpen);
  // };

  const handleToggleMostVotedModal = () => {
    setMostVotedModalOpen(!mostVotedModalOpen);
  };
  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[660px] bg-accent-light rounded-md'>
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
        <div className='bg-accent-dark pt-4 pb-4 pl-10 pr-10 flex justify-between border-jacarta-400 border-t-[1px] border-b-[1px]'>
          <div className='flex gap-5'>
            <div className='hover:bg-gray-700 w-fit pt-1 pb-1 pl-3 pr-3 rounded-sm relative flex flex-row items-center gap-2'>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width={26}
                  height={26}
                  className={`fill-jacarta-500 h-[20px] w-[20px] dark:fill-jacarta-600 cursor-pointer ${mostVotedModalOpen ? 'transform rotate-90' : ''}`}
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M4.41 5.41L5.83 4 11.83 10 5.83 16 4.41 14.59 8.83 10 4.41 5.41z" />
                </svg>
              </span>

              <button className='text-sm' onClick={handleToggleMostVotedModal}>
                Most voted
              </button>

              {mostVotedModalOpen && <MostVotedModal />}
            </div>

            <div className='hover:bg-gray-700 w-fit p-1 rounded-sm'>
              <button className='text-sm'>Search</button>
            </div>
          </div>
          <button className='bg-green text-black text-sm pt-1 pb-1 pr-2 pl-2 rounded-sm' onClick={() => setRequestModalOpen(true)}>
            Request a Feature
          </button>
        </div>
        <div className='p-10 bg-accent flex flex-col gap-10'>
          <UserRequest title={"Additional sorting and searching functionality for historical "} details={"Add additional search and sort functionality to highlight information line mint / creation date on NFTs for the purposes of highlighting elements valued for the historical NFT community"} />
        </div>
      </div>
      {requestModalOpen && (
        <RequestModal handleClose={() => setRequestModalOpen(false)} />
      )}
    </div>
  )
}

export default page