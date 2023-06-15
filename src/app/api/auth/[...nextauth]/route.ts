import {
    ThirdwebAuthProvider,
    authSession,
  } from "@thirdweb-dev/auth/next-auth";
  import NextAuth from "next-auth";
  import type { NextAuthOptions } from 'next-auth'
  
  export const authOptions:NextAuthOptions = {
       providers: [
      // Add the thirdweb auth provider to the providers configuration
      ThirdwebAuthProvider({
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
      }),

    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, user, token }) {
        const sessionWithAddress = authSession({ session, token });
        return sessionWithAddress;
      }  
    }
  }
  
  const handler= NextAuth(authOptions);

  export {handler as GET, handler as POST}
