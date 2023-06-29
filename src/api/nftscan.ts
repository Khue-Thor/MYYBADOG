interface AttributeValue {
  attributes_value: string;
  total: number;
}

interface Attribute {
  attributes_name: string;
  attributes_values: AttributeValue[];
  total: number;
}

export interface Data {
  contract_address: string;
  name: string;
  symbol: string;
  description: string;
  website: string;
  email: string | null;
  twitter: string;
  discord: string;
  telegram: string | null;
  github: string | null;
  instagram: string | null;
  medium: string | null;
  logo_url: string;
  banner_url: string;
  featured_url: string;
  large_image_url: string;
  attributes: Attribute[];
  erc_type: string;
  deploy_block_number: number;
  owner: string;
  verified: boolean;
  opensea_verified: boolean;
  royalty: number;
  items_total: number;
  amounts_total: number;
  owners_total: number;
  opensea_floor_price: number;
  floor_price: number;
  collections_with_same_name: string[];
  price_symbol: string;
  volume_24h: string;
  baddogs_verified: boolean;
}

const urlBuilder = (contractAdress: string) => {
  return `https://restapi.nftscan.com/api/v2/collections/${contractAdress}`;
};

const options = {
  method: 'GET',
  headers: new Headers({
    accept: 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_NFT_SCAN_API_KEY as string,
  }),
  next: {
    revalidate: 86400, // 24 hrs in sec
  },
};

export const getCollectionData = async (
  contractAddress: string
): Promise<Data> => {
  const response = await fetch(urlBuilder(contractAddress), options);
  const data = await response.json();
  return data.data;
};

export interface rankingData {
  contract_address: string;
  contract_name: string;
  lowest_price: number;
  average_price: number;
  highest_price: number;
  floor_price: number;
  volume: number;
  sales: number;
  sales_change: string;
  logo_url: string;
  mint_price_total: number;
  mint_gas_fee: number;
  exchange_volume_change_24h: string;
  exchange_volume_change_7d: string;
  items_total: number;
  amounts_total: number;
  owners_total: number;
  volume_change: string;
  average_price_change: string;
  market_cap: number;
  market_trend: string;
  mint_average_price: number;
  volume_7d: null | number;
  price_7d: null | number;
}

export const getRanking = async (field: string): Promise<rankingData[]> => {
  const url = `https://restapi.nftscan.com/api/v2/statistics/ranking/trade?time=1d&sort_field=${field}&sort_direction=desc&show_7d_trends=false`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
};
