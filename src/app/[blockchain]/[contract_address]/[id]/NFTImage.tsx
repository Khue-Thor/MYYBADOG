"use client";
import React, { useState } from "react";
import defaultNFTImage from "@/public/images/case-studies/case_study_4.jpg";
import Image from "next/image";

type Props = {
  image: string;
  name: string | null;
};

const NFTImage: React.FC<Props> = ({ image, name }) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <figure className="mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full h-96 md:h-auto">
      <button
        className="w-full relative h-full"
        onClick={() => {
          setImageModal(true);
        }}
      >
        <Image
          src={image || defaultNFTImage}
          alt={`${name} NFT image`}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1025px) 40vw, 50vw"
        />
      </button>

      {/* <!-- Modal --> */}
      <div className={imageModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center rounded-2xl w-full relative">
          <Image
            src={image || defaultNFTImage}
            alt={`${name} NFT image`}
            fill
            sizes={"100vw"}
            className="object-cover rounded-2xl"
          />
        </div>

        <button
          type="button"
          className="btn-close absolute top-6 right-6"
          onClick={() => {
            setImageModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-6 w-6 fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </button>
      </div>
      {/* <!-- end modal --> */}
    </figure>
  );
};

export default NFTImage;
