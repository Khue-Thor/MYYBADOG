'use client'
import React from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const RandomImage = ({ contract, size }: { contract: string, size: number }) => {
  return (
    <div className="dark:border-jacarta-600 rounded-full border-[5px] border-white" style={{ width: `${size + 10}px`, height: `${size + 10}px` }}>
      <MetaMaskAvatar address={contract} size={size} />
    </div>
  )
}