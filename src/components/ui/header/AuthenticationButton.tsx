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
import { WalletIcon } from "lucide-react";

export default function AuthenticationButton() {
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
              variant: "success",
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
          variant: "success",
          title: "User Successfully Signed In.",
        });

        // setCurrentAccount(payload.payload.address);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          variant: "error",
          title: error,
        });
      }
    }
  }
  function SvgIcon(svgString: string) {
    return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
  }
  const svgIcon = `
  <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 487.6 487.6" xml:space="preserve">
  <g>
    <path d="M460.3,216.55h-11.6v-69.7c0-28.5-23.2-51.6-51.6-51.6h-10.7l0.1-25.9c0-19.2-15.6-34.8-34.8-34.8H42.3
      c-23.1,0-42,18.6-42.3,41.7c0,0.2,0,0.4,0,0.6v341.4c0,19.2,15.6,34.8,34.8,34.8h362.4c28.5,0,51.6-23.2,51.6-51.6v-69.8h11.6
      c15,0,27.2-12.2,27.2-27.2v-60.7C487.5,228.75,475.3,216.55,460.3,216.55z M42.3,58.55h309.4c5.9,0,10.8,4.8,10.8,10.7l-0.1,26
      H42.3c-10.1,0-18.3-8.2-18.3-18.3S32.2,58.55,42.3,58.55z M424.7,401.35c0,15.2-12.4,27.6-27.6,27.6H34.7
      c-5.9,0-10.8-4.8-10.8-10.8v-303.1c5.6,2.7,11.8,4.2,18.4,4.2h354.8c15.2,0,27.6,12.4,27.6,27.6v69.7h-81.9
      c-15,0-27.2,12.2-27.2,27.2v60.7c0,15,12.2,27.2,27.2,27.2h81.9V401.35z M463.5,304.45c0,1.8-1.4,3.2-3.2,3.2H342.9
      c-1.8,0-3.2-1.4-3.2-3.2v-60.7c0-1.7,1.4-3.2,3.2-3.2h117.4c1.7,0,3.2,1.4,3.2,3.2L463.5,304.45L463.5,304.45z"/>
  </g>
  </svg>`;

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
        <div className="relative  dark:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent">
          <ConnectWallet
            className="h-10 w-10"
            style={{ minWidth: "0", zIndex: "99", opacity: 0 }}
            btnTitle=" "
            auth={{
              loginOptional: true,
            }}
          />
          <WalletIcon className="absolute hover:opacity-60 hover:cursor-pointer" />
        </div>
      )}
    </>
  );
}
