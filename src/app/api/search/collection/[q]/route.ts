// import { getServerSession } from "next-auth";
// import * as z from "zod";

// import { authOptions } from "@/lib/auth"

import { NextResponse } from "next/server";

// export async function GET(req: Request, context:any) {
export async function GET(req: Request, { params }: { params: { q: string } }) {
  try {

    // Get the query
    // const { searchParams } = new URL(req.url)
    // const q = searchParams.get('q')
    const q = params.q

    // console.log(`q=${q}`);

    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
      next: {
        revalidate: 86400, // 24 hrs in sec 
      }
    };

    const res = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/searchContractMetadata?query=${q}`, options);

    const result = await res.json();

    return NextResponse.json(result, { status: 200 })

  } catch (error) {
    // Check to see if it's a validation error from Zod
    // if(error instanceof z.ZodError) {
    //   return new Response(JSON.stringify(error.issues), {status: 422})
    // }

    // return new NextResponse(null, {status: 500});
    return NextResponse.json({ error: "Failed to retrieve" }, { status: 500 });
  }
}