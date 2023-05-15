"use client";

import Link from "next/link";
import React from "react";
import { hero_6_data } from "@/data/hero_6_data";

const Hero_6 = (data: any) => {
  return (
    <>
      {/* <!-- Hero --> */}
      <section className="relative px-6 pb-8 py-24 md:pt-32">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <div className="grtoken_id grtoken_id-cols-2 grtoken_id-rows-2 gap-5">
              {data.data.map((item: any) => {
                const { token_id, name, image, collection_opensea_slug } = item;
                // const itemLink = image
                //   .split("/")
                //   .slice(-1)
                //   .toString()
                //   .replace("_square.jpg", "")
                //   .replace(".gif", "");
                return (
                  <article key={token_id}>
                    <div className="relative overflow-htoken_idden rounded-2.5xl bg-white dark:bg-jacarta-700">
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
            {data.data.map((item: any) => {
              const { token_id, name, image, collection_opensea_slug } = item;
              //   const itemLink = image
              //     .split("/")
              //     .slice(-1)
              //     .toString()
              //     .replace(".jpg", "")
              //     .replace("_square", "")
              //     .replace(".gif", "");
              return (
                <article key={token_id}>
                  <div className="relative overflow-htoken_idden rounded-xl bg-white dark:bg-jacarta-700">
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
          <div className="w-full lg:w-1/3">
            <div className="grtoken_id grtoken_id-cols-2 grtoken_id-rows-2 gap-5">
              {data.data.map((item: any) => {
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
                    <div className="relative overflow-htoken_idden rounded-2.5xl bg-white dark:bg-jacarta-700">
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
};

export default Hero_6;
