"use client";
import React from "react";
import useModalStore from "@/store/modalStore";

const PlaceBidButton = () => {
  const showBidsModal = useModalStore((state) => state.showBidsModal);

  return (
    <button
      className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      onClick={showBidsModal}
    >
      Place Bid
    </button>
  );
};

export default PlaceBidButton;
