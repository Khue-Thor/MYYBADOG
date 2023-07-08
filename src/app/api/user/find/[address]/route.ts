import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { verifyLogin } from '@thirdweb-dev/auth/evm';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { fixBigInt } from '@/utils/bigIntFixer';

// import { authOptions } from "../api/auth/[...nextauth]";

//function used to exclude fields from the return values
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  console.log('IN GET REQUEST FOR USER ADDRESS');

  if (address === '') {
    return NextResponse.json(
      { error: 'Address not found in query.' },
      { status: 404 }
    );
  }
  const user: User | null = await prisma.user.findUnique({
    where: { address: address as string },
  });
  if (!user) {
    return NextResponse.json(
      { error: 'User does not exist in database.' },
      { status: 200 }
    );
  }

  const userWithoutId = exclude(user, ['id']);
  const parsedUser = await fixBigInt(userWithoutId);
  const result = parsedUser ? { user_data: parsedUser } : null;

  return NextResponse.json(result, { status: 200 });
}
