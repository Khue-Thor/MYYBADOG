import {
    ThirdwebAuthProvider,
    authSession,
  } from "@thirdweb-dev/auth/next-auth";
  import NextAuth from "next-auth";
  import type { NextAuthOptions } from 'next-auth'
  
 const authOptions:NextAuthOptions = {
    providers: [
      // Add the thirdweb auth provider to the providers configuration
      ThirdwebAuthProvider({
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",

      }),

    ],
    callbacks: {
     session:authSession
    }
  };
  const handler= NextAuth(authOptions);

  export {handler as GET, handler as POST,authOptions}