import { signIn, signOut, useSession } from "next-auth/react";
import {
  ConnectWallet,
  useAddress,
  useAuth,
  useDisconnect,
  useConnect,
} from "@thirdweb-dev/react";
import { RiLoginBoxLine } from "react-icons/ri";

export default function AuthenticationButton() {
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const address = useAddress();
  const disconnect = useDisconnect();
  const auth = useAuth();
  const { data: session } = useSession();

  const logOutAll = () => {
    if (session && address) {
      signOut();
      disconnect();
    }
  };

  async function loginWithWallet() {
    try {
      // Prompt the user to sign a login with wallet message
      const payload = await auth?.login();

      // Then send the payload to next auth as login credentials
      // using the "credentials" provider method
      const data = await signIn("credentials", {
        payload: JSON.stringify(payload),
        redirect: false,
      });
      console.log("Signed in", session);
    } catch (error) {
      window.alert(error);
    }
  }
  //function used to test APIs
  const getRaffle = async () => {
    const id = 161;
    try {
      const res = await fetch("/api/raffles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
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
  return (
    <div>
      {session ? (
        <button
          className="bg-red text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 rounded p-2"
          onClick={() => logOutAll()}
        >
          {" "}
          Logout <RiLoginBoxLine />
        </button>
      ) : address ? (
        <>
          <button
            className="bg-green text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 rounded p-2"
            onClick={() => loginWithWallet()}
          >
            {" "}
            Web2 Login <RiLoginBoxLine />
          </button>
          <button onClick={() => getRaffle()}>Test</button>
        </>
      ) : (
        <ConnectWallet
          className="connect-wallet-btn hover:opacity-60 hover:animate-[wiggle_1s_ease-in-out_infinite] mt-2 text-md"
          btnTitle="Connect Wallet"
        />
      )}
    </div>
  );
}
