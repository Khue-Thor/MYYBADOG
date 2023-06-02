import React from "react";

type Props = {
  contractAddress: string;
  tokenId: string;
  tokenType: string;
  blockchain: string;
};

const DetailsTab: React.FC<Props> = ({
  contractAddress,
  blockchain,
  tokenType,
  tokenId,
}) => {
  return (
    <div
      className="tab-pane fade"
      id="details"
      role="tabpanel"
      aria-labelledby="details-tab"
    >
      <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
        <div className="mb-2 flex items-center">
          <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
            Contract Address:
          </span>
          <a href="#" className="text-accent">
            {contractAddress}
          </a>
        </div>
        <div className="mb-2 flex items-center">
          <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
            Token ID:
          </span>
          <span
            className="js-copy-clipboard text-jacarta-700 cursor-pointer select-none dark:text-white"
            data-tippy-content="Copy"
          >
            {tokenId}
          </span>
        </div>
        <div className="mb-2 flex items-center">
          <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
            Token Standard:
          </span>
          <span className="text-jacarta-700 dark:text-white">{tokenType}</span>
        </div>
        <div className="flex items-center">
          <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
            Blockchain:
          </span>
          <span className="text-jacarta-700 dark:text-white">{blockchain}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
