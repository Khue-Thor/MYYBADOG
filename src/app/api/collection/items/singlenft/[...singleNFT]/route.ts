import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { singleNFT: string[] } }
) {
  // blockchain, contract_address, token
  if (!Array.isArray(params.singleNFT)) {
    console.error('Missing info');
    return NextResponse.json({});
  }

  const [blockchain, contract_address, token] = params.singleNFT;

  const urlV3 = `https://${blockchain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    next: {
      revalidate: 86400, // 24 hrs in sec
    },
  };
  try {
    const response = await fetch(
      `${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=${token}&limit=${token}`,
      options
    );
    const data = await response.json();
    console.log('data', data);

    return NextResponse.json(data.nfts[0]);
  } catch (error) {
    return NextResponse.json({});
  }
}
