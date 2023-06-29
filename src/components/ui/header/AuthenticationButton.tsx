"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  ConnectWallet,
  useAddress,
  useAuth,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import { createWalletAddressCookie, deleteCookie } from "./addressCookie";
import { getUser, createUser } from "@/api/authenticate";

export default function AuthenticationButton() {
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const [isLoading, setIsLoading] = useState(false);
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const disconnect = useDisconnect();

  const auth = useAuth();
  const { data: session } = useSession();

  useEffect(() => {
    if (connectionStatus == "connected" && session == null) {
      loginWithWallet();
    } else if (connectionStatus == "disconnected") {
      deleteCookie("wallet-address");
    }
  }, [connectionStatus]);

  async function loginWithWallet() {
    try {
      setIsLoading(true);
      const payload = await auth?.login();

      if (connectionStatus == "connected") {
        console.log("user should be logged in =>", payload.payload.address);
        createWalletAddressCookie(payload.payload.address);
        const userData = await getUser(payload.payload.address);
        console.log(payload.payload);
        const userExists = !userData.user_data ? false : true;

        if (!userExists) {
          // console.log("payload:", payload);
          const create = await createUser(payload.payload.address);
          //Check if user was successfully created in database
          if (create.status == 200) {
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
      } else {
        await disconnect();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      window.alert(error);
    }
  }

  return (
    <>
      {session || isLoading ? null : address ? (
        <button onClick={() => loginWithWallet()}>Login</button>
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
