import { getNFTSales, getOneNFTForContract } from '@/api/alchemy';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { oneNFT: string[] } }
) {
  // blockchain, contract_address, token
  if (!Array.isArray(params.oneNFT)) {
    console.error('Missing info');
    return NextResponse.json({});
  }

  try {
    const [blockchain, contract_address, startToken] = params.oneNFT;
    const nftMetadata = await getOneNFTForContract({
      blockchain,
      contractAddress: contract_address,
      startToken: +startToken,
    });

    return NextResponse.json(nftMetadata);
  } catch (error) {
    return NextResponse.json({});
  }
}
