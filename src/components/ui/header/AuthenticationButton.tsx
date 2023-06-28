"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  ConnectWallet,
  useAddress,
  useAuth,
  metamaskWallet,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { getUser, createUser } from "@/api/authenticate";

export default function AuthenticationButton() {
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const auth = useAuth();
  const { data: session } = useSession();

  useEffect(() => {
    if (connectionStatus == "connected" && session == null) {
      loginWithWallet();
    }
  }, [connectionStatus]);

  async function loginWithWallet() {
    try {
      const payload = await auth?.login();

      if (connectionStatus == "connected") {
        console.log("user should be logged in =>", payload.payload.address);
        console.log("user fetch");
        const userData = await getUser(payload.payload.address);
        console.log(userData);

        const userExists = !userData.user_data ? false : true;

        if (!userExists) {
          console.log("payload:", payload);
          await createUser(payload.payload.address);

          // Then send the payload to next auth as login credentials
          // using the "credentials" provider method
          console.log("sign into nextauth");
          const data = await signIn("credentials", {
            payload: JSON.stringify(payload),
            redirect: false,
          });
        } else if (userExists) {
          const data = await signIn("credentials", {
            payload: JSON.stringify(payload),
            redirect: false,
          });
        }
      }
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <>
      {session ? null : address ? (
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
