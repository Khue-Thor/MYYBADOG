// import Image from 'next/image'
import { Inter } from "next/font/google";
import Meta from "@/components/meta";
import Download from "@/components/blog/download";
// import {
//   Auctions_categories,
//   Bids,
//   Browse_category,
//   Partners,
// } from "@/components/component";
import Collection_category from "@/components/collection/collection-category";
import Hero_6 from "@/ui/hero/hero6";
import Testimonial from "@/components/blog/testimonial";
import BidsCarousel from "@/components/ui/carousel/bids-carousel";
import HeadLine from "@/components/headline";
import { supabase } from "@/lib/client";
import prisma from "@/components/lib/prisma";
const inter = Inter({ subsets: ["latin"] });

async function getData() {
  const { data, error } = await supabase
    .from("raffles") // the table is not empty
    .select();

  if (error) {
    console.log("error", error);
    return { error: true };
  }
  return data;
}

export default async function Page() {
  const supaData: any = await getData();
  console.log(supaData);

  return (
    <>
      <Meta
        title="Raffles"
        keyword="baddogs, baddogs nft, nft marketplace"
        desc=""
      />
      <section className="relative px-6 pb-8 py-24 md:pt-32">
        {/* <h1 className="text-xl font-display opacity-80 font-bold">
          Active Raffles
        </h1> */}
        <HeadLine
          text="Hot Raffles"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />
        {/* @ts-expect-error Server Component */}
        <BidsCarousel data={supaData} />
        {/* <BidsCarousel data={data.nfts} /> */}
      </section>
      {/* <Partners /> */}
      <Download />
    </>
  );
}
