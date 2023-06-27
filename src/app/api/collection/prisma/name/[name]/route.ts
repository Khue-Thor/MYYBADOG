import { NextResponse } from 'next/server';
import { prisma } from '@/components/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;
    const collection = await prisma.collection.findOne({
      where: { name },
    });
    console.log('prisma collection ', collection);

    return NextResponse.json(
      { message: 'success', collection },
      { status: 200 }
    );
  } catch (error) {}
}
