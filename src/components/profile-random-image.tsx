'use client'
import React from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const RandomLogoImage = ({ contract }: { contract: string }) => {
  return (
    <div className="dark:border-jacarta-600 rounded-full border-[5px] border-white" style={{ width: '160px', height: '160px' }}>
      <MetaMaskAvatar address={contract} size={150} />
    </div>
  )
}