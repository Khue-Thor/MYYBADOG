import { RandomImage } from "@/components/random-image";
import walletShortener from "@/utils/walletShortener";
import Image from "next/image";
import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useToast } from "@/components/shadcn/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "@thirdweb-dev/react";
import { Button } from "@/components/shadcn/button";
import { Ethereum } from "@thirdweb-dev/chain-icons";

export default function ProfileWallet({ address }: { address: string }) {
  const { toast } = useToast();
  const disconnect = useDisconnect();
  const { data: session } = useSession();

  return (
    <>
      <div className="flex flex-col  w-full  mt-4 pt-4 ">
        <div className="text-sm text-gray-100">Funds in Wallet</div>
        <div className="border-gray-300 border border-spacing-2 p-2 rounded-lg mb-2 pb-2">
          {/* Row start */}
          <div className="mb-2 border-b-[1px] border-gray-100 ">
            <div className="flex flex-row items-start p-2 hover:bg-accent hover:cursor-pointer rounded-lg">
              <div className="flex-grow flex-row inline-flex gap-2">
                <div className="rounded-full h-8 w-8 bg-accent-lighter flex justify-center items-center self-center">
                  <div className="h-3 w-3 -translate-y-1">
                    <Ethereum />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="font-bold">BDC</div>
                  <div className="text-xs font-medium opacity-75 -translate-y-0.5">
                    $888.00
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-md">0</div>
            </div>
            {/* Row End */}
            <div className="flex flex-row items-start p-2 hover:bg-accent hover:cursor-pointer rounded-lg">
              <div className="flex-grow flex-row inline-flex gap-2">
                <div className="rounded-full h-8 w-8 bg-accent-lighter flex justify-center items-center self-center">
                  <div className="h-3 w-3 -translate-y-1">
                    <Ethereum />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="font-bold">ETH</div>
                  <div className="text-xs font-medium opacity-75 -translate-y-0.5">
                    $2,333.00
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-md">0</div>
            </div>
            <div className="flex flex-row items-start p-2 hover:bg-accent hover:cursor-pointer rounded-lg">
              <div className="flex-grow flex-row inline-flex gap-2">
                <div className="rounded-full h-8 w-8 bg-accent-lighter flex justify-center items-center self-center">
                  <div className="h-3 w-3 -translate-y-1">
                    <Ethereum />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="font-bold">WETH</div>
                  <div className="text-xs font-medium opacity-75 -translate-y-0.5">
                    $1,533.00
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-md">0</div>
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <Button
              className={`w-full flex align-middle items-center bg-accent-light hover:opacity-70`}
              variant="default"
            >
              {" "}
              Add Funds
            </Button>
            <Button
              className={`w-full flex align-middle items-center bg-accent-light hover:opacity-70`}
              variant="default"
            >
              {`Swap ETH <> WETH`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
