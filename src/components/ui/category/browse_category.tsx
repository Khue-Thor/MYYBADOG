import React from "react";
import { HeadLine } from "@/components/component";
// import Browse_category_carousel from "../carousel/Browse_category_carousel";
import Image from "next/image";

interface BrowseCategoryProps {
  bgWhite?: boolean;
}

// const BrowseCategory = ({ bgWhite }) => {
const BrowseCategory: React.FC<BrowseCategoryProps> = ({ bgWhite }) => {
  return (
    <div>
      <section className={bgWhite ? "pt-24 pb-16 relative" : "py-24 relative"}>
        {bgWhite && (
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <Image
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full"
              layout="fill"
            />
          </picture>
        )}
        <HeadLine
          text="Browse by category"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          {/* <Browse_category_carousel /> */}
        </div>
      </section>
    </div>
  );
};

export default BrowseCategory;
