import Image from "next/legacy/image";
import TopMint from "./top-mint";
import TopMint2 from "./top-mint2";
import TopMintBDogs from "./top-mint_BadDogs";
import TopMint3 from "./top-mint3";

interface CollectionCategoryProps {
  bgWhite: boolean;
}

// const Collection_category = ({ bgWhite = false }) => {
const CollectionCategory = ({ bgWhite }: CollectionCategoryProps) => {
  return (
    <div>
      {/* <!-- Today's Drops / Sellers / Buyers --> */}
      <section className="py-24 relative">
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
        <div className="container">
          <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-7">
            {/* @ts-expect-error Server Component */}
            <TopMint2 />
            {/* @ts-expect-error Server Component */}
            <TopMintBDogs />
            {/* @ts-expect-error Server Component */}
            <TopMint3 />
          </div>
        </div>
      </section>
      {/* <!-- end today's drops / sellers / buyers --> */}
    </div>
  );
};

export default CollectionCategory;
