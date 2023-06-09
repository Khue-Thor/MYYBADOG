import Image from 'next/image';
import Link from 'next/link';

type MintVolumeType = {
	quantity: number,
	value: number,
	crypto_unit: string,
	usd: null | number
}

interface TopMintCollectionRecord {
	collection_name: string;
	contract_address: string;
	contract_url: string;
	blockchain: string;
	mint_num: number;
	mint_volume: MintVolumeType;
	minter_num: number;
	whale_num: number;
	total_gas_fee: Object;
	first_mint_time: number;
	fomo: string;
}

type TopMintItemProps = {
	index?: number,
	item: TopMintCollectionRecord
}

type SingleNftRecord = {
	contract: {
		address: string,
		name: string,
		symbol: string,
		totalSupply: string,
		tokenType: string,
		contractDeployer: string,
		deployedBlockNumber: number,
		openSeaMetadata: {
			floorPrice: number,
			collectionName: string,
			safelistRequestStatus: string,
			imageUrl: string,
			description: string,
			externalUrl: string,
			twitterUsername: string,
			discordUrl: string,
			lastIngestedAt: string
		},
		isSpam: null | boolean,
		spamClassifications: any[]
	},
	tokenId: string,
	tokenType: string,
	name: string,
	description: null | string,
	image: {
		cachedUrl: string,
		thumbnailUrl: string,
		pngUrl: string,
		contentType: string,
		size: number,
		originalUrl: string
	},
	raw: {
		tokenUri: string,
		metadata: {
			name: string,
			image: string,
			attributes: {
				value: string,
				trait_type: string
			}[]
		},
		error: any | null
	},
	tokenUri: string,
	timeLastUpdated: string
}

async function getFirstCollectionImage(contract_address: string) {
	const options: RequestInit = {
		method: "GET",
		headers: new Headers({
			accept: "application/json",
			// "X-API-KEY": process.env.NFT_GO_API_KEY as string,
		}),
		next: {
			revalidate: 3600,
		},
	};

	const res = await fetch(
		`https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=1&limit=1`,
		options
	);
	// .then(response => response.json())
	// .then(response => console.log(response))
	// .catch(err => console.error(err));

	// console.log(res);

	// TODO: Handle the error
	if (Number(res.status) != 200) {
		// This will activate the closest 'error.js' Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const TopMintItem = async (props: { index: number, data: TopMintCollectionRecord }) => {
	const { index, data } = props;
	// console.log('Hi there3');
	// console.log(index);
	const { collection_name, contract_address, blockchain, mint_num, minter_num, first_mint_time, fomo, mint_volume } = data;
	const dataCollection = await getFirstCollectionImage(contract_address);
	// console.log(data[index]);
	const { image } = dataCollection.nfts[0];
	const icon = false; // TODO: Turn off all verification checkmark icon for now
	// const image = `https://www.gravatar.com/avatar/${contract_address}`;  // TODO: change to collection pfp
	const linkPath = `/collection/${blockchain === 'ETH' ? 'eth-mainnet' : blockchain}/${contract_address}`
	return (
		<>
			{/* <!-- Top Mint Item --> */}
			<div
				key={contract_address}
				className="border-jacarta-100 dark:bg-jacarta-700 rounded-2xl flex border bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent"
			>
				<figure className="mr-4 shrink-0">
					<Link href={linkPath} className="relative block">
						<Image
							src={image.thumbnailUrl}
							alt={collection_name || 'NFTimage'}
							width="48"
							height="48"
							className="rounded-2lg h-12 w-12"
						/>
						<div className="dark:border-jacarta-600 bg-jacarta-700 absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-2/4 items-center justify-center rounded-full border-2 border-white text-xs text-white">
							{/*  // Index of current item */}
							{index + 1}
						</div>
						{icon && (
							<div
								className="dark:border-jacarta-600 bg-green absolute -left-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
								data-tippy-content="Verified Collection"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="h-[.875rem] w-[.875rem] fill-white"
								>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
								</svg>
							</div>
						)}
					</Link>
				</figure>
				<div>
					<Link href={linkPath} className="block">
						<span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
							{collection_name}
						</span>
					</Link>
					<span className="dark:text-jacarta-300 text-sm">{Math.round(mint_num * mint_volume.value)} {mint_volume.crypto_unit}</span>
				</div>
			</div>
			{/* <!-- end top mint item --> */}
		</>
	);
};

export default TopMintItem;
