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
      async session({ session,user, token }) {
        console.log("calling back");
        console.log(session);
        console.log(user);
        const sessionWithAddress = authSession({ session, token });
        // Make sure to return the session with the address
        return sessionWithAddress;
      }
    }
  };
  const handler= NextAuth(authOptions);

  export {handler as GET, handler as POST,handler as PUT,handler as DELETE,authOptions}