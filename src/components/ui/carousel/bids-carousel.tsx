"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { bidsData } from "@/data/bids_data";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
// import { bidsModalShow } from "../../redux/counterSlice";
// import { useDispatch } from "react-redux";
import Likes from "@/components/likes";
import { use, useState, useEffect } from "react";
import { supabase } from "@/lib/client";
import Countdown from "react-countdown";

export const revalidate = 60;

// async function getData() {
//   const { data, error } = await supabase
//     .from("raffles") // the table is not empty
//     .select();

//   if (error) {
//     console.log("error", error);
//     return { error: true };
//   }
//   return data;
// }

// const BidsCarousel = async () => {
//   const supaData: any = await getData();
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
            slidesPerView: 3,
          },
        }}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {supaData.map((item: any) => {
          const {
            id,
            created_at,
            created_buy,
            end_date,
            favourite_count,
            max_tickets,
            name,
            nft_address,
            nft_image,
            participant_list,
            raffle_cost,
            sold_tickets,
            start_date,
            token_id,
            transaction_list,
            raffler,
          } = item;

          return (
            <SwiperSlide className="text-white" key={id}>
              <article>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                  <figure>
                    {/* {`item/${itemLink}`} */}
                    <Link href={nft_image}>
                      <div className="w-full">
                        <Likes
                          like={favourite_count}
                          classes="flex items-center space-x-1 absolute right-6 bg-purple-100 rounded p-2 mt-1 transition-shadow hover:bg-purple-300"
                        />
                        <Image
                          src={nft_image}
                          alt={name}
                          height={370}
                          width={460}
                          className="rounded-[0.625rem] w-full"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </figure>
                  <div className="mt-4 flex items-center justify-between">
                    <Link href={"/item/" + nft_address}>
                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                        {name}
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
                        {raffle_cost} ETH
                      </span>
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <Link href={`opensea.io/${raffler}`}>
                      <span className="dark:text-jacarta-300 text-jacarta-500">
                        {raffler.slice(0, 6).concat("...", raffler.slice(-4))}{" "}
                      </span>
                    </Link>
                  </div>
                  <div className="mt-2">
                    <span className="dark:text-jacarta-300 text-jacarta-500 text-sm">
                      Tickets Remaining
                    </span>
                    <div className="text-green text-lg font-extrabold">
                      &nbsp;{max_tickets - sold_tickets}/{max_tickets}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      prefetch={false}
                      href={`/raffles/${id}`}
                      className="text-purple-base hover:text-white font-display text-lg font-semibold w-full text-center border-purple border-2 rounded py-2 hover:bg-accent-dark hover:opacity-50 transition ease-in-out delay-150"
                      // onClick={() => dispatch(bidsModalShow())}
                    >
                      <div className="block">View Raffle</div>
                      <Countdown date={Date.now() + 500000}>
                        <p className="text-sm">Raffle has Ended</p>
                      </Countdown>
                    </Link>
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
