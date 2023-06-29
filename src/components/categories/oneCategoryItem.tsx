/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import CategoryItemPlaceholder from './category-item-placeholder';
import { type } from 'os';
import { Data } from '@/api/nftscan';

type Item = {
  id: number;
  image: string;
  title: string;
  price: string;
  bidLimit: string;
  bidCount: string;
  likes: string;
  creator: string;
  owner: {
    name: string;
    image: string;
  };
  contractAddress: string;
  blockchain: string;
}

type params = {
  params: {
    profile: Data
    item: Item | null
  }
}
// use item im param
const OneCategoryItem = ({ params }: params) => {
  const { item } = params;
  const dispatch = useDispatch();
  if (!item) return null;
  const {
    id,
    image,
    title,
    price,
    bidLimit,
    bidCount,
    likes,
    creator,
    owner,
    contractAddress,
    blockchain
  } = item;

  interface ImageWithFallbackProps {
    imageURL: string;
    fallbackImageURL: string;
  }

  const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ imageURL, fallbackImageURL }) => {
    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      event.currentTarget.src = fallbackImageURL;
    };

    return <img src={imageURL} onError={handleError} alt="Image with fallback" className="w-full h-[230px] rounded-[0.625rem] object-cover" />;
  };
  return (
    <div>

      <div className="">
        <article key={id}>
          <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
            <figure className="relative">
              <Link href={`/${blockchain}/${contractAddress}/${id}`}>
                {
                  image ?
                    <ImageWithFallback
                      imageURL={image as string}
                      fallbackImageURL="/images/baddogs-error-v2-230x230.png"
                    />
                    : <CategoryItemPlaceholder params={{ url: params.profile.logo_url }} />
                }
              </Link>
              <Likes like={likes} />

              <div className="absolute left-3 -bottom-3">
                {/* <div className="flex -space-x-2">
                  <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                    <Tippy content={<span>creator: {creator}</span>}>
                      <img
                      src={creator}
                      alt="creator"
                        className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                        />
                    </Tippy>
                    
                    </Link>
                    <Link href={`/${blockchain}/${contractAddress}/${id}`}>
                    
                    <Tippy content={<span>creator: {owner.name}</span>}>
                    {
                      <img
                      src={owner.image}
                      alt="owner"
                      // layout="fill"
                      className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                      />
                    }
                    </Tippy>
                    
                    </Link>
                  </div> */}
              </div>
            </figure>
            <div className="mt-7 flex items-center justify-between">
              <Link href={`/${blockchain}/${contractAddress}/${id}`}>

                <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                  {title}
                </span>

              </Link>

              {/* auction dropdown  */}
              <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " />
            </div>
            <div className="mt-2 text-sm">
              <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                {price}
              </span>
              <span className="dark:text-jacarta-300 text-jacarta-500">
                {bidCount}/{bidLimit}
              </span>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                className="text-accent font-display text-sm font-semibold"
                onClick={() => dispatch(buyModalShow())}
              >
                Buy now
              </button>
              <Link href={`/${blockchain}/${contractAddress}/${id}`} className="group flex items-center">

                <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                  <use xlinkHref="/icons.svg#icon-history"></use>
                </svg>
                <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                  View History
                </span>

              </Link>
            </div>
          </div>
        </article>
      </div>
      {/* <button
        className="w-1/4 text-accent font-display text-base font-semibold margin-auto mt-8"
        onClick={loadMoreItems}
      >
        Load More
      </button> */}
    </div >
  );
};

export default OneCategoryItem;
