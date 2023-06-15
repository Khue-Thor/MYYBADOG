"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const SearchBar02 = ({ handleCloseSearchBar }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQueary = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQueary}`)
    console.log("current query", encodedSearchQueary);
  }

  const [filteredData, setFilteredData] = useState([]);
  const [enteredWord, setEnteredWord] = useState([]);
  const [collectionsData, setCollectionsData] = useState([]);

  useEffect(() => {
    getCollections();
  }, []);

  async function getCollections() {
    // Fetch collections data and update state
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        next: {
          revalidate: 86400, // 24 hrs in sec 
        }
      };

      // TODO: Need to refresh with the proper query
      const query = "bad";
      // console.log(`enteredWord ${enteredWord}`);

      // const res = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/searchContractMetadata?query=bored`, options);
      const res = await fetch(`/api/search/collection/${query}`, options);


      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setFilteredData(data.contracts);
    } catch (error) {
      console.error(error);
    }
  }
  
  // filter and autocomplete for the search bar
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setEnteredWord(searchWord);
    const newFilter = filteredData.filter((value) => {
      return value.openSeaMetadata.collectionName.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setCollectionsData([])
    } else {
      setCollectionsData(newFilter);
    }
  };
  // filter and autocomplete for the search bar end***

  const clearInput = () => {
    setCollectionsData([]);
    setEnteredWord([]);
  };

  return (
    <form action="search" className="relative h-full w-full lg:hidden">
      <input className="bg-white dark:bg-jacarta-800 w-full border-none text-black dark:text-white pr-10 pl-20 h-[60px]" type="search" placeholder="Search" onChange={handleFilter}
        value={enteredWord} />
      {enteredWord.length >= 3 && collectionsData.length !== 0 && (
        <div className="dark:bg-jacarta-800 bg-white border-t-[1px] dark:border-white border-gray-600 text-black absolute z-10 left-[0px] top-[60px] pt-3 pb-[20px] w-full flex flex-col gap-1 pr-[10px] pl-[10px]">
          <span className='font-bold text-sm text-gray-600 p-3'>COLLECTIONS</span>
          {collectionsData.slice(0, 5).map((value) => {
            return (
              <div key={value.address} className="p-1 hover:bg-gray-500 dark:hover:bg-jacarta-600 hover:rounded-xl flex justify-between pr-3 pl-3 pt-2 pb-2 cursor-pointer">
                <div className="flex gap-3 items-top">
                  <img src={value.openSeaMetadata.imageUrl} alt="Image" className="rounded-lg w-9 h-9" />
                  <div className="flex flex-col">
                    <span className="font-bold dark:text-white md:text-base text-sm">{value.openSeaMetadata.collectionName}</span>
                    <span className='font-medium text-xs text-gray-700'>{value.totalSupply} items</span>
                  </div>
                </div>
                <span className="font-medium sm:text-sm text-gray-700 text-xs">{value.openSeaMetadata.floorPrice} ETH</span>
              </div>
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
    </form>
  )
}

export default SearchBar02