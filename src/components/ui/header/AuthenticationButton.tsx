"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import {
  ConnectWallet,
  useAddress,
  useAuth,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import { createWalletAddressCookie, deleteCookie } from "./addressCookie";
import { getUser, createUser } from "@/api/authenticate";
import { useToast } from "@/components/shadcn/use-toast";
import { BiLogInCircle } from "react-icons/bi";

export default function AuthenticationButton() {
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const [isLoading, setIsLoading] = useState(false);

  const address = useAddress();
  const disconnect = useDisconnect();
  // const connectionStatus = useConnectionStatus();
  const cookieAddress = getCookie("wallet-address");
  const auth = useAuth();
  const { data: session } = useSession();
  const { toast } = useToast();

  async function loginWithWallet() {
    let payload: any = null;
    try {
      payload = await auth?.login();
    } catch (err: any) {
      console.log(err.code);
      toast({ title: err.code });
    }
    if (payload !== null) {
      try {
        // setIsLoading(true);
        console.log(payload);

        console.log("user should be logged in =>", payload.payload.address);
        createWalletAddressCookie(payload.payload.address);
        const userData = await getUser(payload.payload.address);
        // console.log(payload.payload);
        const userExists = !userData.user_data ? false : true;

        if (!userExists) {
          // console.log("payload:", payload);
          const create = await createUser(payload.payload.address);
          //Check if user was successfully created in database
          if (create.status == 200) {
            toast({
              title: "User Successfully Registered.",
            });
            console.log("sign into nextauth");
            //  Send the payload to next auth as login credentials
            // using the "credentials" provider method
            const data = await signIn("credentials", {
              payload: JSON.stringify(payload),
              redirect: false,
            });
          } else {
            throw new Error("Failed to create user in database.");
          }
        } else if (userExists) {
          const data = await signIn("credentials", {
            payload: JSON.stringify(payload),
            redirect: false,
          });
        }
        toast({
          title: "User Successfully Signed In.",
        });

        // setCurrentAccount(payload.payload.address);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          title: error,
        });
      }
    }
  }

  return (
    <>
      {session || isLoading ? null : address ? (
        <button
          onClick={() => {
            try {
              loginWithWallet();
            } catch (err) {
              console.log("Error:", err);
            }
          }}
          className=" border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded border bg-green/[.8] transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-green/[.8]"
        >
          <BiLogInCircle style={{ strokeWidth: 1 }} />
        </button>
      ) : (
        <ConnectWallet
          className="connect-wallet-btn hover:opacity-60 hover:animate-[wiggle_1s_ease-in-out_infinite] mt-2 text-md"
          btnTitle="Connect Wallet"
          auth={{
            loginOptional: true,
          }}
        />
      )}
    </>
  );
}
