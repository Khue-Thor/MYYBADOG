'use client'
import React from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const RandomImage = ({ contract, size, border }: { contract: string, size: number, border: boolean }) => {
  if (!border) {
    return (
      <div className="dark:border-jacarta-600 rounded-full border-[3px] border-white" style={{ width: `${size + 6}px`, height: `${size + 5}px` }}>
        <MetaMaskAvatar address={contract} size={size} />
      </div>
    )
  }

  return (
    <div className="dark:border-jacarta-600 rounded-full border-[5px] border-white" style={{ width: `${size + 10}px`, height: `${size + 10}px` }}>
      <MetaMaskAvatar address={contract} size={size} />
    </div>
  )
}