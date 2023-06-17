import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { nfts: string[] } }
) {
  // blockchain, contract_address, token
  if (!Array.isArray(params.nfts)) {
    console.error('Missing info');
    return NextResponse.json({});
  }

  const [blockchain, contract_address, startToken, limit] = params.nfts;
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
      `${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=${startToken}&limit=${limit}`,
      options
    );
    const data = await response.json();
    const list = data.nfts || [];

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({});
  }
}
