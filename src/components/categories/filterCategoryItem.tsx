import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";
import { usePathname } from "next/navigation";
import CategoryItem from "./categoryItem";
import { RootState } from "@/redux/store";
import OneCategoryItem from "./oneCategoryItem";
import { CollectionItemSkeleton } from '../CollectionItemSkeleton';

type Item = {
  id: number;
  image: string;
  title: string;
  price: string;
  bidLimit: string;
  bidCount: string;
  likes: string;
  creator: string;
  owner: {
    name: string;
    image: string;
  };
  contractAddress: string;
  blockchain: string;
};

const initialItem = {
  id: 0,
  image: "",
  title: "",
  price: "",
  bidLimit: "",
  bidCount: "",
  likes: "",
  creator: "",
  owner: {
    name: "",
    image: "",
  },
  contractAddress: "",
  blockchain: "",
};

const FilterCategoryItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = usePathname();
  const dispatch = useDispatch();
  const { startToken, limit } = useSelector<RootState, RootState["counter"]>(
    (state) => state.counter
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<Item | null>(initialItem);

  const id = params.split("/")[4];
  const contract_address = params.split("/")[3].replace(`/${id}`, "");
  const blockchain = params
    .split("/")[2]
    .replace(`/${contract_address}/${id}`, "");

  const formatItem = (item: any) => ({
    id: item.tokenId,
    image: item.image.cachedUrl,
    title: item.name || `#${item.tokenId}`,
    price: "SetPrice" + " ETH",
    sortPrice: String(Math.floor(Math.random() * 100) + 1),
    bidLimit: String(Math.floor(Math.random() * 10) + 1),
    bidCount: String(Math.floor(Math.random() * 10) + 1),
    likes: String(Math.floor(Math.random() * 100) + 1),
    creator: "Creator",
    owner: {
      name: "owner",
      image: "",
    },
    addDate: new Date().toISOString(),
    category: "Replace with item category",
    contractAddress: contract_address,
    blockchain: blockchain,
  });

  const fetchOneItem = async (token: number) => {
    // const urlV3 = `https://${blockchain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //   },
    // };
    try {
      //   const response = await fetch(
      //     `${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=${token}&limit=${token}`,
      //     options
      //   );
      //   const data = await response.json();
      const options: RequestInit = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        next: {
          revalidate: 86400, // 24 hrs in sec 
        }
      };
      const response = await fetch(`/api/collection/items/singlenft/${blockchain}/${contract_address}/${token}`, options)
      console.log('response', response);

      const item = await response.json();
      console.log('item', item);

      return formatItem(item);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchTrendingCategoryData = async () => {
    if (startToken === 1) {
      setIsLoading(true);
    }
    const urlV3 = `https://${blockchain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(
      `${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=${startToken}&limit=${limit}`,
      options
    );
    const data = await response.json();
    const list = data.nfts || [];

    const formattedList = list?.map((item: any) => formatItem(item));

    dispatch(updateTrendingCategoryItemData(formattedList));
    if (isLoading) setIsLoading(false);
  };

  useEffect(() => {
    fetchTrendingCategoryData();
  }, [startToken]);

  useEffect(() => {
    if (searchInput.length > 0) {
      fetchOneItem(+searchInput).then((item) => {
        setSearchResult(item);
      });
    } else {
      setSearchResult(null);
    }
  }, [searchInput]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">

      {/* <!-- Filter --> */}
      {/* <Collection_category_filter /> */}
      <input
        type="search"
        className="text-center text-jacarta-700 placeholder-jacarta-500 mb-10 focus:ring-accent border-jacarta-100 w-1/4 rounded-2xl border py-[0.6875rem] px-4 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
        placeholder="Search for tokenId"
        value={searchInput}
        onChange={handleSearch}
      />
      <button
        type="submit"
        className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl"
      ></button>
      <div className="flex flex-col justify-center items-center">

        {isLoading ? (
          // Loading skeleton
          <CollectionItemSkeleton />
        ) : (
          searchInput.length > 0 ? (
            <OneCategoryItem item={searchResult} />
          ) : (
            <CategoryItem />
          )
        )}
      </div>
    </div >
  );
};

export default FilterCategoryItem;
