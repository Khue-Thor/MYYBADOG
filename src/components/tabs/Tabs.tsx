"use client";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import OfferTab from "./OfferTab";
import Properties from "./Properties";
import ActivityTab from "./ActivityTab";
import PriceHistory from "./PriceHistory";
import { Rarity } from "@/api/alchemy";
import DetailsTab from "@/components/tabs/DetailsTab";

type Props = {
  rarities: Rarity[];
  contractAddress: string;
  tokenId: string;
  tokenType: string;
  blockchain: string;
};

const ItemsTabs: React.FC<Props> = ({
  rarities,
  contractAddress,
  tokenType,
  tokenId,
  blockchain,
}) => {
  const [tabsActive, setTabsActive] = useState(1);
  const tabsHeadText = [
    {
      id: 1,
      text: "Offers",
      icon: "offers",
    },
    {
      id: 2,
      text: "properties",
      icon: "properties",
    },
    {
      id: 3,
      text: "details",
      icon: "details",
    },
    {
      id: 4,
      text: "activities",
      icon: "activity",
    },
    {
      id: 5,
      text: "price history",
      icon: "price",
    },
  ];
  return (
    <>
      <div className="scrollbar-custom mt-14 overflow-x-auto rounded-lg">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="min-w-fit tabs">
          <TabList className="nav nav-tabs flex items-center">
            {/* <!-- Offers --> */}
            {tabsHeadText.map(({ id, text, icon }) => {
              return (
                <Tab className="nav-item bg-transparent" key={id}>
                  <button
                    className={
                      tabsActive === id
                        ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                        : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    }
                    onClick={() => setTabsActive(id)}
                  >
                    <svg className="icon mr-1 h-5 w-5 fill-current">
                      <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                    </svg>
                    <span className="font-display text-base font-medium">
                      {text}
                    </span>
                  </button>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel className="tab-content">
            <OfferTab />
          </TabPanel>
          <TabPanel>
            <Properties rarities={rarities} />
          </TabPanel>
          <TabPanel>
            <DetailsTab
              contractAddress={contractAddress}
              blockchain={blockchain}
              tokenType={tokenType}
              tokenId={tokenId}
            />
          </TabPanel>
          <TabPanel>
            <ActivityTab />
          </TabPanel>
          <TabPanel>
            <PriceHistory classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6" />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ItemsTabs;
