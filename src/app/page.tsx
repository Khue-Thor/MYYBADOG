// import Image from 'next/image'
import { Inter } from 'next/font/google'
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

const inter = Inter({ subsets: ['latin'] })

async function getTopMintData() {
  const options: RequestInit = {
    method: 'GET',
    headers: new Headers({
      accept: 'application/json',
      'X-API-KEY': process.env.NFT_GO_API_KEY as string,
    }),
    next: {
      revalidate: 3600
    }
  };
  
  const res = await fetch('https://data-api.nftgo.io/eth/v1/market/rank/top-mints/6h?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=10', options);
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));

  console.log(res);

  // TODO: Handle the error
  if(Number(res.status) != 200) {
    // This will activate the closest 'error.js' Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getTopMintData();
  console.log(data);

  return (
    <>
      <Meta title="Home" keyword="baddogs, baddogs nft, nft marketplace" desc="" />
      <Hero_6 />
      {/* <Bids /> */}
      <Collection_category bgWhite={true} />
      {/* <Auctions_categories /> */}
      {/* <Browse_category bgWhite={true} /> */}
      <Testimonial bgWhite={true} />
      {/* <Partners /> */}
      <Download />
    </>
  )
}
