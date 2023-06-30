import { NextResponse } from 'next/server';
import { prisma } from '@/components/lib/prisma';

export async function GET(req: Request) {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        floor_price: {
          gt: 0,
          // lte: 1
        },
        is_hidden: false,
      },
      select: {
        items_total: true,
        contract_address: true,
        logo_url: true,
        floor_price: true,
        name: true,
        opensea_verified: true,
        baddogs_verified: true,
        volume_24h: true,
      },
      take: 10,
      orderBy: [{ volume_24h: 'desc' }],
    });

    const formattedCollections = collections.map((collection: any) => ({
      totalSupply: String(collection.items_total),
      address: String(collection.contract_address),
      openSeaMetadata: {
        imageUrl: collection.logo_url,
        collectionName: collection.name,
        floorPrice: String(collection.floor_price),
        safelistRequestStatus: collection.opensea_verified,
        baddogs_verified: collection.baddogs_verified,
      },
    }));

    return NextResponse.json(
      { message: 'success', data: formattedCollections },
      { status: 200 }
    );
  } catch (error) {
    console.log('error prisma', error);
  }
}
