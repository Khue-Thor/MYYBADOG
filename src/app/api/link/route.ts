import { NextRequest, NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import { createSupabaseServer } from "@/lib/createSupabaseAdmin";
import { cookies } from 'next/headers';

export async function POST(req:Request){
  console.log('in link');
  // const cookieStore = cookies();

  const supabase = createSupabaseServer();

  const { payload, access_token } = await req.json();

  // Get the user from our database using the client side access token
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser(access_token);
  // let metadata = user?.user_metadata
  // console.log(metadata)
  if (!user) {
    return NextResponse.json({status:400, error: userErr });
  }

  // Verify that the signed login payload is valid
  const { address, error: verifyErr } = await verifyLogin(
    process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
    payload
  );
  if (!address) {
    return NextResponse.json({status:400, error: verifyErr });
  }

  // Update the user's address in our database
  console.log("updating user:")
  const { error: updateErr } = await supabase.auth.admin.updateUserById(
    user.id,
    {
      user_metadata: { address: address.toLowerCase() },
    }
  );
  if (updateErr) {
    return NextResponse.json({ status:400,error: updateErr });
  }

  // cookieStore.set('access_token',access_token);

  

  return NextResponse.json({status:200});
};