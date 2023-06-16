interface ColectionMetrics {
  last_updated: number;
  market_cap_usd: number;
  market_cap_eth: number;
  volume_usd: {
    '24h': number;
    '7d': number;
    '30d': number;
    all: number;
  };
  volume_eth: {
    '24h': number;
    '7d': number;
    '30d': number;
    all: number;
  };
  holder_num: number;
  listing_num: number;
  total_supply: number;
  floor_price: {
    quantity: number;
    value: number;
    crypto_unit: string;
    usd: number;
  };
  avg_price_usd: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  avg_price_eth: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  sale_num: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  transfer_num: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  liquidity: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  buyer_num: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  seller_num: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  trader_num: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  floor_price_change_percentage: {
    '24h': number;
    '7d': number;
    '30d': number;
  };
  market_cap_usd_rank: number;
  market_cap_eth_rank: number;
  volume_change_percent: {
    '30d': number;
    '7d': number;
    '24h': number;
  };
}

export interface NFT {
  blockchain: string;
  collection_name: string;
  collection_slug: string;
  collection_opensea_slug: string;
  contract_type: string | null;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  image: string;
  animation_url: string | null;
  owner_addresses: string[];
  traits: {
    type: string;
    value: string;
    percentage: number | null;
  }[];
  rarity: string | null;
  suspicious: boolean | null;
  last_sale: {
    tx_hash: string;
    price_token: number;
    token_symbol: string;
    token_contract_address: string;
    price_usd: number;
    price: {
      quantity: number;
      value: number;
      crypto_unit: string;
      usd: number;
    };
    tx_url: string;
    time: number;
  };
}

interface NFTResponse {
  total: number;
  nfts: NFT[];
}

const urlBuilder = (contractAdress: string) => {
  return `https://data-api.nftgo.io/eth/v1/collection/${contractAdress}`;
};

('https://data-api.nftgo.io/eth/v1/collection/0x934910077f5185f1e62f821c167b38a864156688/nfts?offset=0&limit=10');

const options = {
  method: 'GET',
  headers: new Headers({
    accept: 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_NFT_GO_API_KEY as string,
  }),
};

export async function getColectionMetrics(
  contractAddress: string
): Promise<ColectionMetrics> {
  const request = await fetch(
    `${urlBuilder(contractAddress)}/metrics`,
    options
  );
  if (request.status !== 200) {
    throw new Error('Network response was not ok');
  }
  const data = await request.json();
  return data;
}

export async function getColectionNfts(
  contractAddress: string,
  offset: number,
  limit: number
): Promise<NFT[]> {
  const request = await fetch(
    `${urlBuilder(contractAddress)}/nfts?offset=${offset}&limit=${limit}`,
    options
  );
  const data = await request.json();
  return data.nfts;
}
