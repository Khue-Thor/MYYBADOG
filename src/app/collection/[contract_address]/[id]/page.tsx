'use client'

import React, { useEffect, useState } from 'react';
import Auctions_dropdown from '../../../../components/dropdown/Auctions_dropdown';
import Social_dropdown from '../../../../components/dropdown/Social_dropdown';
import Collection_items from '../../../../components/collection/Collection_items';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Head from 'next/head';
import Meta from '@/components/wallet-btn/Meta';
import { getColectionMetrics } from '@/api/nftgo';
import { NFTMetaData, getNFTsForContract } from '@/api/alchemy';

interface DetailItem {
  id: string;
  detailsNumber: string;
  detailsText: string;
}

interface params {
  params: {
    contract_address: string;
    id: string;
  }
}

const Collection = ({ params }: params) => {
  const [likesImage, setLikesImage] = useState(false);
  const [collectionItemData, setCollectionItemData] = useState<NFTMetaData[]>([]);
  const [details, setDetails] = useState<DetailItem[]>([]);
  const contractAddress = params.contract_address;
  const id = params.id;
  const blockchain = 'eth-mainnet'

  const fetchCollectionData = async () => {
    const data = await getColectionMetrics(contractAddress);
    setDetails([{
      id: '1',
      detailsNumber: formatNumber(+data.total_supply),
      detailsText: 'Items'
    }, {
      id: '2',
      detailsNumber: formatNumber(+data.holder_num),
      detailsText: 'Owners'
    }, {
      id: '3',
      detailsNumber: data.floor_price.value.toFixed(2),
      detailsText: 'Floor Price'
    }, {
      id: '4',
      detailsNumber: formatNumber(+data.volume_eth.all),
      detailsText: 'Volume Traded'
    }])
  }

  const fetchCollectionItems = async () => {
    const items = await getNFTsForContract({ blockchain, contractAddress, limit: 8 });
    setCollectionItemData(items);
  }

  useEffect(() => {
    fetchCollectionItems();
    fetchCollectionData();
  }, [])

  function formatNumber(number: number): string {
    if (number < 100) return number.toString();
    return (number / 1000).toFixed(0) + 'K'
  }

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };
  const icon = true

  return <>
    <Meta title={'NFT Collection'} />

    <div className="pt-[5.5rem] lg:pt-24">
      {/* <!-- Banner --> */}
      <div className="relative h-[300px]">
        {
          collectionItemData.length > 0 &&
          <Image
            src={collectionItemData[0].image.cachedUrl}
            alt="banner"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        }
      </div>
      {/* <!-- end banner --> */}

      {/* <!-- Profile --> */}

      {collectionItemData.length > 0 && collectionItemData
        .filter((item) => {
          return item.tokenId === id
        }).map((item) => {
          const { tokenId, contract: { name, openSeaMetadata: { description }, contractDeployer }, image } = item;

          return (
            <section key={tokenId} className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
              {/* <!-- Avatar --> */}
              <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
                  <Image
                    src={image.cachedUrl}
                    alt={name}
                    layout="fill"
                    objectFit="contain"
                    className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                  />
                  <div
                    className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                    data-tippy-content="Verified Collection"
                  >
                    {icon && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-[.875rem] w-[.875rem] fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                      </svg>
                    )}
                  </div>
                </figure>
              </div>

              <div className="container">
                <div className="text-center">
                  <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                    {name}
                  </h2>
                  <div className="mb-8">
                    <span className="text-jacarta-400 text-sm font-bold">Created by </span>
                    <Link
                      href="#"
                      className="text-accent text-sm font-bold"
                      legacyBehavior>
                      {contractDeployer}
                    </Link>
                  </div>

                  <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                    {details.map(({ id, detailsNumber, detailsText }: any) => {
                      return (
                        (<Link
                          href="#"
                          key={id}
                          className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">

                          <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                            {detailsNumber}
                          </div>
                          <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                            {detailsText}
                          </div>

                        </Link>)
                      );
                    })}
                  </div>

                  <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">{description}</p>

                  <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                    <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                      {/* <Likes data={} /> */}
                      <div
                        className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                        onClick={() => handleLikes()}
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

                    <Social_dropdown />

                    <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      {/* <!-- end profile --> */}
    </div>
    <Collection_items />
  </>;
};

export default Collection;