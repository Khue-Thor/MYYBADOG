"use client";
import React from "react";
import OriginalTippy, { TippyProps } from "@tippyjs/react";

const Tippy: React.FC<TippyProps> = (props) => {
  return <OriginalTippy {...props} />;
};

export default Tippy;
