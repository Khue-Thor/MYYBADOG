import { getSession,useSession, } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { cookies } from 'next/headers';
import { users } from "@prisma/client";
import { authOptions }  from "@/lib/auth";
import prisma from "@/components/lib/prisma";
// import { authOptions } from "../api/auth/[...nextauth]";


export async function GET(req:Request) {
    console.log("IN GET REQUEST FOR USER")
    const { payload:{user:address} }= await req.json();

  const user: users | null = await prisma.users.findUnique({
    where: { address: address as string },
  });
  if (user) {
    console.log(user);
  }


  if (!user) {
    return NextResponse.json({error: "Data not found." },{status:401 })
  }

  return NextResponse.json({user_data:user},{ status:200 })
};
