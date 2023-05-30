/* -------------------------------------------------------------------------- */
/*                      NFTGO.IO API URLs                                     */
/* -------------------------------------------------------------------------- */
export function getTopMint(timeSpan: string = "24h", sortBy: string = "mint_num", isListed: boolean = false, asc: boolean = false, offset: number = 0, limit: number = 10): string {
	
    // return "https://data-api.nftgo.io/eth/v1/market/rank/top-mints/24h?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=5";
    return `https://data-api.nftgo.io/eth/v1/market/rank/top-mints/${timeSpan}?sort_by=${sortBy}&is_listed=${String(isListed)}&asc=${String(asc)}&offset=${offset.toString()}&limit=${limit.toString()}`;
// }
}