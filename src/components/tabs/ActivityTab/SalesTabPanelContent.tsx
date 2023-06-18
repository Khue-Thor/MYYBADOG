import React, { useEffect, useState } from "react";
import { getNFTSales } from "@/api/alchemy";

type Props = {
  blockchain: string;
  contractAddress: string;
  tokenId: string;
};

type Fee = {
  amount: number;
  symbol: string;
};

type Sale = {
  sellerFee: Fee;
  protocolFee: Fee;
  royaltyFee: Fee;
  marketplace: string;
  taker: "BUYER" | "SELLER";
  quantity: number;
};

const SalesTabPanelContent: React.FC<Props> = ({
  blockchain,
  contractAddress,
  tokenId,
}) => {
  const [data, setData] = useState<Sale[]>([]);

  const convertPrice = (price: number, decimals: number) => {
    return price / 10 ** decimals;
  };

  useEffect(() => {
    getNFTSales({ blockchain, contractAddress, tokenId }).then((nftSales) => {
      setData(
        nftSales.map((nftSale) => ({
          quantity: +nftSale.quantity,
          taker: nftSale.taker,
          marketplace: nftSale.marketplace,
          sellerFee: {
            amount: convertPrice(
              +nftSale.sellerFee.amount,
              nftSale.sellerFee.decimals
            ),
            symbol: nftSale.sellerFee.symbol,
          },
          protocolFee: {
            amount: convertPrice(
              +nftSale.protocolFee.amount,
              nftSale.protocolFee.decimals
            ),
            symbol: nftSale.protocolFee.symbol,
          },
          royaltyFee: {
            amount: convertPrice(
              +nftSale.royaltyFee.amount,
              nftSale.royaltyFee.decimals
            ),
            symbol: nftSale.royaltyFee.symbol,
          },
        }))
      );
    });
  }, [blockchain, contractAddress, tokenId]);

  return (
    <table className="scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 max-h-72 w-full overflow-y-auto rounded-lg rounded-tl-none border bg-white text-sm dark:text-white">
      <thead>
        <tr className="dark:bg-jacarta-600 bg-light-base">
          <HeaderCell>Marketplace</HeaderCell>
          <HeaderCell>Taker</HeaderCell>
          <HeaderCell>Quantity</HeaderCell>
          <HeaderCell>Seller fee</HeaderCell>
          <HeaderCell>Protocol fee</HeaderCell>
          <HeaderCell>Royalty fee</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              royaltyFee,
              protocolFee,
              sellerFee,
              taker,
              marketplace,
              quantity,
            },
            index
          ) => (
            <tr key={index}>
              <BodyCell>{marketplace}</BodyCell>
              <BodyCell>{taker}</BodyCell>
              <BodyCell>{quantity}</BodyCell>
              <BodyCell>
                {sellerFee.amount} {sellerFee.symbol}
              </BodyCell>
              <BodyCell>
                {protocolFee.amount} {protocolFee.symbol}
              </BodyCell>
              <BodyCell>
                {royaltyFee.amount} {royaltyFee.symbol}
              </BodyCell>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

type HeaderCellProps = {
  children: React.ReactNode;
};

const HeaderCell: React.FC<HeaderCellProps> = ({ children }) => {
  return (
    <th className="text-jacarta-700 dark:text-jacarta-100 py-2 px-4">
      {children}
    </th>
  );
};

type BodyCellProps = {
  children: React.ReactNode;
};

const BodyCell: React.FC<BodyCellProps> = ({ children }) => {
  return (
    <td className="dark:border-jacarta-600 border-jacarta-100 border-t py-4 px-4 text-center">
      {children}
    </td>
  );
};

export default SalesTabPanelContent;
