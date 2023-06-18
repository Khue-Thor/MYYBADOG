import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TabContent } from "@/components/tabs/ActivityTab/TabContent";
import BidsTabPanelContent from "@/components/tabs/ActivityTab/BidsTabPanelContent";
import tabList from "@/components/tabs/ActivityTab/tabList";
import SalesTabPanelContent from "@/components/tabs/ActivityTab/SalesTabPanelContent";

type Props = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

const ActivityTab: React.FC<Props> = ({
  blockchain,
  contractAddress,
  tokenId,
}) => {
  const [tabIndex, setTabIndex] = useState(3);

  return (
    <>
      {/* <!-- Activity --> */}
      <Tabs
        className={"tab-pane fade"}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="flex flex-wrap dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 bg-light-base border border-b-0 px-4 pt-5 pb-2.5">
          {tabList.map((tab, index) => (
            <Tab key={tab.label}>
              <TabContent
                label={tab.label}
                icon={tab.icon}
                active={tabIndex === index}
              />
            </Tab>
          ))}
        </TabList>
        <TabPanel>Listing panel</TabPanel>
        <TabPanel>
          <BidsTabPanelContent />
        </TabPanel>
        <TabPanel>Transfers panel</TabPanel>
        <TabPanel>
          <SalesTabPanelContent
            blockchain={blockchain}
            contractAddress={contractAddress}
            tokenId={tokenId}
          />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ActivityTab;
