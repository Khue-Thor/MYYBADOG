import Link from "next/link";
import React, { useEffect, useState } from "react";
import { computeRarity, Rarity } from "@/api/alchemy";

type Props = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

const Properties: React.FC<Props> = ({
  blockchain,
  contractAddress,
  tokenId,
}) => {
  const [rarities, setRarities] = useState<Rarity[]>([]);

  useEffect(() => {
    computeRarity({
      blockchain,
      contractAddress,
      tokenId,
    }).then((data) => {
      setRarities(data.rarities);
    });
  }, [blockchain, contractAddress, tokenId]);

  return (
    <>
      {/* <!-- Properties --> */}
      <div
        className="tab-pane fade"
        id="properties"
        role="tabpanel"
        aria-labelledby="properties-tab"
      >
        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {rarities.map((rarity) => {
              return (
                <Link
                  href="#"
                  key={rarity.traitType}
                  className="dark:bg-jacarta-800 dark:border-jacarta-600 bg-light-base rounded-2lg border-jacarta-100 flex flex-col space-y-2 border p-5 text-center transition-shadow hover:shadow-lg"
                >
                  <span className="text-accent text-sm uppercase">
                    {rarity.traitType}
                  </span>
                  <span className="text-jacarta-700 text-base dark:text-white">
                    {rarity.value}
                  </span>
                  <span className="text-jacarta-400 text-sm">{`${(
                    rarity.prevalence * 100
                  ).toFixed(2)}% have this trait`}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
