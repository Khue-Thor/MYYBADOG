"use client";
import React, { useEffect, useState } from "react";
import Tippy from "@/components/Tippy";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  userId: string;
};

const UserId: React.FC<Props> = ({ userId }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <Tippy
      hideOnClick={false}
      content={copied ? <span>copied</span> : <span>copy</span>}
    >
      <button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
        <CopyToClipboard text={userId} onCopy={() => setCopied(true)}>
          <span>{userId}</span>
        </CopyToClipboard>
      </button>
    </Tippy>
  );
};

export default UserId;
