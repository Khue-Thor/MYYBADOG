"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Likes from "../likes";
import useModalStore from "@/store/modalStore";
import { NFTMetaData } from "@/api/alchemy";
import React from "react";

type Props = {
  nfts: NFTMetaData[];
  blockchain: string;
  contractAddress: string;
};

const BidsCarousel: React.FC<Props> = ({
  nfts,
  blockchain,
  contractAddress,
}) => {
  const showBidsModal = useModalStore((state) => state.showBidsModal);

  const data: (NFTMetaData & { likes: number; bid: number })[] = nfts.map(
    (nft) => ({
      ...nft,
      likes: 128,
      bid: nft.contract.openSeaMetadata.floorPrice + 0.3,
    })
  );

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {data.map((item) => {
          return (
            <SwiperSlide className="text-white" key={item.tokenId}>
              <article>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                  <figure>
                    <Link
                      href={`/${blockchain}/${contractAddress}/${item.tokenId}`}
                    >
                      <div className="w-full">
                        <Image
                          src={item.image.pngUrl}
                          alt={item.name || ""}
                          height={230}
                          width={230}
                          className="rounded-[0.625rem] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </figure>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`${blockchain}/${contractAddress}/${item.tokenId}`}
                    >
                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                        {item.name}
                      </span>
                    </Link>
                    <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                      <Tippy content={<span>ETH</span>}>
                        <img
                          src="/images/eth-icon.svg"
                          alt=""
                          className="w-3 h-3 mr-1"
                        />
                      </Tippy>

                      <span className="text-green text-sm font-medium tracking-tight">
                        {item.contract.openSeaMetadata.floorPrice} ETH
                      </span>
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      Current Bid{" "}
                    </span>
                    <span className="dark:text-jacarta-100 text-jacarta-700">
                      {item.bid.toFixed(2)} ETH
                    </span>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      className="text-accent font-display text-sm font-semibold"
                      onClick={showBidsModal}
                    >
                      Place bid
                    </button>

                    <Likes
                      like={item.likes}
                      classes="flex items-center space-x-1"
                    />
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div className="group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default BidsCarousel;
