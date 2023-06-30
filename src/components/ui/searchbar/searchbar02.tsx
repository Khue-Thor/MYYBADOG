"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRanking, rankingData } from "@/api/nftscan";
import Image from "next/image";
import LoadingSkeleton from "./skeleton";
import { HiBadgeCheck } from "react-icons/hi";
const SearchBar02 = ({ handleCloseSearchBar }: any) => {
  const [showSearch, setShowSearch] = useState(false);

  const [enteredWord, setEnteredWord] = useState("");
  const [collectionsData, setCollectionsData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [failedSearch, setFailedSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getCollectionsFallback(encodedWord: string) {
    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        next: {
          revalidate: 86400, // 24 hrs in sec
        },
      };
      const query = `/api/search/collection/${encodedWord}`;

      const res = await fetch(query, options);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setCollectionsData(data.contracts);
      return data.contracts;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCollections() {
    // Fetch collections data and update state
    try {
      setIsLoading(true);
      const encodedWord = encodeURIComponent(enteredWord);
      const query = `/api/collection/prisma/name/${encodedWord}`;
      const res = await fetch(query, { method: "GET" });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setCollectionsData(data.data);
      // TODO: Need to refresh with the proper query
      setIsLoading(false);
      if (data.data.length === 0) {
        setIsLoading(true);

        const fallbackData = await getCollectionsFallback(encodedWord);
        setIsLoading(false);
        if (fallbackData.length === 0) {
          setFailedSearch(true);
          return;
        } else {
          setFailedSearch(false);
          return;
        }
      }
    } catch (error) {
      setFailedSearch(true);
    }
  }

  async function getInitialCollections() {
    // fetch initial trending data to display before user searches
    try {
      // const data = await getRanking('volume_total');
      const query = `/api/collection/prisma/topvolume`;
      const res = await fetch(query, { method: "GET" });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setInitialData(result.data);
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
      setFailedSearch(false);
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
  };

  const handleClick = () => {
    setShowSearch(true);
  };

  const clearInput = () => {
    setCollectionsData([]);
    setEnteredWord("");
    setShowSearch(false);
    setFailedSearch(false);
    setIsLoading(false);
  };

  return (
    <form
      action="search"
      className="relative h-full w-full lg:hidden"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="bg-white dark:bg-jacarta-800 w-full border-none text-black dark:text-white pr-10 pl-20 h-[60px]"
        type="search"
        placeholder="Search"
        onChange={handleFilter}
        value={enteredWord}
        onClick={handleClick}
      />
      {isLoading ? (
        <div className="dark:bg-jacarta-700 bg-white text-black absolute z-10 drop-shadow-lg left-[0px] top-[55px] pt-3 w-full pb-[20px] rounded-2xl flex flex-col gap-1 pr-[10px] pl-[10px]">
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {showSearch && enteredWord.length < 3 && initialData.length > 1 && (
            <div className="dark:bg-jacarta-800 bg-white border-t-[1px] dark:border-white border-gray-600 text-black absolute z-10 left-[0px] top-[60px] pt-3 pb-[20px] w-full flex flex-col gap-1 pr-[10px] pl-[10px]">
              <span className="font-bold text-sm text-gray-600 p-3">
                FEATURED
              </span>
              {initialData.slice(0, 5).map((value: any) => {
                return (
                  <Link
                    key={value.address}
                    href={`/collection/eth-mainnet/${value.address}`}
                    prefetch={false}
                    onClick={clearInput}
                  >
                    <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                      <div className="flex gap-3 items-top">
                        <div className="relative">
                          <img
                            src={
                              value.openSeaMetadata.imageUrl ||
                              "/images/baddogs-error-v2-230x230.png"
                            }
                            alt="Image"
                            className="rounded-lg w-12 h-12"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex w-full flex-nowrap">
                            <span className="font-bold dark:text-white text-base">
                              {value.openSeaMetadata.collectionName.length > 20
                                ? value.openSeaMetadata.collectionName.slice(
                                    0,
                                    20
                                  ) + "..."
                                : value.openSeaMetadata.collectionName}
                            </span>
                            {(value.openSeaMetadata.safelistRequestStatus ||
                              value.openSeaMetadata.baddogs_verified) && (
                              <div
                                className="flex items-center justify-center rounded-full"
                                data-tippy-content="Verified Collection"
                              >
                                <svg
                                  className="h-6 w-6"
                                  style={{ color: "#1DA1F2" }}
                                  fill="none"
                                  viewBox="0 0 19 19"
                                  stroke="currentColor"
                                >
                                  <HiBadgeCheck />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-xs text-gray-700">
                            {value.totalSupply} items
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-sm text-gray-700">
                        {Number(value.openSeaMetadata.floorPrice).toFixed(3)}{" "}
                        ETH
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
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
                    onClick={clearInput}
                  >
                    <div className="p-1 dark:hover:bg-jacarta-600 hover:bg-gray-400 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                      <div className="flex gap-3 items-top">
                        <div className="relative">
                          <img
                            src={
                              value.openSeaMetadata.imageUrl ||
                              "/images/baddogs-error-v2-230x230.png"
                            }
                            alt="Image"
                            className="rounded-lg w-12 h-12"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex w-full flex-nowrap">
                            <span className="font-bold dark:text-white text-base">
                              {window.innerWidth < 420
                                ? value.openSeaMetadata.collectionName.slice(
                                    0,
                                    15
                                  ) + "..."
                                : window.innerWidth < 600
                                ? value.openSeaMetadata.collectionName.slice(
                                    0,
                                    20
                                  ) + "..."
                                : value.openSeaMetadata.collectionName}
                            </span>
                            {(value.openSeaMetadata.safelistRequestStatus ||
                              value.openSeaMetadata.baddogs_verified) && (
                              <div
                                className="flex items-center justify-center rounded-full"
                                data-tippy-content="Verified Collection"
                              >
                                <svg
                                  className="h-6 w-6"
                                  style={{ color: "#1DA1F2" }}
                                  fill="none"
                                  viewBox="0 0 19 19"
                                  stroke="currentColor"
                                >
                                  <HiBadgeCheck />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-xs text-gray-700">
                            {value.totalSupply} items
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-sm text-gray-700">
                        {Number(value.openSeaMetadata.floorPrice).toFixed(3)}{" "}
                        ETH
                      </span>
                    </div>
                  </Link>
                );
              })}
              <span className="font-bold text-sm text-gray-600 p-3">
                ACCOUNTS
              </span>
            </div>
          )}
          <span
            className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl cursor-pointer"
            onClick={handleCloseSearchBar}
          >
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
            <div className="dark:bg-jacarta-800 bg-white border-t-[1px] dark:border-white border-gray-600 text-black absolute z-10 left-[0px] top-[60px] pt-3 pb-[20px] w-full flex flex-col gap-1 pr-[10px] pl-[10px]">
              <span className="font-bold text-sm text-gray-600 p-3">
                {`Sorry, we couldn't find any collection with this name`}
              </span>
            </div>
          )}
        </>
      )}

      <span
        className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl"
        onClick={clearInput}
      >
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

export default SearchBar02;
