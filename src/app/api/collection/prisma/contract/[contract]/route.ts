import { NextResponse } from 'next/server';
import { prisma } from '@/components/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { contract: string } }
) {
  try {
    const contract_address = params.contract;

    const collection = await prisma.collection.findMany({
      where: { contract_address: contract_address.toLowerCase() },
    });

    return NextResponse.json(
      { message: 'success', collection },
      { status: 200 }
    );
  } catch (error) {}
}
