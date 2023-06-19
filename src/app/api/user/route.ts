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

//              ~~~~~ POST FUNCTION~~~~~


export async function POST(req:NextRequest) {
  const { payload }= await req.json();
  const { address, error: verifyErr } = await verifyLogin(
    process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
    payload,
  );

//   const session = await getServerSession(authOptions);


    if (!address) {
      return NextResponse.json({error: verifyErr },{status:401 });
    }else{
      try{
        const createUser = await prisma.users.create({
            data: {
              address: address as string,
              username: '',
              badges: [],
              level: 0,
              quests: [],
              friends: [],
              inventory: []
            }
          });
        if (createUser) {
          console.log(createUser);
          return NextResponse.json({data:createUser},{ status:200 })
        }else{
          return NextResponse.json({error: "Failed to register user." },{status:400 })
        }
        
      }
    catch(err){
      console.log(err)
    }
   
    }    
    
  };

  export async function PUT(req:NextRequest,res:NextResponse) {
    const {id} = await req.json();

    const session = await getServerSession(authOptions);
  
      // if (!session ) {
      //   return NextResponse.json({error: "Not authorized. Please Sign in using your wallet." },{status:401 });
      // }else{
      //   try{
      //     const supaData: raffles | null = await prisma.raffles.update({
      //       where: { id: 2 },
      //       data:{
      //         token_id: id
      //       }
      //     });
      //     if (supaData) {
      //       console.log(supaData);
      //       return NextResponse.json({data:supaData},{ status:200 })
      //     }else{
      //       return NextResponse.json({error: "Data not found." },{status:401 })
      //     }
          
      //   }
      // catch(err){
      //   console.log(err)
      // }
     
      // }    
      
    };