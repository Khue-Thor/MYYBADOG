import { getSession,useSession, } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { cookies } from 'next/headers';
import { users,raffles } from "@prisma/client";
import { authOptions }  from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import { fixBigInt } from "@/utils/bigIntFixer";
// import { authOptions } from "../api/auth/[...nextauth]";

//function used to exclude fields from the return values
function exclude<User, Key extends keyof any>(
  user: any,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export async function GET(req: Request) {

    console.log("IN GET REQUEST FOR USER")
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')

  const user: users | null = await prisma.users.findUnique({
    where: { address: address as string},
  });

  const userWithoutId = exclude(user,["id"]);
  const parsedUser = await fixBigInt(userWithoutId);
  const result = parsedUser? {user_data:parsedUser} : null;

  return NextResponse.json(result,{ status:200 })
};

  