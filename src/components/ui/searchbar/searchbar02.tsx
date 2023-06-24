"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRanking, rankingData } from '@/api/nftscan';
import Image from "next/image";
const SearchBar02 = ({ handleCloseSearchBar }: any) => {

  const [showSearch, setShowSearch] = useState(false);

  const [enteredWord, setEnteredWord] = useState('');
  const [collectionsData, setCollectionsData] = useState([]);
  const [initialData, setInitialData] = useState<rankingData[]>([]);
  const [failedSearch, setFailedSearch] = useState(false);

  async function getCollections() {
    // Fetch collections data and update state
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      };

      // TODO: Need to refresh with the proper query
      const encodedWord = encodeURIComponent(enteredWord);
      const query = `/api/search/collection/${encodedWord}`;

      const res = await fetch(query, options);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      if (data.contracts.length === 0) {
        setFailedSearch(true);
      } else {
        setFailedSearch(false);
      }
      setCollectionsData(data.contracts);
    } catch (error) {
      setFailedSearch(true);
    }
  }

  async function getInitialCollections() {
    // fetch initial trending data to display before user searches
    try {
      const data = await getRanking('volume_total');
      setInitialData(data);
    } catch (error) {
      setInitialData([]);
    }
  }

  useEffect(() => {
    getInitialCollections();
  }, []);

  useEffect(() => {
    if (enteredWord.length >= 3) {
      getCollections();
    }
    if (enteredWord.length < 3 && enteredWord.length > 0) {
      setShowSearch(true);
    }
  }, [enteredWord]);

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    setEnteredWord(searchWord);
  };

  const handleClose = () => {
    setShowSearch(false);
    setFailedSearch(false);
  }

  const handleClick = () => {
    setShowSearch(true);
  };

  const clearInput = () => {
    setCollectionsData([]);
    setEnteredWord('');
    setShowSearch(false);
    setFailedSearch(false);
  };

  return (
    <form action="search" className="relative h-full w-full lg:hidden" onSubmit={(e) => e.preventDefault()}>
      <input className="bg-white dark:bg-jacarta-800 w-full border-none text-black dark:text-white pr-10 pl-20 h-[60px]" type="search" placeholder="Search" onChange={handleFilter}
        value={enteredWord} onClick={handleClick} />
      {showSearch && enteredWord.length < 3 && initialData.length > 1 && (
        <div className="dark:bg-jacarta-800 bg-white border-t-[1px] dark:border-white border-gray-600 text-black absolute z-10 left-[0px] top-[60px] pt-3 pb-[20px] w-full flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className="absolute top-5 right-4 text-gray-500 hover:text-gray-800 font-bold" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width={26}
              height={26}
              className="fill-jacarta-500 h-4 w-4 dark:fill-white cursor-pointer"

            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </span>

          <span className="font-bold text-sm text-gray-600 p-3">FEATURED</span>
          <span className="font-bold text-sm text-gray-600 p-3">
            COLLECTIONS
          </span>
          {initialData.slice(0, 5).map((value: rankingData) => {
            return (
              <Link key={value.contract_addres} href={`/collection/eth-mainnet/${value.contract_address}`} prefetch={false} onClick={handleCloseSearchBar}>
                <div className="p-1 hover:bg-gray-500 dark:hover:bg-jacarta-600 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                  <div className="flex gap-3 items-top">
                    <Image src={value.logo_url}
                      alt="Image"
                      width={9}
                      height={9}
                      className="rounded-lg w-9 h-9" />
                    <div className="flex flex-col">
                      <span className="font-bold dark:text-white md:text-base text-sm"> {value.contract_name}</span>
                      <span className='font-medium text-xs text-gray-700'>{value.totalSupply} items</span>
                    </div>
                  </div>
                  <span className="font-medium sm:text-sm text-gray-700 text-xs"> {value.items_total} ETH</span>
                </div>
              </Link>
            );
          })}
          <span className='font-bold text-sm text-gray-600 p-3'>ACCOUNTS</span>
        </div>
      )}
      {enteredWord.length == 0 ? (
        <span></span>
      ) : (
        <span className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl" onClick={clearInput}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width={26}
            height={26}
            className="fill-jacarta-500 h-4 w-4 dark:fill-white cursor-pointer"

          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </span>
      )}

      {enteredWord.length >= 3 && collectionsData.length !== 0 && (
         <div className="dark:bg-jacarta-800 bg-white border-t-[1px] dark:border-white border-gray-600 text-black absolute z-10 left-[0px] top-[60px] pt-3 pb-[20px] w-full flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className="font-bold text-sm text-gray-600 p-3">
            COLLECTIONS
          </span>
          {collectionsData.slice(0, 5).map((value: any) => {
            return (
              <Link
                key={value.address}
                href={`/collection/eth-mainnet/${value.address}`}
                prefetch={false}
                onClick={handleCloseSearchBar}
              >
                <div className="p-1 dark:hover:bg-jacarta-600  hover:bg-gray-400 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                  <div className="flex gap-3 items-top">
                    <Image src={value.openSeaMetadata.imageUrl}
                      alt="Image"
                      width={9}
                      height={9}
                      className="rounded-lg w-9 h-9" />
                    <div className="flex flex-col">
                      <span className="font-bold dark:text-white text-base w-[150px]">
                        {value.openSeaMetadata.collectionName}
                      </span>
                      <span className="font-medium text-xs text-gray-700">
                        {value.totalSupply} items
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-sm text-gray-700">
                    {value.openSeaMetadata.floorPrice} ETH
                  </span>
                </div>
              </Link>
            );
          })}
          <span className="font-bold text-sm text-gray-600 p-3">ACCOUNTS</span>
        </div>
      )}

      <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl cursor-pointer" onClick={handleCloseSearchBar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          className="fill-jacarta-500 h-10 w-10 dark:fill-gray-700 transform rotate-180"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4.41 5.41L5.83 4 11.83 10 5.83 16 4.41 14.59 8.83 10 4.41 5.41z" />
        </svg>
      </span>
      {failedSearch && (
        <div className="dark:bg-jacarta-700 bg-white text-black absolute z-10 drop-shadow-lg left-[0px] top-[55px] pt-3 w-full pb-[20px] rounded-2xl flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className="font-bold text-sm text-gray-600 p-3">
            {`Sorry, we couldn't find any collection with this name`}
          </span>
        </div>
      )}
    </form>
  )
}

export default SearchBar02;