import NextAuth from "next-auth";

declare module "next-auth/src/core/types" {
  interface Session {
    user: {

      // Here we add that the user object may have an address field
      address?: string;
      chain_id: string;
      issued_at: string;
      expiration_time: string;
      nonce: string;

    };
  }
}