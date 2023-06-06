/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow, incrementLimit, incrementStartToken } from "../../redux/counterSlice";
import { RootState } from '@/redux/store';

const CategoryItem = () => {
  const { sortedtrendingCategoryItemData } = useSelector<RootState, RootState['counter']>(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const loadMoreItems = () => {
    let startTokenValue = 0;
    if (sortedtrendingCategoryItemData.length === 30 && +sortedtrendingCategoryItemData[0].id !== 1) {
      startTokenValue = +sortedtrendingCategoryItemData[0].id + 30
    } else {
      startTokenValue = 30
    };
    dispatch(incrementStartToken(startTokenValue))
    dispatch(incrementLimit)
  }

  useEffect(() => {

    if (entry?.isIntersecting) {
      loadMoreItems()
    }
  }, [entry])


  return (
    <div>
      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {sortedtrendingCategoryItemData.map((item: any, index: number) => {
          if (sortedtrendingCategoryItemData.length === index + 1) {
            const {
              id,
              image,
              title,
              price,
              bidLimit,
              bidCount,
              likes,
              creator,
              owner,
              contractAddress,
              blockchain,
            } = item;
            return (
              <article ref={ref} key={id}>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                  <figure className="relative">
                    <Link href={`/${blockchain}/${contractAddress}/${id}`}>
                      {
                        <img
                          src={image || '/public/images/404.png'}
                          alt="item 5"
                          className="w-full h-[230px] rounded-[0.625rem] object-cover"
                        />
                      }

                    </Link>

                    <Likes like={likes} />

                    <div className="absolute left-3 -bottom-3">
                      <div className="flex -space-x-2">
                        <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                          <Tippy content={<span>creator: {creator.name}</span>}>
                            {
                              creator.image &&
                              <img
                                src={creator.image}
                                alt="creator"
                                className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                              />
                            }
                          </Tippy>

                        </Link>
                        <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                          <Tippy content={<span>creator: {owner.name}</span>}>
                            {
                              owner.image &&
                              <img
                                src={owner.image}
                                alt="owner"
                                // layout="fill"
                                className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                              />
                            }
                          </Tippy>

                        </Link>
                      </div>
                    </div>
                  </figure>
                  <div className="mt-7 flex items-center justify-between">
                    <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                        {title}
                      </span>

                    </Link>

                    {/* auction dropdown  */}
                    <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " />
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                      {price}
                    </span>
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      {bidCount}/{bidLimit}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      className="text-accent font-display text-sm font-semibold"
                      onClick={() => dispatch(buyModalShow())}
                    >
                      Buy now
                    </button>
                    <Link href={`/${blockchain}/${contractAddress}/${id}`} className="group flex items-center">

                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                        View History
                      </span>

                    </Link>
                  </div>
                </div>
              </article>

            );
          }
          const {
            id,
            image,
            title,
            price,
            bidLimit,
            bidCount,
            likes,
            creator,
            owner,
            contractAddress,
            blockchain
          } = item;
          return (
            <article key={id}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <figure className="relative">
                  <Link href={`/${blockchain}/${contractAddress}/${id}`}>
                    {
                      image &&
                      <img
                        src={image || '/public/images/404.png'}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                      />
                    }

                  </Link>

                  <Likes like={likes} />

                  <div className="absolute left-3 -bottom-3">
                    <div className="flex -space-x-2">
                      <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                        <Tippy content={<span>creator: {creator.name}</span>}>
                          {
                            creator.image &&
                            <img
                              src={creator.image}
                              alt="creator"
                              className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                            />
                          }
                        </Tippy>

                      </Link>
                      <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                        <Tippy content={<span>creator: {owner.name}</span>}>
                          {
                            owner.image &&
                            <img
                              src={owner.image}
                              alt="owner"
                              // layout="fill"
                              className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                            />
                          }
                        </Tippy>

                      </Link>
                    </div>
                  </div>
                </figure>
                <div className="mt-7 flex items-center justify-between">
                  <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                    <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                      {title}
                    </span>

                  </Link>

                  {/* auction dropdown  */}
                  <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " />
                </div>
                <div className="mt-2 text-sm">
                  <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                    {price}
                  </span>
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    {bidCount}/{bidLimit}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    className="text-accent font-display text-sm font-semibold"
                    onClick={() => dispatch(buyModalShow())}
                  >
                    Buy now
                  </button>
                  <Link href={`/${blockchain}/${contractAddress}/${id}`} className="group flex items-center">

                    <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                      <use xlinkHref="/icons.svg#icon-history"></use>
                    </svg>
                    <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                      View History
                    </span>

                  </Link>
                </div>
              </div>
            </article>

          );
        })}
      </div>
      {/* <button
        className="w-1/4 text-accent font-display text-base font-semibold margin-auto mt-8"
        onClick={loadMoreItems}
      >
        Load More
      </button> */}
    </div>
  );
};

export default CategoryItem;
