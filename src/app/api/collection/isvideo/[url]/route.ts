import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { url: string } }
) {
  try {
    const url = params.url;
    console.log(`https:/nft-cdn.alchemy.com/eth-mainnet/${url} `);

    const request = await fetch(
      `https:/nft-cdn.alchemy.com/eth-mainnet/${url}`
    );
    const blob = await request.blob();
    console.log(blob.type);

    return NextResponse.json(blob.type.includes('video'));
  } catch (error) {
    return NextResponse.json(error);
  }
}
