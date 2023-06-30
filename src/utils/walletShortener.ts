// pass a wallet address and get a shortened version of it
// e.g. 0x1234567890abcdef1234567890abcdef12345678 -> 0x...5678

function walletShortener(
  wallet: string,
  prefixLength: number,
  suffixLength: number
) {
  const prefix = wallet.slice(0, prefixLength);
  const suffix = wallet.slice(-suffixLength);
  return prefix + '...' + suffix;
}
