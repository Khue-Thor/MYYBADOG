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
};

export const getCollectionData = async (
  contractAddress: string
): Promise<Data> => {
  const response = await fetch(urlBuilder(contractAddress), options);
  const data = await response.json();
  return data.data;
};
