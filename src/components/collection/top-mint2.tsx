// import Image from 'next/image';
import { getTopMint } from "@/utils/urlGetter";
import Link from "next/link";
import TopMintItem from "./top-mint-item";

type MintVolumeType = {
  quantity: number;
  value: number;
  crypto_unit: string;
  usd: null | number;
};

interface TopMintCollectionRecord {
  collection_name: string;
  contract_address: string;
  contract_url: string;
  blockchain: string;
  mint_num: number;
  mint_volume: MintVolumeType;
  minter_num: number;
  whale_num: number;
  total_gas_fee: Object;
  first_mint_time: number;
  fomo: string;
}

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
    // "https://data-api.nftgo.io/eth/v1/market/rank/top-mints/24h?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=5",
    getTopMint("24h", "mint_num", false, false, 0, 5),
    options
  );
  // console.log(getTopMint("24h", "mint_num", false, false, 0, 5));
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));

  // console.log(res);

  // TODO: Handle the error
  if (Number(res.status) != 200) {
    // This will activate the closest 'error.js' Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TopMint2 = async () => {
  const data = await getTopMintData();
  // console.log(data);

  return (
    <>
      {/* <!-- Today's Top Mint --> */}
      <div
        className="dark:bg-jacarta-800 bg-light-base rounded-2.5xl p-12 lg:w-1/3"
        // key={parentId}
        key={"TopMint1"}
      >
        <h2 className="text-jacarta-700 font-display mb-8 text-center text-3xl font-semibold dark:text-white">
          {"Top Minted"}
        </h2>

        <div className="flex flex-col space-y-5">
          {data.top_mint_collection_items.map(
            (item: TopMintCollectionRecord, index: number) => {
              {
                /* { data.top_mint_collection_items.forEach((item: TopMintCollectionRecord, index: number) => { */
              }
              // console.log(index);
              return (
                // @ts-expect-error Server Component
                <TopMintItem key={index} index={index} data={item} />
              );
            }
          )}
        </div>
        <Link
          href="/collection/eth-mainnet/0x934910077f5185f1e62f821c167b38a864156688"
          className="text-accent mt-8 block text-center text-sm font-bold tracking-tight"
          prefetch={false}
        >
          View All Drops
        </Link>
      </div>

      {/* <!-- end today's top mint --> */}
    </>
  );
};

export default TopMint2;
