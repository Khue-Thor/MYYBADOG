import { getSession,useSession, } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { cookies } from 'next/headers';
import { raffles } from "@prisma/client";
import { authOptions }  from "../../../lib/auth";
import prisma from "@/components/lib/prisma";
// import { authOptions } from "../api/auth/[...nextauth]";


export async function GET(req:Request) {
  
  const supaData: raffles | null = await prisma.raffles.findUnique({
    where: { id: 2 },
  });
  if (supaData) {
    console.log(supaData);
  }


  if (!supaData) {
    return NextResponse.json({error: "Data not found." },{status:401 })
  }
  // Get the wallet address if the user is logged in with their wallet
  // Otherwise get their email
  return NextResponse.json({message:"success"},{ status:200 })
};

//              ~~~~~ POST FUNCTION~~~~~


export async function POST(req:NextRequest,res:NextResponse) {
  const { payload }= await req.json();
  const session = await getServerSession(authOptions);

  console.log("1",session)


  
    const { address, error: verifyErr } = await verifyLogin(
      process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
      payload
    );
    if (!address) {
      return NextResponse.json({error: verifyErr },{status:401 });
    }    
    
    const supaData: raffles | null = await prisma.raffles.update({
        where: { id: 2 },
        data:{
          token_id:491
        }
      });
      if (supaData) {
        console.log(supaData);
      }
  
  //   if (!session) {
  //     return NextResponse.json({error: "Not Authorized." },{status:401 })
  //   }
  
    if (!supaData) {
      return NextResponse.json({error: "Data not found." },{status:401 })
    }
    // Get the wallet address if the user is logged in with their wallet
    // Otherwise get their email
    return NextResponse.json({data:supaData},{ status:200 })
  };