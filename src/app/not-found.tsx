'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="relative flex flex-col items-center justify-center p-3 text-center" style={{ height: '45vh' }}>
      <p className="mb-1 font-display text-center">THER SERVER IS TEMPORARILY DOWN.</p>
      <p className="mb-5 font-display text-center">
        TRY REFRESHING OR CHECKING OUR TWITTER <Link href="https://twitter.com/BadDogsCompany">@BadDogsCompany</Link> OR JOIN OUR DISCORD.
      </p>
      <h1 className="mb-5 text-7xl font-display text-center">
        SERVER IS TIRED OF YOUR SHIT
      </h1>
      <button
        className="bg-white font-display text-2xs h-6 text-black mb-2 font-bold px-2 border rounded shadow text-center"
        onClick={() => router.push('/')}
        style={{ borderRadius: '7px' }}
      >
        BACK TO HOME
      </button>
    </div>
  );
}
