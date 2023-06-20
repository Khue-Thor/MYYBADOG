import React from "react";
import HeadLine from "@/components/headline";
import BidsCarousel from "@/components/carousel/BidCarousel";
import { NFTMetaData } from "@/api/alchemy";

type Props = {
  blockchain: string;
  contractAddress: string;
  getNFTsForContractPromise: Promise<NFTMetaData[]>;
};

const MoreItems = async ({ blockchain, contractAddress, getNFTsForContractPromise }: Props) => {
  const nftsForContract = await getNFTsForContractPromise

  return (
    <section className="dark:bg-jacarta-800 bg-light-base py-24">
      {/* <!-- Hot Bids --> */}
      <div className="container">
        <HeadLine
          text="More from this collection"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel
            nfts={nftsForContract}
            blockchain={blockchain}
            contractAddress={contractAddress}
          />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export default MoreItems;
