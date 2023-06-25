"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  ConnectWallet,
  useAddress,
  useUser,
  useAuth,
  useDisconnect,
  useConnect,
  metamaskWallet,
  useSigner,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { RiLoginBoxLine } from "react-icons/ri";
const metamaskConfig = metamaskWallet();

export default function AuthenticationButton() {
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const connectionStatus = useConnectionStatus();
  const address = useAddress() || "";
  const disconnect = useDisconnect();
  const { user, isLoggedIn, isLoading } = useUser();
  const auth = useAuth();
  const { data: session } = useSession();
  const connect = useConnect();
  // if (connectionStatus == "connected") {
  //   loginWithWallet();
  // }
  useEffect(() => {
    if (connectionStatus == "connected" && session == null) {
      loginWithWallet();
    }
  }, [connectionStatus]);
  const logOutAll = () => {
    if (session) {
      signOut();
      disconnect();
    }
  };

  async function loginWithWallet() {
    try {
      const payload = await auth?.login();
      // const options: RequestInit = {
      //   method: "POST",
      //   headers: {
      //     accept: "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // };
      // const res = await fetch(`/api/thirdweb/login`, options);
      // if (!res.ok) {
      //   // This will activate the closest `error.js` Error Boundary
      //   throw new Error("Failed to fetch data");
      // }
      if (isLoggedIn) {
        console.log("user should be logged in =>", user);
        console.log(payload);
        const userData = await getUser();
        const userExists = (await userData.message) ? false : true;

        if (!userExists) {
          await createUser(payload.payload.address);
        }

        // Then send the payload to next auth as login credentials
        // using the "credentials" provider method
        const data = await signIn("credentials", {
          payload: JSON.stringify(payload),
          redirect: false,
        });
      }
    } catch (error) {
      window.alert(error);
    }
  }
  //get user from supabase to see if wallet address already exists
  const getUser = async () => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    try {
      const res = await fetch(`/api/user/find?address=${address}`, options);
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async (address: string) => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({ address: address.toString() }),
      };
      const res = await fetch("/api/user/create", options);
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(
          ("Something went wrong when creating user with wallet:" +
            address) as string
        );
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {session ? (
        <>
          <button
            className="bg-red text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between h-10 text-base dark:text-white lg:px-5 rounded p-2"
            onClick={() => logOutAll()}
          >
            {" "}
            Logout <RiLoginBoxLine />
          </button>
          <button
            className="bg-red text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between h-10 text-base dark:text-white lg:px-5 rounded p-2"
            onClick={() => console.log(user)}
          >
            Test
          </button>
        </>
      ) : (
        // : address ? (
        //   <>
        // <button
        //   className="bg-green text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between h-10 text-base dark:text-white lg:px-5 rounded p-2"
        //   onClick={() => loginWithWallet()}
        // >
        //   {" "}
        //   Web2 Login <RiLoginBoxLine />
        // </button>
        //     <ConnectWallet />
        //   </>
        // )
        <ConnectWallet
          className="connect-wallet-btn hover:opacity-60 hover:animate-[wiggle_1s_ease-in-out_infinite] mt-2 text-md"
          btnTitle="Connect Wallet"
          auth={{
            loginOptional: true,
          }}
        />
      )}
    </div>
  );
}
