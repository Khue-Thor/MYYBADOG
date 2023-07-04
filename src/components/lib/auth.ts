import { getUser } from "@/api/authenticate";
import {
    ThirdwebAuthProvider,
    authSession,
  } from "@thirdweb-dev/auth/next-auth";
  import NextAuth from "next-auth";
  import type { NextAuthOptions } from 'next-auth'
  import { prisma } from "./prisma";
  import { cookies } from 'next/headers'

 const authOptions:NextAuthOptions = {
    session:{
      strategy:"jwt",
      
    },
    jwt:{ // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30,

    },
    providers: [
      // Add the thirdweb auth provider to the providers configuration
      ThirdwebAuthProvider({
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
           // Enforce that the user's login message has these exact values
      authOptions: {
        validateNonce: async (nonce: string) => {
          const cookieStore = cookies()
          const address = cookieStore.get('wallet-address')?.value;
          try{
            //Check if the nonce exists by querying the record for the nonce value along with the wallet-address
                const record = await prisma.user.findFirst({
            where: {
              address: address?.toString(),
              nonce: nonce as string
            },
            select: {
              nonce: true
            }
          })
         //If the record does not exist, set nonceExist to false, if it does it may be a replay attack so throw the error
          const nonceExists = record === null ? false : true;

          if(nonceExists){
            throw new Error("Nonce has already been used!");
          }
          //TODO: Verify Nonce with Auth.verify
 
          const updateNonce = await prisma.user.update({
            where: {
              address: address?.toString(),
            },
            data: {
              nonce: nonce as string,
            },
          })
          console.log(`updated nonce for user: ${address}`)
          }catch(err){
            console.log(err)
          }
      
        }
      }

      }),

    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, user, token }) {
        const sessionWithAddress = authSession({ session, token });
        return sessionWithAddress;
      }  
    }
  };
  const handler= NextAuth(authOptions);

  export {handler as GET, handler as POST,handler as PUT,handler as DELETE,authOptions}