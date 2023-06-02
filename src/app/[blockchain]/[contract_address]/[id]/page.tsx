import Meta from "@/components/meta";
import Likes from "@/components/likes";
import Link from "next/link";
import AuctionsDropdown from "@/components/dropdown/AuctionsDropdown";
import ItemsCountdownTimer from "@/components/ItemsCountdownTimer";
import ItemsTabs from "@/components/tabs/Tabs";
import MoreItems from "@/app/[blockchain]/[contract_address]/[id]/MoreItems";
import {
  computeRarity,
  getNFTMetadata,
  getNFTsForContract,
  NFTMetaData,
} from "@/api/alchemy";
import NFTImage from "@/app/[blockchain]/[contract_address]/[id]/NFTImage";
import PlaceBidButton from "@/app/[blockchain]/[contract_address]/[id]/PlaceBidButton";
import Tippy from "@/components/Tippy";

type Props = {
  params: { id: string; blockchain: string; contract_address: string };
};

export default async function NFTItemPage({ params }: Props) {
  const { id, blockchain, contract_address } = params;

  const [nftMetadata, nftsForContract, { rarities }] = await Promise.all([
    getNFTMetadata({
      blockchain,
      contractAddress: contract_address,
      tokenId: id,
    }),
    getNFTsForContract({
      blockchain,
      contractAddress: contract_address,
      limit: 10,
    }),
    computeRarity({
      blockchain,
      contractAddress: contract_address,
      tokenId: id,
    }),
  ]);
  const data: NFTMetaData & { likes: number; auctionTimer: number } = {
    ...nftMetadata,
    likes: 129,
    auctionTimer: 636234213,
  };

  return (
    <>
      <Meta
        title={`${id} || Xhibiter | NFT Marketplace Next.js Template`}
        keyword="baddogs, baddogs nft, nft marketplace"
        desc=""
      />
      <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}
          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <NFTImage
              image={nftMetadata.image.pngUrl}
              name={nftMetadata.name}
            />
            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="mb-3 flex">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link href="#" className="text-accent mr-2 text-sm font-bold">
                    CryptoGuysNFT
                  </Link>
                  <span
                    className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                    data-tippy-content="Verified Collection"
                  >
                    <Tippy content={<span>Verified Collection</span>}>
                      <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                        <use xlinkHref="/icons.svg#icon-right-sign"></use>
                      </svg>
                    </Tippy>
                  </span>
                </div>

                {/* <!-- Likes / Actions --> */}
                <div className="ml-auto flex items-stretch space-x-2 relative">
                  <Likes
                    like={data.likes}
                    classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
                  />

                  {/* <!-- Actions --> */}
                  <AuctionsDropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
                </div>
              </div>

              <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                {data.contract.name}
              </h1>

              <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Tippy content={<span>ETH</span>}>
                    <span className="-ml-1">
                      <svg className="icon mr-1 h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                  </Tippy>
                  <span className="text-green text-sm font-medium tracking-tight">
                    {data.contract.openSeaMetadata.floorPrice} ETH
                  </span>
                </div>
                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  Highest bid
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  1/1 available
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{data.description}</p>

              {/* <!-- Creator / Owner --> */}
              <div className="mb-8 flex flex-wrap">
                <div className="mr-8 mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href="/user/avatar_6" className="relative block">
                      {/*Todo insert image*/}
                      {/*<img*/}
                      {/*  src={creatorImage}*/}
                      {/*  alt={creatorname}*/}
                      {/*  className="rounded-2lg h-12 w-12"*/}
                      {/*  loading="lazy"*/}
                      {/*/>*/}
                      <div
                        className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                        data-tippy-content="Verified Collection"
                      >
                        <Tippy content={<span>Verified Collection</span>}>
                          <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                            <use xlinkHref="/icons.svg#icon-right-sign"></use>
                          </svg>
                        </Tippy>
                      </div>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-jacarta-400 block text-sm dark:text-white">
                      Creator <strong>10% royalties</strong>
                    </span>
                    <Link href="/user/avatar_6" className="text-accent block">
                      {/*Insert creator name*/}
                      {/*<span className="text-sm font-bold">{creatorname}</span>*/}
                    </Link>
                  </div>
                </div>

                <div className="mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href="/user/avatar_6" className="relative block">
                      {/*Todo insert image*/}
                      {/*<img*/}
                      {/*  src={ownerImage}*/}
                      {/*  alt={ownerName}*/}
                      {/*  className="rounded-2lg h-12 w-12"*/}
                      {/*  loading="lazy"*/}
                      {/*/>*/}
                      <div
                        className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                        data-tippy-content="Verified Collection"
                      >
                        <Tippy content={<span>Verified Collection</span>}>
                          <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                            <use xlinkHref="/icons.svg#icon-right-sign"></use>
                          </svg>
                        </Tippy>
                      </div>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-jacarta-400 block text-sm dark:text-white">
                      Owned by
                    </span>
                    <Link href="/user/avatar_6" className="text-accent block">
                      {/*Todo insert owner name*/}
                      {/*<span className="text-sm font-bold">{ownerName}</span>*/}
                    </Link>
                  </div>
                </div>
              </div>

              {/* <!-- Bid --> */}
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                <div className="mb-8 sm:flex sm:flex-wrap">
                  {/* <!-- Highest bid --> */}
                  <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                    <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Highest bid by{" "}
                      </span>
                      <Link
                        href="/user/avatar_6"
                        className="text-accent text-sm font-bold"
                      >
                        0x695d2ef170ce69e794707eeef9497af2de25df82
                      </Link>
                    </div>
                    <div className="mt-3 flex">
                      <figure className="mr-4 shrink-0">
                        <Link href="#" className="relative block">
                          <img
                            src="/images/avatars/avatar_4.jpg"
                            alt="avatar"
                            className="rounded-2lg h-12 w-12"
                            loading="lazy"
                          />
                        </Link>
                      </figure>
                      <div>
                        <div className="flex items-center whitespace-nowrap">
                          <Tippy content={<span>ETH</span>}>
                            <span className="-ml-1">
                              <svg className="icon mr-1 h-4 w-4">
                                <use xlinkHref="/icons.svg#icon-ETH"></use>
                              </svg>
                            </span>
                          </Tippy>
                          <span className="text-green text-lg font-medium leading-tight tracking-tight">
                            {data.contract.openSeaMetadata.floorPrice} ETH
                          </span>
                        </div>
                        <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                          ~10,864.10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Countdown --> */}
                  <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
                    <span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
                      Auction ends in
                    </span>
                    <ItemsCountdownTimer time={data.auctionTimer} />
                  </div>
                </div>

                <PlaceBidButton />
              </div>
              {/* <!-- end bid --> */}
            </div>
            {/* <!-- end details --> */}
          </div>
          <ItemsTabs
            rarities={rarities}
            blockchain={blockchain}
            contractAddress={contract_address}
            tokenId={id}
            tokenType={nftMetadata.tokenType}
          />
        </div>
      </section>
      {/* <!-- end item --> */}

      <MoreItems
        blockchain={blockchain}
        contractAddress={contract_address}
        nfts={nftsForContract}
      />
    </>
  );
}
