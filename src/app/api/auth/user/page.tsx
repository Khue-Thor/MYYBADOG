"use server";
import { createSupabaseClient } from "@/lib/createSupabase";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";

// import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

async function signInWithEmail() {
  const { auth } = createClientComponentClient();
  const { data, error } = await auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });

  if (error) {
    console.log(error);
  } else {
    console.log("SUCCESS!");
    return data;
  }
  redirect("/");
}
export default async function Page() {
  // const supabase = createServerComponentSupabaseClient({
  //   headers,
  //   cookies,
  // });

  signInWithEmail();
}
