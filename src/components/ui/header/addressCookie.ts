'use server'
 
import { cookies } from 'next/headers'
 
export async function createWalletAddressCookie(data:any) {
  cookies().set('wallet-address', data)
  // or

}
export async function deleteCookie(keyName:any) {
    cookies().set(keyName, "");
    // or
  
  }