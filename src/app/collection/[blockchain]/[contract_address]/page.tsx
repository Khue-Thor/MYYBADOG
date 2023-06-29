// import React, { useEffect, useState } from 'react';
import Auctions_dropdown from "@/components/dropdown/Auctions_dropdown";
import Social_dropdown from "@/components/dropdown/Social_dropdown";
import Collection_items from "@/components/collection/Collection_items";
import Image from "next/image";
import Link from "next/link";
import Meta from "@/components/wallet-btn/Meta";
import { cookies } from 'next/headers'
// import { getColectionMetrics } from "@/api/nftgo";
import { getCollectionData } from "@/api/nftscan";
import formatNumber from "@/utils/formatNumber";
import { prisma } from '@/components/lib/prisma';
import { RandomLogoImage } from '@/components/profile-random-image';
import { HiBadgeCheck } from 'react-icons/hi';



interface Collection {
  id: number;
  contract_address: string;
  name: string;
  symbol: string;
  description?: string;
  website?: string;
  email?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
  instagram?: string;
  medium?: string;
  logo_url?: string;
  banner_url?: string;
  featured_url?: string;
  large_image_url?: string;
  attributes?: any; // Adjust the type according to the actual structure
  erc_type: string;
  token_type: string;
  owner: string;
  contract_deployer: string;
  verified: boolean;
  opensea_verified: boolean;
  baddogs_verified: boolean;
  rug_verified: boolean;
  sus_verified: boolean;
  royalty?: number;
  items_total: number;
  amounts_total: number;
  owners_total: number;
  opensea_floor_price: number;
  floor_price: number;
  collections_with_same_name?: any; // Adjust the type according to the actual structure
  price_symbol: string;
  average_price: number;
  lowest_price_24h: number;
  average_price_24h: number;
  volume_24h: number;
  sales_24h: number;
  highest_price: number;
  volume_1d: number;
  volume_7d: number;
  volume_30d: number;
  volume_change_1d: string;
  volume_change_7d: string;
  volume_change_30d: string;
  average_price_change_1d: string;
  average_price_change_7d: string;
  average_price_change_30d: string;
  last_ingested_at?: Date;
  last_updated_at?: Date;
}

interface DetailItem {
  id: string;
  detailsNumber: string;
  detailsText: string;
}

interface params {
  params: {
    contract_address: string;
    id: string;
    blockchain: string;
  };
}

const Collection = async ({ params }: params) => {
  // const [likesImage, setLikesImage] = useState(false);
  const likesImage = false;
  // const [collectionItemData, setCollectionItemData] = useState<NFTMetaData[]>([]);
  // const [details, setDetails] = useState<DetailItem[]>([]);
  // const [profile, setProfile] = useState<Data>();
  const contractAddress = params.contract_address;
  const nextCookies = cookies(); // Get cookies object
  const themeValue = nextCookies.get('theme')?.value || 'dark' // Find cookie


  // const id = params.id;
  // const blockchain = params.blockchain;

  // const fetchCollectionData = async () => {
  //   try {
  //     const data = await getColectionMetrics(contractAddress);

  //     return [
  //       {
  //         id: "1",
  //         detailsNumber: data?.total_supply
  //           ? formatNumber(+data.total_supply)
  //           : "No items",
  //         detailsText: "Items",
  //       },
  //       {
  //         id: "2",
  //         detailsNumber: data?.holder_num
  //           ? formatNumber(+data.holder_num)
  //           : "No holders",
  //         detailsText: "Owners",
  //       },
  //       {
  //         id: "3",
  //         detailsNumber: data.floor_price?.value
  //           ? data.floor_price.value.toFixed(2) + " ETH"
  //           : "0",
  //         detailsText: "Floor Price",
  //       },
  //       {
  //         id: "4",
  //         detailsNumber: data.volume_eth?.all
  //           ? formatNumber(+data.volume_eth.all) + " ETH"
  //           : "0",
  //         detailsText: "Volume Traded",
  //       },
  //     ];
  //   } catch (error) {
  //     console.log('failedDetailsMetrics NFTGO ->', error);
  //     try {
  //       const data = await getCollectionData(contractAddress);
  //       return [
  //         {
  //           id: "1",
  //           detailsNumber: data?.items_total
  //             ? formatNumber(+data.items_total)
  //             : "No items",
  //           detailsText: "Items",
  //         },
  //         {
  //           id: "2",
  //           detailsNumber: data?.owners_total
  //             ? formatNumber(+data.owners_total)
  //             : "No holders",
  //           detailsText: "Owners",
  //         },
  //         {
  //           id: "3",
  //           detailsNumber: data.floor_price
  //             ? data.floor_price.toFixed(2) + " ETH"
  //             : "0",
  //           detailsText: "Floor Price",
  //         },
  //         {
  //           id: "4",
  //           // ! this needs to be changed to volume traded, for now it's just the floor price * owners
  //           detailsNumber: data.floor_price
  //             ? formatNumber(+data.floor_price * +data.owners_total) + " ETH"
  //             : "0",
  //           detailsText: "Volume Traded",
  //         },
  //       ];
  //     } catch (error) {
  //       console.log('failedDetailsMetrics NFTSCAN ->', error);
  //       return [
  //         {
  //           id: "1",
  //           detailsNumber: "No items",
  //           detailsText: "Items",
  //         },
  //         {
  //           id: "2",
  //           detailsNumber: "No holders",
  //           detailsText: "Owners",
  //         },
  //         {
  //           id: "3",
  //           detailsNumber: "0",
  //           detailsText: "Floor Price",
  //         },
  //         {
  //           id: "4",
  //           detailsNumber: "0",
  //           detailsText: "Volume Traded",
  //         },
  //       ];
  //     }
  //   }
  // };
  // const fetchCollectionItems = async () => {
  //   const items = await getOneNFTForContract({ blockchain, contractAddress, startToken: +id });
  //   setCollectionItemData(items);
  // }


  const fetchBannerAndProfile = async (contractAddress: string) => {
    try {
      const collections = await prisma.collection.findMany({
        where: { contract_address: contractAddress },
        select: {
          name: true,
          symbol: true,
          description: true,
          website: true,
          email: true,
          twitter: true,
          discord: true,
          telegram: true,
          github: true,
          instagram: true,
          medium: true,
          logo_url: true,
          banner_url: true,
          featured_url: true,
          large_image_url: true,
          owner: true,
          contract_deployer: true,
          verified: true,
          opensea_verified: true,
          baddogs_verified: true,
          items_total: true,
          amounts_total: true,
          owners_total: true,
          floor_price: true,
          volume_24h: true,
        },
      });
      // processing big ints
      const processedCollections = collections.map((collection: any) => ({
        ...collection,
        items_total: Number(collection.items_total),
        amounts_total: Number(collection.amounts_total),
      }));

      if (processedCollections.length === 0) {
        const data = await getCollectionData(contractAddress);
        // setProfile(data);
        data.volume_24h = String(+data.floor_price * +data.owners_total)
        return data;
      }

      return processedCollections[0] as Collection;
    } catch (error) {
      console.log(error);

    }
  };

  const profile = await fetchBannerAndProfile(contractAddress);
  const details = profile && [
    {
      id: "1",
      detailsNumber: profile.items_total
        ? formatNumber(+profile.items_total)
        : "No items",
      detailsText: "Items",
    },
    {
      id: "2",
      detailsNumber: profile.owners_total
        ? formatNumber(+profile.owners_total)
        : "No holders",
      detailsText: "Owners",
    },
    {
      id: "3",
      detailsNumber: profile.floor_price
        ? profile.floor_price.toFixed(2) + " ETH"
        : "0",
      detailsText: "Floor Price",
    },
    {
      id: "4",
      detailsNumber: profile.volume_24h
        ? formatNumber(+profile.volume_24h) + " ETH"
        : "0",
      detailsText: "Volume Traded",
    },
  ];

  const missingBannerUrl = themeValue === "dark" ? "/images/blackbg.png" : "/images/whitebg.png";
  const missingProfileUrl = themeValue === "dark" ? "/images/baddogs-no-image-white.png" : "/images/baddogs-no-image-black.png";
  // const missingProfileUrl = '/images/baddogs-error-v2-230x230.png'
  // useEffect(() => {
  //   // fetchCollectionItems();
  //   fetchCollectionData();
  //   fetchBannerAndProfile()
  // }, [])

  // const handleLikes = () => {
  //   if (!likesImage) {
  //     setLikesImage(true);
  //   } else {
  //     setLikesImage(false);
  //   }
  // };
  const icon = true;

  return (
    <>
      <Meta title={"NFT Collection"} />

      <div className="flex flex-col">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          {profile && (
            <Image
              src={profile.banner_url || missingBannerUrl}
              alt="banner"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
              priority={true}
            />
          )}
        </div>
        {/* <!-- end banner --> */}

        {/* <!-- Profile --> */}

        {profile && (
          <section className="dark:bg-jacarta-800 bg-light-base flex flex-col">
            <div className="container">
              {/* <!-- Avatar --> */}
              <div className="left-1/2 z-10 flex -translate-y-1/2 items-center justify-center">
                {/* <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white"> */}
                <figure className="relative h-40 w-40 ">
                  {profile.logo_url ?
                    <Image
                      src={profile.logo_url || missingProfileUrl}
                      alt={profile.name}
                      fill
                      sizes="100vw"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                    />
                    : <RandomLogoImage contract={contractAddress} />
                  }
                </figure>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                    {profile.name}
                  </h2>
                  {(profile.opensea_verified || profile.baddogs_verified) && <div
                    className="flex h-6 w-6 items-center justify-center "
                    data-tippy-content="Verified Collection"
                  >
                    <svg
                      className="mt-3" style={{ color: '#1DA1F2' }}
                      fill="none"
                      viewBox="0 0 15 15"
                      stroke="currentColor"
                    >
                      <HiBadgeCheck />
                    </svg>
                  </div>}
                </div>
                <div className="mb-2">
                  <span className="text-jacarta-400 text-sm font-bold">
                    Created by{" "}
                  </span>
                  <Link
                    href="#"
                    className="text-accent text-sm font-bold"
                    legacyBehavior
                  >
                    {profile.owner}
                  </Link>
                </div>
                <div className="mb-8">
                  <span className="text-jacarta-400 text-sm font-bold">
                    Contract Address{" "}
                  </span>
                  <Link
                    href='#'
                    className="text-accent text-sm font-bold"
                    legacyBehavior
                  >
                    {profile.contract_address ? profile.contract_address : contractAddress}
                  </Link>
                </div>

                <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                  {details && details.map(({ detailsNumber, detailsText }: any, index) => {
                    return (
                      <Link
                        href="#"
                        key={index}
                        className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32"
                      >
                        <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                          {detailsNumber}
                        </div>
                        <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                          {detailsText}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">
                  {profile.description}
                </p>

                <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                  <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                    {/* <Likes data={} /> */}
                    <div
                      className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                    // onClick={() => handleLikes()}
                    >
                      <button>
                        {likesImage ? (
                          <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-heart-fill"></use>
                          </svg>
                        ) : (
                          <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-heart"></use>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                    {/* <Likes data={} /> */}
                    <div
                      className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                    // onClick={() => handleLikes()}
                    >
                      <Link
                        href={`${profile.discord}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                          <use xlinkHref={`/icons.svg#icon-discord`}></use>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                    {/* <Likes data={} /> */}
                    <div
                      className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                    // onClick={() => handleLikes()}
                    >
                      <Link
                        href={`https://www.twitter.com/${profile.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                          <use xlinkHref={`/icons.svg#icon-twitter`}></use>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                    {/* <Likes data={} /> */}
                    <div
                      className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                    // onClick={() => handleLikes()}
                    >
                      <Link
                        href={`${profile.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                          <use xlinkHref={`/icons.svg#icon-details`}></use>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  {profile.instagram && (
                    <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                      {/* <Likes data={} /> */}
                      <div
                        className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                      // onClick={() => handleLikes()}
                      >
                        <Link
                          href={`https://www.instagram.com/${profile.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group cursor-pointer"
                        >
                          <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                            <use xlinkHref={`/icons.svg#icon-instagram`}></use>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}

                  <Social_dropdown />

                  <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* <!-- end profile --> */}
      </div >
      <Collection_items
        params={{
          contract_address: contractAddress,
          profile: profile as any,
        }}
      />
    </>
  );
};

export default Collection;
