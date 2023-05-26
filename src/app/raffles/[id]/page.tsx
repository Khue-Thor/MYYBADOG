"use client";

import Meta from "@/components/meta";
import Download from "@/components/blog/download";

import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

export default async function Page() {
  return (
    <>
      <section className="relative px-6 pb-8 py-24 md:pt-32">
        <Meta
          title="View"
          keyword="baddogs, baddogs nft, nft marketplace"
          desc=""
        />
        <div className="max-w-screen-xl mx-auto md:px-8 md:py-4 flex w-full flex-col md:flex-row relative">
          <div className="md:w-1/3 md:mr-4 px-4 pt-4 md:pt-0 md:px-0">
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <button className="absolute top-3 right-3 p-2 flex items-center bg-white rounded-lg"></button>
              <Image
                width={400}
                height={400}
                src="https://static.nftgo.io/asset/metadata/f4154af69456cdbad797f690a4fc79d0.png"
                loading="lazy"
                alt="Image"
              />
            </div>
          </div>
          <div className="md:w-2/3 bg-accent dark:bg-offbase w-full md:rounded-2xl p-8 mt-5 md:mt-0 flex flex-col justify-between transition ">
            <div className="w-full ">
              <div className="flex flex-col md:flex-row flex-between">
                <div className="w-full">
                  <div className="flex items-center capitalize">
                    <a
                      href="https://magiceden.io/marketplace/oogy"
                      target="_blank"
                      className="font-bold text-white dark:text-purple-400/70 hover:text-lime-500 text-sm mr-1 capitalize"
                    >
                      <span className="capitalize">bdc</span>
                    </a>
                  </div>

                  <div>
                    <strong className="text-4xl pb-1 text-white">
                      BDC #000
                    </strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-7 -mt-4 inline-block text-purple-600 fill-current ml-3 cursor-pointer hover:text-purple-500"
                    >
                      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                    </svg>
                  </div>
                  <div className="flex mt-3 md:mt-1 text-sm">
                    <div className="text-white mr-8">
                      <span>NFT Floor Price:&nbsp;</span>
                    </div>
                    <div className="text-center md:text-left text-white">
                      <span>Total Ticket Value:&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="rounded ">
                  <TabsTrigger
                    className="hover:text-purple-100 data-[state=active]:bg-transparent rounded data-[state=active]:border-solid data-[state=active]:border-2 data-[state=active]:border-green data-[state=active]:text-purple-100"
                    value="details"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    className="hover:text-purple-100 data-[state=active]:bg-transparent rounded data-[state=active]:border-solid data-[state=active]:border-2 data-[state=active]:border-green data-[state=active]:text-purple-100"
                    value="participants"
                  >
                    Participants
                  </TabsTrigger>
                  <TabsTrigger
                    className="hover:text-purple-100 data-[state=active]:bg-transparent rounded data-[state=active]:border-solid data-[state=active]:border-2 data-[state=active]:border-green data-[state=active]:text-purple-100"
                    value="txns"
                  >
                    Transactions
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="py-5 border-t border-b border-gray-200 dark:border-primary">
                    <div className="grid grid-cols-1 md:grid-cols-2 font-bold gap-3 gap-y-6">
                      <div className="flex">
                        <div>
                          {" "}
                          <strong className="block text-sm text-gray-500 dark:text-purple-100/70">
                            Raffle Ended Date:{" "}
                          </strong>
                          <div className="text-xl relative dark:text-white">
                            <div className="flex items-center gap-2">
                              Tomorrow
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          {" "}
                          <strong className="block text-sm text-gray-500 dark:text-purple-100/70">
                            Ticket Cost:{" "}
                          </strong>
                          <div className="text-xl relative dark:text-white">
                            <div className="flex items-center gap-2">
                              0.2 ETH
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          {" "}
                          <strong className="block text-sm text-gray-500 dark:text-purple-100/70">
                            Raffle Start Date:{" "}
                          </strong>
                          <div className="text-xl relative dark:text-white">
                            <div className="flex items-center gap-2">Today</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          {" "}
                          <strong className="block text-sm text-gray-500 dark:text-purple-100/70">
                            Tickets Sold:{" "}
                          </strong>
                          <div className="text-xl relative dark:text-white">
                            <div className="flex items-center gap-2">45/50</div>
                          </div>
                        </div>
                      </div>
                      <div>Raffler</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="participants">
                  <Table>
                    <TableCaption>A list of recent rafflees.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Wallet</TableHead>
                        <TableHead className="text-right">Tickets</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:opacity-50 hover:bg-accent-dark">
                        <TableCell className="font-medium">Billy</TableCell>
                        <TableCell className="text-right">7</TableCell>
                      </TableRow>
                      <TableRow className="bg-purple-base hover:opacity-50 hover:bg-accent-dark">
                        <TableCell className="font-medium">Joe</TableCell>
                        <TableCell className="text-right">2</TableCell>
                      </TableRow>
                      <TableRow className="hover:opacity-50 hover:bg-accent-dark">
                        <TableCell className="font-medium">Ron</TableCell>
                        <TableCell className="text-right">1</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="txns">Transactions</TabsContent>
              </Tabs>
            </div>
            <div className="w-full border-t border-gray-200 dark:border-primary">
              <h3 className="font-bold text-purple-100">Terms & Conditions</h3>
              <ol className="list-decimal ml-5 dark:text-white">
                <li>
                  Here&apos;s a{" "}
                  <a
                    href="https://vell-sol.gitbook.io/fff_raffle_buyer_tips/"
                    target="_blank"
                    className="text-purple-100"
                  >
                    guide
                  </a>{" "}
                  to buy into raffles.
                </li>
                <li>
                  All NFT prizes are held by rafffle in escrow and can be
                  claimed by the winner or creator once the draw is done.
                </li>
                <li>Raffle tickets cannot be refunded once bought.</li>
                <li>
                  Raffle tickets will not be refunded if you did not win the
                  raffle.
                </li>
                <li>You can only buy 20% of total tickets.</li>
                <li>
                  You&apos;ll be charged 1% fees for swapping through Jupiter.
                </li>
                <li>
                  FFF receives a portion of the fees generated for anyone
                  utilizing the Raven services through our website.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* <Partners /> */}
      <Download />
    </>
  );
}
