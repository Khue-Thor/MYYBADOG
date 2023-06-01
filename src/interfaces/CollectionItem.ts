interface CollectionItem {
  id: string;
  title: string;
  image: string;
  icon: boolean;
  creator: string;
  text: string;
  amount: string;
  details: {
    id: string;
    detailsNumber: string;
    detailsText: string;
  }[];
}

export interface CollectionData {
  id: number;
  title: string;
  image: string;
  icon: boolean;
  amount: string;
  postTime: string;
  postDate: string;
}

export interface NFTContract {
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
}

export interface NFTItem {
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
    isSpam: null | boolean;
    spamClassifications: any[];
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: null | string;
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
      name: string;
      image: string;
      attributes: {
        value: string;
        trait_type: string;
      }[];
    };
    error: null | any;
  };
  tokenUri: string;
  timeLastUpdated: string;
}

export default CollectionItem;
