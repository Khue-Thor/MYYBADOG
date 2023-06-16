// import Image from 'next/image';
import { NFT, getColectionNfts } from '@/api/nftgo';
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

async function getTopMintData() {
	try {
		const badDogsContract = '0x934910077f5185f1e62f821c167b38a864156688'
		const res = await getColectionNfts(badDogsContract, 0, 5)
		return res
	} catch (error) {
		console.log(error);
	}
}

const TopMintBDogs = async () => {
	const data = await getTopMintData();
	// console.log(data);

	return (
		<>
			{/* <!-- Today's Top Mint --> */}
			<div
				className="dark:bg-jacarta-800 bg-light-base rounded-2.5xl p-12 lg:w-1/3"
				// key={parentId}
				key={"TopMint1"}
			>
				<h2 className="text-jacarta-700 font-display mb-8 text-center text-3xl font-semibold dark:text-white">
					{"Top BadDogs"}
				</h2>

				<div className="flex flex-col space-y-5">
					{data && data.map((item: NFT, index: number) => {
						// const { id, image, title, icon, amount, postTime } = item;
						const icon = false; // TODO: Turn off all verification checkmark icon for now
						const image = item.image || '../../../public/images/404.png';  // TODO: change to collection pfp3
						const blockchain = 'eth-mainnet'
						// const id="1"; // Counter for rank
						// const itemLink = image
						// 	.split('/')
						// 	.slice(-1)
						// 	.toString()
						// 	.replace('.jpg', '')
						// 	.replace('.gif', '');

						return (
							<div
								key={index}
								className="border-jacarta-100 dark:bg-jacarta-700 rounded-2xl flex border bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent"
							>
								<figure className="mr-4 shrink-0">
									<Link href={`/collection/${blockchain}/${item.contract_address}`} className="relative block">
										<img src={image} alt={item.collection_name} className="rounded-2lg h-12 w-12" />
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
									<Link href={`/collection/${blockchain}/${item.contract_address}`} className="block">
										<span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
											BDC{item.name}
										</span>
									</Link>
									{/* <span className="dark:text-jacarta-300 text-sm">{Math.round(mint_num * mint_volume.value)} {mint_volume.crypto_unit}</span> */}
									<span className="dark:text-jacarta-300 text-sm">{item.last_sale.price.value.toFixed(2)} {item.last_sale.price.crypto_unit}</span>
								</div>
							</div>
						);
					})}
				</div>
				<Link href="/collection/eth-mainnet/0x934910077f5185f1e62f821c167b38a864156688" className="text-accent mt-8 block text-center text-sm font-bold tracking-tight">
					View All Drops
				</Link>
			</div>

			{/* <!-- end today's top mint --> */}
		</>
	);
};

export default TopMintBDogs;
