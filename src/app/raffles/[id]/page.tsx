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
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/client";

// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

async function getData(id: number) {
  const { data, error } = await supabase
    .from("raffles") // the table is not empty
    .select()
    .eq("id", id);

  if (error) {
    console.log("error", error);
    return { error: true };
  }
  return data;
}

export default async function Page() {
  const router = useRouter();
  const raffleId = parseInt(
    usePathname().substring(usePathname().lastIndexOf("/") + 1)
  );
  const supaData: any = await getData(raffleId);
  const {
    id,
    created_at,
    created_buy,
    end_date,
    favourite_count,
    max_tickets,
    name,
    nft_address,
    nft_image,
    participant_list,
    raffle_cost,
    sold_tickets,
    start_date,
    token_id,
    transaction_list,
    raffler,
  } = supaData[0];

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
                      {name}#{token_id}
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
                <div className="flex justify-between md:justify-start md:flex-col mt-3 md:mt-0 gap-x-8 md:gap-x-0 text-sm">
                  <button
                    className="flex items-center text-purple-600 hover:opacity-80 font-bold ml-1"
                    onClick={() => router.push("/raffles")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192 512"
                      className="w-2 mr-1 fill-current"
                    >
                      <path d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"></path>
                    </svg>
                    <span className="ml-1">Back</span>
                  </button>
                  <button className="flex items-center text-purple-600 hover:opacity-80 font-bold my-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 mr-1 fill-current"
                    >
                      <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                    </svg>{" "}
                    Share
                  </button>
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
                              {end_date}
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
                              <span>{raffle_cost} ETH </span>
                              <Image
                                src="/images/eth-icon.svg"
                                alt=""
                                height={100}
                                width={100}
                                className="h-3 w-3"
                              />
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
                            <div className="flex items-center gap-2">
                              {start_date}
                            </div>
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
                            <div className="flex items-center gap-2">
                              {max_tickets - sold_tickets}/{max_tickets}
                            </div>
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
