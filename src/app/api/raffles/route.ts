import { getSession,useSession, } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { cookies } from 'next/headers';
import { raffles } from "@prisma/client";
import { authOptions }  from "@/lib/auth";
import prisma from "@/lib/prisma";
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
  const { payload:{user:address} }= await req.json();
  const session = await getServerSession(authOptions);

    if (!session || !address) {
      return NextResponse.json({error: "Not authorized. Please Sign in using your wallet." },{status:401 });
    }else{
      try{
        const supaData: raffles | null = await prisma.raffles.update({
          where: { id: 2 },
          data:{
            token_id: 491
          }
        });
        if (supaData) {
          console.log(supaData);
          return NextResponse.json({data:supaData},{ status:200 })
        }else{
          return NextResponse.json({error: "Data not found." },{status:401 })
        }
        
      }
    catch(err){
      console.log(err)
    }
   
    }    
    
  };

  export async function PUT(req:NextRequest,res:NextResponse) {
    const {id} = await req.json();
    const session1 = await getSession()
    const session = await getServerSession(authOptions);
    console.log(session1);
  
      if (!session ) {
        return NextResponse.json({error: "Not authorized. Please Sign in using your wallet." },{status:401 });
      }else{
        try{
          const supaData: raffles | null = await prisma.raffles.update({
            where: { id: 2 },
            data:{
              token_id: id
            }
          });
          if (supaData) {
            console.log(supaData);
            return NextResponse.json({data:supaData},{ status:200 })
          }else{
            return NextResponse.json({error: "Data not found." },{status:401 })
          }
          
        }
      catch(err){
        console.log(err)
      }
     
      }    
      
    };