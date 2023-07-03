import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import {
  ConnectWallet,
  useAddress,
  useAuth,
  useDisconnect,
  useConnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import Link from "next/link";
import { useToast } from "@/components/shadcn/use-toast";
export default function ProfileSheet() {
  const address = getCookie("wallet-address");
  const [walletAddr, setWalletAddr] = useState(address || "");
  // const shortenedAddress = address.substring(0, 17).concat("...");
  const disconnect = useDisconnect();
  const { data: session } = useSession();
  const { toast } = useToast();
  //cannot use useAddress() because it loses state on refresh
  // const address = useAddress() || "";

  const logOutAll = () => {
    if (session) {
      signOut({ redirect: false });
      disconnect();
    }
    toast({
      title: "Signed Out",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className=" border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent
        position="right"
        size="sm"
        className="bg-accent-dark xs:w-10/12 md:w-1/3"
      >
        <SheetHeader>
          <SheetTitle>{walletAddr}</SheetTitle>
          <div className="dark:border-jacarta-600 border-jacarta-100 mx-5 mb-6 rounded-lg border p-4">
            <span className="dark:text-jacarta-200 text-sm font-medium tracking-tight">
              Balance
            </span>
            <div className="flex items-center">
              <svg className="icon icon-ETH -ml-1 mr-1 h-[1.125rem] w-[1.125rem]">
                <use xlinkHref="/icons.svg#icon-ETH" />
              </svg>
              <span className="text-green text-lg font-bold">10 ETH</span>
            </div>

            <div className="pt-2 pl-4 text-xs w-24 text-jacarta-900 inline dark:text-white font-bold">
              Next: <span>40 EXP</span>{" "}
              <progress className="pt-2" max="100" value="70"></progress>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <button
              onClick={() => logOutAll()}
              className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors"
            >
              <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                Sign out
              </span>
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
