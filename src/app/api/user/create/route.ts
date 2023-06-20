import { getSession,useSession, } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { cookies } from 'next/headers';
import { users } from "@prisma/client";
import {prisma} from "@/lib/prisma";
import { authOptions }  from "@/lib/auth";
import { fixBigInt } from "@/utils/bigIntFixer";
// import { authOptions } from "../api/auth/[...nextauth]";


//              ~~~~~ POST FUNCTION~~~~~


export async function POST(req:NextRequest) {
  const { address }= await req.json();
  console.log("IN create fxn")
 // const { address, error: verifyErr } = await verifyLogin(
 //   process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
 //   payload,
 // );
 const init = {
           data: {
             address: address as string,
             username: '',
             badges: [],
             level: 0,
             quests: [],
             friends: [],
             inventory: []
           }
         }

//   const session = await getServerSession(authOptions);
     try{
       const createUser = await prisma.users.create(init);
       if (createUser) {
        //This needs to be logged.
        const userCreated = await fixBigInt(createUser);
         console.log("User created with Data:", userCreated);
         return NextResponse.json({data:userCreated},{ status:200 })
       }else{
         return NextResponse.json({error: "Failed to register user." },{status:400 })
       }
       
     }
   catch(err){
     console.log(err)
   }
  }
  


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