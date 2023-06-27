import { NextResponse } from 'next/server';
import { prisma } from '@/components/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { contract: string } }
) {
  try {
    const contract_address = params.contract;
    const collection = await prisma.collection.findOne({
      where: { contract_address },
    });
    console.log('prisma collection ', collection);

    return NextResponse.json(
      { message: 'success', collection },
      { status: 200 }
    );
  } catch (error) {}
}
