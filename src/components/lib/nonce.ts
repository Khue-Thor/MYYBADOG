// import { users } from "@prisma/client";
// import {prisma} from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { useAddress } from "@thirdweb-dev/react";
// import { authOptions } from "./auth";

// export const nonceExists = async (nonce:string)=>{
  
//     let nonceExists = false;
//     "use server"
//     const user: users | null = await prisma.users.findUnique({
//         select:{nonce},
//         where: { address: address as string},
//       });
// return nonceExists;
// }