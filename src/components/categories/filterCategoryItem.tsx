import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementStartToken,
  updateTrendingCategoryItemData,
} from "../../redux/counterSlice";
import { usePathname } from "next/navigation";
import CategoryItem from "./categoryItem";
import { RootState } from "@/redux/store";
import OneCategoryItem from "./oneCategoryItem";
import { CollectionItemSkeleton } from "../CollectionItemSkeleton";
import { Data } from "@/api/nftscan";
import { NFTMetaData } from "@/api/alchemy";

interface params {
  params: {
    contract_address: string;
    profile: Data;
  };
}

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

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
  next: {
    revalidate: 86400, // 24 hrs in sec
  },
};

const FilterCategoryItem = ({ params }: params) => {
  const [isLoading, setIsLoading] = useState(true);
  const { contract_address } = params;
  const urlParams = usePathname();
  const dispatch = useDispatch();
  const { startToken, limit } = useSelector<RootState, RootState["counter"]>(
    (state) => state.counter
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<Item | null>(initialItem);

  const id = urlParams.split("/")[4];
  // const contract_address = urlParams.split("/")[3].replace(`/${id}`, "");
  const blockchain = urlParams
    .split("/")[2]
    .replace(`/${contract_address}/${id}`, "");

  const formatItem = (item: any) => ({
    id: item.tokenId || "1",
    image: item.image.thumbnailUrl || "",
    title: item.name || `#${item.tokenId}` || "",
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
    try {
      const response = await fetch(
        `/api/collection/items/singlenft/${blockchain}/${contract_address}/${token}`,
        options
      );

      const item = await response.json();

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
    const data = await fetch(
      `/api/collection/items/fetch32/${blockchain}/${contract_address}/${startToken}/${limit}`,
      options
    );

    const list = await data.json();
    const formattedList = list?.map((item: any) => formatItem(item));

    dispatch(updateTrendingCategoryItemData(formattedList));
    if (isLoading) setIsLoading(false);
  };

  useEffect(() => {
    fetchTrendingCategoryData();
  }, [startToken]);

  //  this cleans up state on unmount to prevent errors when collection comes with null props
  useEffect(() => {
    return () => {
      if (startToken === 1) {
        dispatch(incrementStartToken(0));
      }
    };
  }, []);

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
        ) : searchInput.length > 0 ? (
          <OneCategoryItem
            params={{ item: searchResult, profile: params.profile }}
          />
        ) : (
          <CategoryItem params={{ profile: params.profile }} />
        )}
      </div>
    </div>
  );
};

export default FilterCategoryItem;
