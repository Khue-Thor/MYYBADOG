import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import ProfileLinkSection from "./profile-sections/ProfileLinkSection";
import { ConnectWallet, useDisconnect } from "@thirdweb-dev/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { useToast } from "@/components/shadcn/use-toast";
import { RandomImage } from "@/components/random-image";
import ProfileWallet from "./profile-sections/ProfileWallet";
import ProfileFunds from "./profile-sections/ProfileFunds";
export default function ProfileSheet() {
  const address = getCookie("wallet-address") as string;
  const [walletAddr, setWalletAddr] = useState(address || "");
  const disconnect = useDisconnect();
  const { data: session } = useSession();
  const { toast } = useToast();

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
        <button>
          <RandomImage contract={address} size={35} />
        </button>
        {/* <button className=" border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
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
        </button> */}
      </SheetTrigger>
      <SheetContent
        position="right"
        size="sm"
        className="flex flex-col bg-accent-dark xs:w-10/12 md:w-1/3"
      >
        <SheetHeader>
          <ProfileWallet address={address} />
          {/* <div className="flex justify-between mr-5">
            <RandomImage contract={address} size={70} />
            <Image src="/images/bdco-skull-white-28x40.svg" width="36" height="52" alt='logo'></Image>
          </div>
          <div className="font-display text-jacarta-700 text-md dark:text-white text-left">{walletShortener(address, 2, 4)}</div>
          <div className="flex justify-between mr-4">
            <div>
              <div className="flex border border-jacarta-600  rounded-md pr-2">
                <div className="flex w-[110px] text-center dark:bg-jacarta-600 bg-jacarta-50 hover:text-accent font-display text-jacarta-600 text-sm dark:text-white text-left rounded-md py-2 px-2">{walletShortener(address, 4, 4)}
                  <span>
                    <AiOutlineCopy onClick={handleCopy} className="ml-2 cursor-pointer" />
                  </span>
                </div>
                <BiLinkExternal className="w-5 h-8 cursor-pointer" onClick={handleRedirect} />
              </div>
            </div>
            <button
              onClick={() => logOutAll()}
              className="w-[100px] font-display text-jacarta-700 text-sm dark:text-white text-center dark:hover:bg-jacarta-600 border border-gray-300 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center justify-center rounded-md transition-colors"
            >
              Disconnect
            </button> */}
          {/* </div> */}
          <div className="w-full pt-4 flex flex-grow"></div> <ConnectWallet />
          {/* <div className="dark:border-jacarta-600 border-jacarta-100 mx-5 mb-6 rounded-lg border p-4">
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
          </div> */}
        </SheetHeader>
        <div className="flex flex-grow flex-col justify-evenly h-3/4 mt-4">
          <ProfileLinkSection />
          <ProfileFunds address={address} />
        </div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <button
              onClick={() => logOutAll()}
              className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 mt-2 transition-colors"
            >
              <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                Disconnect
              </span>
            </button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
