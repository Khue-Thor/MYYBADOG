import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse,NextRequest } from "next/server";

//This route uses ThirdwebProvider from Wallet connection to check if next-auth is authenticated

export async function GET(req:NextRequest, res:NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({message:"Not Authorized or No Session Available."},{status:401});
  }else{
    return NextResponse.json({message:"Authorized with Session."},{status:200});
  }

};

