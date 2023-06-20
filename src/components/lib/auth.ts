import {
    ThirdwebAuthProvider,
    authSession,
  } from "@thirdweb-dev/auth/next-auth";
  import NextAuth from "next-auth";
  import type { NextAuthOptions } from 'next-auth'
  // import { nonceExists } from "./nonce";
  
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
      // authOptions: {
      //   validateNonce: async (nonce: string) => {
      //     // Check in database or storage if nonce exists
      //     const nonceExists:boolean = await nonceExists(nonce)
      //     if (nonceExists) {
      //       throw new Error("Nonce has already been used!");
      //     }

      //     // Otherwise save nonce in database or storage for later validation
      //     await dbExample.saveNonce(nonce);
      //   }
      // }

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