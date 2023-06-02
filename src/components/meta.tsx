import Head from "next/head";
import React from "react";

type Props = { title?: string; keyword?: string; desc?: string };

const Meta: React.FC<Props> = ({
  title = "Bad Dogs Company | NFT Marketplace",
  keyword = "bitcoin, blockchain, crypto, crypto collectibles, crypto makretplace, cryptocurrency, digital items, market, nft, nft marketplace, nft next js, NFT react, non-fungible tokens, virtual asset, wallet",
  desc = "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.",
}) => {
  return (
    <div>
      <Head>
        <title>{title} || Bad Dogs Company NFT Marketplace</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
      </Head>
    </div>
  );
};

export default Meta;
