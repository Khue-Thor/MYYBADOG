import { NextResponse } from 'next/server';
import { prisma } from '@/components/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;
    console.log('name prisma', name);

    const collections = await prisma.collection.findMany({
      where: {
        name: {
          contains: name.toLowerCase(),
        },
      },
      select: {
        items_total: true,
        contract_address: true,
        logo_url: true,
        floor_price: true,
        name: true,
      },
    });

    const formattedCollections = collections.map((collection: any) => ({
      totalSupply: String(collection.items_total),
      address: String(collection.contract_address),
      openSeaMetadata: {
        imageUrl: collection.logo_url,
        collectionName: collection.name,
        floorPrice: String(collection.floor_price),
      },
    }));
    console.log('prisma collection ', formattedCollections);

    return NextResponse.json(
      { message: 'success', data: formattedCollections },
      { status: 200 }
    );
  } catch (error) {
    console.log('error prisma', error);
  }
}
