import Link from "next/link";
import React, { useEffect, useState } from "react";
import featureCollectionsData, {
  FeatureCollectionsItem,
} from "@/data/Feature_collections_data";
import { useAppSelector } from "@/hooks/useAppSelector";

type Props = {
  itemFor: string;
};

const ExploreCollectionItem: React.FC<Props> = ({ itemFor }) => {
  const sortedCollectionData = useAppSelector(
    (state) => state.counter.sortedCollectionData
  );

  const [itemData, setItemData] = useState<FeatureCollectionsItem[]>([]);

  useEffect(() => {
    if (itemFor === "userPage") {
      setItemData(featureCollectionsData.slice(0, 4));
      console.log(itemData);
    } else {
      setItemData(sortedCollectionData);
    }
  }, [sortedCollectionData, itemFor]);

  return (
    <>
      {itemData.map((item) => {
        const {
          id,
          bigImage,
          subImage1,
          subImage2,
          subImage3,
          userImage,
          title,
          itemsCount,
          userName,
        } = item;
        return (
          <article key={id}>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <Link
                href="/collection/avatar_1"
                className="flex space-x-[0.625rem]"
              >
                <span className="w-[74.5%]">
                  <img
                    src={bigImage}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                </span>
                <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                  <img
                    src={subImage1}
                    alt="item 1"
                    className="h-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                  <img
                    src={subImage2}
                    alt="item 1"
                    className="h-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                  <img
                    src={subImage3}
                    alt="item 1"
                    className="h-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                </span>
              </Link>

              <Link
                href="/collection/avatar_1"
                className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white"
              >
                {title}
              </Link>

              <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                  <Link href="/user/avatar_6" className="mr-2 shrink-0">
                    <img
                      src={userImage}
                      alt="owner"
                      className="h-5 w-5 rounded-full"
                    />
                  </Link>
                  <span className="dark:text-jacarta-400 mr-1">by</span>
                  <Link href="/user/avatar_6" className="text-accent">
                    {userName}
                  </Link>
                </div>
                <span className="dark:text-jacarta-300 text-sm">
                  {itemsCount} Items
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default ExploreCollectionItem;