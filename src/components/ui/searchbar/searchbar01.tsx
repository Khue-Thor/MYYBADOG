'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRanking, rankingData } from '@/api/nftscan';
const SearchBar01 = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [enteredWord, setEnteredWord] = useState('');
  const [collectionsData, setCollectionsData] = useState([]);
  const [initialData, setInitialData] = useState<rankingData[]>([]);
  const [failedSearch, setFailedSearch] = useState(false);

  async function getCollectionsFallback(encodedWord: string) {
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        next: {
          revalidate: 86400, // 24 hrs in sec
        },
      };
      const query = `/api/search/collection/${encodedWord}`;

      const res = await fetch(query, options);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setCollectionsData(data.contracts);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCollections() {
    // Fetch collections data and update state
    try {

      const encodedWord = encodeURIComponent(enteredWord);
      const query = `/api/collection/prisma/name/${encodedWord}`;
      const res = await fetch(query, { method: 'GET' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log('data', data.data);

      setCollectionsData(data.data);
      // TODO: Need to refresh with the proper query

      if (data.data.length === 0) {

        const fallbackData = await getCollectionsFallback(encodedWord);
        if (fallbackData.length === 0) {
          setFailedSearch(true);
          return
        } else {
          setFailedSearch(false);
          return
        }
      }
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
    <form
      action="search"
      className="relative hidden ml-3 basis-3/12 lg:block xl:ml-[8%]"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="search"
        className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 xl:w-[430px] w-[380px] rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
        placeholder="Search"
        onChange={handleFilter}
        onClick={handleClick}
        value={enteredWord}
      />
      {showSearch && enteredWord.length < 3 && initialData.length > 1 && (
        <div className="dark:bg-jacarta-700  bg-white text-black absolute z-10 drop-shadow-lg left-[0px] top-[55px] pt-3 w-full pb-[20px]  rounded-2xl flex flex-col gap-1 pr-[10px] pl-[10px]">
          <button
            className="absolute top-5 right-4 text-gray-500 hover:text-gray-800 font-bold"
            onClick={handleClose}
          >
            X
          </button>
          <span className="font-bold text-sm text-gray-600 p-3">FEATURED</span>
          <span className="font-bold text-sm text-gray-600 p-3">
            COLLECTIONS
          </span>
          {initialData.slice(0, 5).map((value: rankingData) => {
            return (
              <Link
                key={value.contract_address}
                href={`/collection/eth-mainnet/${value.contract_address}`}
                prefetch={false}
                onClick={clearInput}
              >
                <div className="p-1 dark:hover:bg-jacarta-600  hover:bg-gray-400 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                  <div className="flex gap-3 items-top">
                    <img
                      src={value.logo_url}
                      alt="Image"
                      className="rounded-lg w-9 h-9"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold dark:text-white text-base w-[150px]">
                        {value.contract_name}
                      </span>
                      <span className="font-medium text-xs text-gray-700">
                        {value.items_total} items
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-sm text-gray-700">
                    {value.floor_price} ETH
                  </span>
                </div>
              </Link>
            );
          })}
          <span className="font-bold text-sm text-gray-600 p-3">ACCOUNTS</span>
        </div>
      )}

      {enteredWord.length >= 3 && collectionsData && collectionsData.length !== 0 && (
        <div className="dark:bg-jacarta-700  bg-white text-black absolute z-10 drop-shadow-lg left-[0px] top-[55px] pt-3 w-full pb-[20px]  rounded-2xl flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className="font-bold text-sm text-gray-600 p-3">
            COLLECTIONS
          </span>
          {collectionsData.slice(0, 5).map((value: any) => {
            return (
              <Link
                key={value.address}
                href={`/collection/eth-mainnet/${value.address}`}
                prefetch={false}
                onClick={clearInput}
              >
                <div className="p-1 dark:hover:bg-jacarta-600  hover:bg-gray-400 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                  <div className="flex gap-3 items-top">
                    <img
                      src={value.openSeaMetadata.imageUrl}
                      alt="Image"
                      className="rounded-lg w-9 h-9"
                    />
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

      <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          className="fill-jacarta-500 h-4 w-4 dark:fill-white"
        >
          <path
            fill="none"
            d="M0 0h24v24H0z"
          />
          <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
        </svg>
      </span>

      {failedSearch && (
        <div className="dark:bg-jacarta-700 bg-white text-black absolute z-10 drop-shadow-lg left-[0px] top-[55px] pt-3 w-full pb-[20px] rounded-2xl flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className="font-bold text-sm text-gray-600 p-3">
            {`Sorry, we couldn't find any collection with this name`}
          </span>
        </div>
      )}
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
    </form>
  );
};

export default SearchBar01;
