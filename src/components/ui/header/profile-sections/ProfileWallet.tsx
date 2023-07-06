import { RandomImage } from "@/components/random-image";
import walletShortener from "@/utils/walletShortener";
import Image from "next/image";
import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useToast } from "@/components/shadcn/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "@thirdweb-dev/react";
import { SheetClose } from "@/components/shadcn/sheet";
import { useTheme } from "next-themes";

export default function ProfileWallet({ address }: { address: string }) {
  const { toast } = useToast();
  const disconnect = useDisconnect();
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast({
      variant: "info",
      title: "Copied to clipboard",
    });
  };
  const handleRedirect = () => {
    window.open(`https://etherscan.io/address/${address}`, "_blank");
  };

  const logOutAll = () => {
    if (session) {
      signOut({ redirect: false });
      disconnect();
    }
    toast({
      variant: "info",
      title: "Signed Out",
    });
  };
  return (
    <>
      <div className="flex justify-between mr-5 pt-4">
        <RandomImage contract={address} size={70} />
        <Image
          src={`/images/bdco-skull-${
            theme == "dark" ? "white" : "dark"
          }-28x40.svg`}
          width="36"
          height="52"
          alt="logo"
        ></Image>
      </div>
      <div className="font-display text-jacarta-700 text-md dark:text-white text-left">
        {walletShortener(address, 2, 4)}
      </div>

      <div className="flex justify-between">
        <div>
          <div className="flex border border-jacarta-600  rounded-md pr-2">
            <div className="flex w-[110px] text-center dark:bg-jacarta-600 bg-jacarta-50 hover:text-accent font-display text-jacarta-600 text-sm dark:text-white text-left rounded-md py-2 px-2">
              {walletShortener(address, 4, 4)}
              <span>
                <AiOutlineCopy
                  onClick={handleCopy}
                  className="ml-2 cursor-pointer"
                />
              </span>
            </div>
            <BiLinkExternal
              className="w-5 h-8 ml-2 cursor-pointer"
              onClick={handleRedirect}
            />
          </div>
        </div>
        <SheetClose asChild>
          <button
            onClick={() => logOutAll()}
            className="w-[100px] font-display text-jacarta-700 text-sm dark:text-white text-center dark:hover:bg-jacarta-600 border border-gray-300 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center justify-center rounded-md transition-colors"
          >
            Disconnect
          </button>
        </SheetClose>
      </div>
    </>
  );
}
