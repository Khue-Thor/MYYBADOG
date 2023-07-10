import React from "react";
import Image from "next/image";
import Social_dropdown from "@/components/dropdown/Social_dropdown";
import user_data from "@/data/user_data";
import Meta from "@/components/meta";
import Tippy from "@/components/Tippy";
import UserItems from "@/app/user/[address]/UserItems";
import UserId from "@/app/user/[address]/UserId";
import AuctionsDropdown from "@/components/dropdown/AuctionsDropdown";
import LikeButton from "@/app/user/[address]/LikeButton";
import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import { prisma } from '@/components/lib/prisma';
import { fixBigInt } from '@/utils/bigIntFixer';
import { RandomImage } from '@/components/random-image';
import { cookies } from 'next/headers';

interface params {
  params: {
    address: string;
  };
}


const User = async ({ params }: params) => {
  const { address } = params;

  const user: User | null = await prisma.user.findUnique({
    where: { address: address as string },
  });

  if (!user) {
    return notFound()
  }

  const parsedUser = [await fixBigInt(user)];
  console.log('user', parsedUser);
  console.log('user', parsedUser[0].created_at);

  const nextCookies = cookies(); // Get cookies object
  const themeValue = nextCookies.get("theme")?.value || "dark"; // Find cookie
  const missingBannerUrl =
    themeValue === "dark" ? "/images/blackbg.png" : "/images/whitebg.png";

  return (
    <>
      <Meta title="User || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Profile --> */}
      {user_data
        .map((item: any) => {
          const { id, userId, text, joinYear, icon } =
            item;
          return (
            <div className="pt-[5.5rem] lg:pt-24" key={id}>
              {/* <!-- Banner --> */}
              <div className="relative h-[18.75rem]">
                <Image
                  src={parsedUser[0].bannerUrl || missingBannerUrl}
                  alt="banner"
                  fill
                  sizes={"100vw"}
                  className="object-cover"
                />
              </div>
              {/* <!-- end banner --> */}
              <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
                {/* <!-- Avatar --> */}
                <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <figure className="relative h-40 w-40">
                    {parsedUser[0].bannerUrl ? (
                      <div className="relative h-[18.75rem]">
                        <Image
                          src={parsedUser[0].bannerUrl}
                          alt={parsedUser[0].username}
                          fill
                          sizes={"150px"}
                          className="dark:border-jacarta-600 rounded-xl border-[5px] border-white object-contain"
                        />
                      </div>
                    ) : <RandomImage contract={address} size={160} border={true} />}
                    <div
                      className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      {icon && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-[.875rem] w-[.875rem] fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      )}
                    </div>
                  </figure>
                </div>

                <div className="container">
                  <div className="text-center">
                    <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                      {parsedUser[0].username}
                    </h2>
                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                      <Tippy content="ETH">
                        <svg className="icon h-4 w-4 mr-1">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </Tippy>
                      <UserId userId={userId} />
                    </div>

                    <p className="dark:text-jacarta-300 mx-auto mb-2 max-w-xl text-lg">
                      {text}
                    </p>
                    <span className="text-jacarta-400">
                      Joined {new Date(parsedUser[0].created_at).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </span>

                    <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                      <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                        <div className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                          <LikeButton />
                        </div>
                      </div>

                      <Social_dropdown />

                      <AuctionsDropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- end profile --> */}
              <UserItems />
            </div>
          );
        })}
    </>
  );
}

export default User