import { NextResponse } from "next/server";

// Get top NFT (eth-main) collections
// export async function GET(request: Request) {
//     // const { searchParams } = new URL(request.url)
//     // const q = searchParams.get('q')

//     // console.log(`q=${q}`);

//     const options: RequestInit = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//         },
//         next: {
//           revalidate: 86400, // 24 hrs in sec 
//         }
//       };

//     const res = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/searchContractMetadata?query=bored`, options);

//     const result = await res.json();

//     return NextResponse.json({ result })
// }