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


const inter = Inter({ subsets: ["latin"] });

async function getTopMintData() {
  const options: RequestInit = {
    method: "GET",
    headers: new Headers({
      accept: "application/json",
      "X-API-KEY": process.env.NFT_GO_API_KEY as string,
    }),
    next: {
      revalidate: 3600,
    },
  };

  const res = await fetch(
    "https://data-api.nftgo.io/eth/v1/market/rank/top-mints/6h?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=10",
    options
  );
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));

  console.log(res);

  // TODO: Handle the error
  if (Number(res.status) != 200) {
    // This will activate the closest 'error.js' Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getTopDogData() {
  "use server";
  const options: RequestInit = {
    method: "GET",
    headers: new Headers({
      accept: "application/json",
      "X-API-KEY": process.env.NFT_GO_API_KEY as string,
    }),
    next: {
      revalidate: 3600,
    },
  };

  const res = await fetch(
    "https://data-api.nftgo.io/eth/v1/collection/0x934910077f5185f1e62f821c167b38a864156688/nfts?offset=0&limit=9",
    options
  );
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));

  console.log(res);

  // TODO: Handle the error
  if (Number(res.status) != 200) {
    // This will activate the closest 'error.js' Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getTopDogData();
  // console.log(data);

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
        <BidsCarousel data={data.nfts} />
      </section>
      {/* <Partners /> */}
      <Download />
    </>
  );
}
