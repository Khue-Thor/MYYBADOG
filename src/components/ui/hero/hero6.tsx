"use client";

import Link from "next/link";
import React from "react";
// import { hero_6_data } from "@/data/hero_6_data";

async function getTopDogData() {
  const options: RequestInit = {
    method: "GET",
    headers: new Headers({
      accept: "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_NFT_GO_API_KEY as string,
    }),
    next: {
      revalidate: 60,
    },
  };
  try {
    const res = await fetch(
      "https://data-api.nftgo.io/eth/v1/collection/0x934910077f5185f1e62f821c167b38a864156688/nfts?offset=0&limit=9",
      options
    );
    if (Number(res.status) != 200) {
      // This will activate the closest 'error.js' Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

export default async function Hero_6() {
  const data = await getTopDogData();
  return (
    <>
      {/* <!-- Hero --> */}
      <section className="relative px-6 pb-8 py-24 md:pt-32">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              {data.nfts.slice(1, 5).map((item: any) => {
                const { token_id, name, image, collection_opensea_slug } = item;
                // const itemLink = image
                //   .split("/")
                //   .slice(-1)
                //   .toString()
                //   .replace("_square.jpg", "")
                //   .replace(".gif", "");
                return (
                  <article key={token_id}>
                    <div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
                      <figure className="relative">
                        <Link
                          href={`/item/${image}`}
                          className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20"
                        >
                          <img
                            src={image}
                            alt={name}
                            className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                            height="470"
                            width="470"
                          />
                        </Link>
                      </figure>
                      <div className="pointer-events-none absolute bottom-0 w-full p-5">
                        <h2 className="font-display text-base leading-none text-white xl:text-lg">
                          {name}
                        </h2>
                        <span className="text-2xs text-white">
                          {collection_opensea_slug}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            {/* Solo NFT in center div */}
            <article key={data.nfts[0].token_id}>
              <div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
                <figure className="relative">
                  <Link
                    href={`/item/${data.nfts[0].image}`}
                    className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20"
                  >
                    <img
                      src={data.nfts[0].image}
                      alt={data.nfts[0].name}
                      className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                      height="470"
                      width="470"
                    />
                  </Link>
                </figure>
                <div className="pointer-events-none absolute bottom-0 w-full p-5">
                  <h2 className="font-display text-base leading-none text-white xl:text-lg">
                    {data.nfts[0].name}
                  </h2>
                  <span className="text-2xs text-white">
                    {data.nfts[0].collection_opensea_slug}
                  </span>
                </div>
              </div>
            </article>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              {data.nfts.slice(4, 8).map((item: any) => {
                const { token_id, name, image, collection_opensea_slug } = item;
                // const itemLink = image
                //   .split("/")
                //   .slice(-1)
                //   .toString()
                //   .replace(".jpg", "")
                //   .replace("_square", "")
                //   .replace(".gif", "");
                return (
                  <article key={token_id}>
                    <div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
                      <figure className="relative">
                        <Link
                          href={`/item/${image}`}
                          className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20"
                        >
                          <img
                            src={image}
                            alt={name}
                            className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
                            height="470"
                            width="470"
                          />
                        </Link>
                      </figure>
                      <div className="pointer-events-none absolute bottom-0 w-full p-5">
                        <h2 className="font-display text-base leading-none text-white xl:text-lg">
                          {name}
                        </h2>
                        <span className="text-2xs text-white">
                          {collection_opensea_slug}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end hero --> */}
    </>
  );
}
