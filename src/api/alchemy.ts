import querystring from "querystring";

export type NFTMetaData = {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: {
      floorPrice: number;
      collectionName: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      externalUrl: string;
      twitterUsername: string;
      discordUrl: string;
      lastIngestedAt: string;
    };
    isSpam: null;
    spamClassifications: [];
  };
  tokenId: string;
  tokenType: string;
  name: string | null;
  description: string | null;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
    originalUrl: string;
  };
  raw: {
    tokenUri: string;
    metadata: {
      image: string;
      attributes: { value: string; trait_type: string }[];
    };
    error: null;
  };
  tokenUri: string;
  timeLastUpdated: string;
};

function builtV3URL(blockchain: string) {
  return `https://${blockchain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
}

type GetNFTMetadataParam = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

export async function getNFTMetadata({
  blockchain,
  contractAddress,
  tokenId,
}: GetNFTMetadataParam): Promise<NFTMetaData> {
  const res = await fetch(
    `${builtV3URL(
      blockchain
    )}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}&refreshCache=false`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  return res.json();
}

type GetNFTsForContractParam = {
  blockchain: string;
  contractAddress: string;
  limit: number;
};

type GetOneNFTForContractParam = {
  blockchain: string;
  contractAddress: string;
  startToken: number;
};

export type NFTSale = {
  marketplace: string;
  marketplaceAddress: string;
  contractAddress: string;
  tokenId: string;
  quantity: string;
  buyerAddress: string;
  sellerAddress: string;
  taker: "BUYER" | "SELLER";
  sellerFee: {
    amount: string;
    tokenAddress: string;
    symbol: string;
    decimals: number;
  };
  protocolFee: {
    amount: string;
    tokenAddress: string;
    symbol: string;
    decimals: number;
  };
  royaltyFee: {
    amount: string;
    tokenAddress: string;
    symbol: string;
    decimals: number;
  };
  blockNumber: number;
  logIndex: number;
  bundleIndex: number;
  transactionHash: string;
};

type NFTSales = {
  nftSales: NFTSale[];
};

export async function getNFTsForContract({
  blockchain,
  contractAddress,
  limit,
}: GetNFTsForContractParam): Promise<NFTMetaData[]> {
  const res = await fetch(
    `${builtV3URL(
      blockchain
    )}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true&limit=${limit}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  return data.nfts;
}

export async function getOneNFTForContract({
  blockchain,
  contractAddress,
  startToken,
}: GetOneNFTForContractParam): Promise<NFTMetaData[]> {
  const res = await fetch(
    `${builtV3URL(
      blockchain
    )}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true&startToken=${startToken}&limit=${startToken}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  return data.nfts;
}

type ComputeRarityParam = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

export type Rarity = {
  traitType: string;
  value: string;
  prevalence: number;
};

type ComputeRarityResponseData = {
  rarities: Rarity[];
};

export async function computeRarity({
  blockchain,
  contractAddress,
  tokenId,
}: ComputeRarityParam): Promise<ComputeRarityResponseData> {
  const res = await fetch(
    `${builtV3URL(
      blockchain
    )}/computeRarity?contractAddress=${contractAddress}&tokenId=${tokenId}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  return data;
}

type GetNFTSalesParam = {
  blockchain: string;
  contractAddress?: string;
  tokenId?: string;
  limit?: number;
};

export async function getNFTSales({
  blockchain,
  contractAddress,
  tokenId,
  limit,
}: GetNFTSalesParam): Promise<NFTSale[]> {
  const res = await fetch(
    `${builtV3URL(blockchain)}/getNFTSales?${querystring.stringify({
      order: "asc",
      ...(contractAddress && { contractAddress }),
      ...(contractAddress && tokenId && { tokenId }),
      ...(limit && { limit }),
    })}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  return data.nftSales;
}

type GetOwnersForNFTParam = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

export async function getOwnersForNFT({
  blockchain,
  contractAddress,
  tokenId,
}: GetOwnersForNFTParam): Promise<string[]> {
  const res = await fetch(
    `${builtV3URL(blockchain)}/getOwnersForNFT?${querystring.stringify({
      contractAddress,
      tokenId,
    })}`,
    { method: "GET", headers: { accept: "application/json" } }
  );
  const data = await res.json();
  return data.owners as string[];
}
