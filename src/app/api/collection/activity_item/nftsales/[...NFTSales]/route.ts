import { getNFTSales } from '@/api/alchemy';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { NFTSales: string[] } }
) {
  // blockchain, contract_address, token
  if (!Array.isArray(params.NFTSales)) {
    console.error('Missing info');
    return NextResponse.json({});
  }

  try {
    const [blockchain, contract_address] = params.NFTSales;
    const data = await getNFTSales({
      blockchain,
      contractAddress: contract_address,
      limit: 5,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({});
  }
}
