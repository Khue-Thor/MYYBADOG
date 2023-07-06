"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/shadcn/button";
import { Ethereum } from "@thirdweb-dev/chain-icons";

export default function ProfileFunds({ address }: { address: string }) {
  const [ethPrice, setEthPrice] = useState(null);
  const [wEthPrice, setWEthPrice] = useState(null);
  const [bdcPrice, setBdcPrice] = useState(null);
  async function getEthereumPrice() {
    const ethResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=weth,ethereum&vs_currencies=usd"
    );
    const data = await ethResponse.json();
    setEthPrice(data.ethereum.usd);
    setWEthPrice(data.weth.usd);
  }

  useEffect(() => {
    if (!ethPrice || !wEthPrice) {
      getEthereumPrice();
    }
  }, [ethPrice, wEthPrice]);

  return (
    <>
      <div className="flex flex-col  w-full  mt-4 pt-4 ">
        <div className="text-sm text-gray-100">Funds in Wallet</div>
        <div className="border-gray-300 border border-spacing-2 p-2 rounded-lg mb-2 pb-2">
          {/* Row start */}
          <div className="mb-2 border-b-[1px] border-gray-100 ">
            <div className="flex flex-row items-start p-2 hover:bg-accent hover:cursor-pointer rounded-lg">
              <div className="flex-grow flex-row inline-flex gap-2">
                <div className="rounded-full h-8 w-8 bg-gray-100 flex justify-center items-center self-center">
                  <div className="h-4 w-4 -translate-y-1">
                    <Image
                      src="/images/bdco-skull-dark-28x40.svg"
                      width="32"
                      height="32"
                      alt="logo"
                    ></Image>
                  </div>
                </div>
                <div className="flex-col">
                  <div className="font-bold">BDC</div>
                  <div className="text-xs font-medium opacity-75 -translate-y-0.5">
                    {bdcPrice ? `$${bdcPrice}` : "N/A"}
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
                    {ethPrice ? `$${ethPrice}` : "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-md">0</div>
            </div>
            <div className="flex flex-row items-start p-2 hover:bg-accent hover:cursor-pointer rounded-lg">
              <div className="flex-grow flex-row inline-flex gap-2">
                <div className="rounded-full h-8 w-8 bg-accent-lighter flex justify-center items-center self-center">
                  <div className="text-red h-3 w-3 -translate-y-1">
                    <Ethereum />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="font-bold">WETH</div>
                  <div className="text-xs font-medium opacity-75 -translate-y-0.5">
                    {wEthPrice ? `$${wEthPrice}` : "N/A"}
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
