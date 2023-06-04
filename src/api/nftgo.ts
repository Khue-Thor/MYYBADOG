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

const urlBuilder = (contractAdress: string) => {
  return `https://data-api.nftgo.io/eth/v1/collection/${contractAdress}`;
};

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
  const data = await request.json();
  return data;
}
