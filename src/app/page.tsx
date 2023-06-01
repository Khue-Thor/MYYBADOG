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

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {

  return (
    <>
      <Meta
        title="Home"
        keyword="baddogs, baddogs nft, nft marketplace"
        desc=""
      />
      {/* @ts-expect-error Server Component */}
      <Hero_6 />
      {/* <Hero_6 data={data.nfts} /> */}
      {/* <Bids /> */}
      <Collection_category bgWhite={true} />
      {/* <Auctions_categories /> */}
      {/* <Browse_category bgWhite={true} /> */}
      <Testimonial bgWhite={true} />
      {/* <Partners /> */}
      <Download />
    </>
  );
}
