import Link from 'next/link';
import React, { Suspense } from 'react';
// import { hero_6_data } from '@/data/hero_6_data';
import Image from 'next/image';

async function getTopCollection() {

	// console.log("ingetTopCollection");
	const options: RequestInit = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-KEY': process.env.NFT_GO_API_KEY as string,
		},
		next: {
			revalidate: 86400, // 24 hrs in sec 
		}
	};

	const res = await fetch('https://data-api.nftgo.io/eth/v1/market/rank/nft/24h?by=price&category=ALL&offset=0&limit=10', options);
	// .then(response => response.json())
	// .then(response => console.log(response))
	// .catch(err => console.error(err));

	// if (!res.ok) {
	if (Number(res.status) != 200) {
		// This will activate the closest 'error.js' Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

type LastPrice = {
	quantity: number;
	value: number;
	crypto_unit: string;
	usd: number;
};

type OwnerRecord = {
	address: string;
	ens: string;
};

type NftGoNftRecord = {
	name: string;
	image: string;
	animation_url: null;
	contract_address: string;
	token_id: string;
	rarity: object;
	traits: any[];
	collection: object;
	owner: OwnerRecord;
	last_price: LastPrice;
	price_change_usd: number;
	price_change_eth: number;
	max_price: object;
	sale_num: number;
	last_deal_time: number;
};

const Hero_6 = async () => {

	const data = await getTopCollection();
	// console.log(data);

	return (
		<>
			{/* <!-- Hero --> */}
			<section className="relative px-6 pb-8 py-24 md:pt-32">
				<div className="flex flex-col gap-5 lg:flex-row">
					{/* <!-- Left side --> */}
					<div className="w-full lg:w-1/3">
						<div className="grid grid-cols-2 grid-rows-2 gap-5">
							{data.nfts.slice(1, 5).map((item: NftGoNftRecord) => {
								const { name, image, contract_address, token_id, owner, last_price } = item;
								// const itemLink = img
								// 	.split('/')
								// 	.slice(-1)
								// 	.toString()
								// 	.replace('_square.jpg', '')
								// 	.replace('.gif', '');
								return (
									<Suspense fallback={<p>loading...</p>} key={`left-${token_id}`}>
										<article>
											<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
												<figure className="relative">
													<Link href={`/${contract_address}/item/${token_id}`} className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
														<Image
															src={image}
															alt={name}
															className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
															height="470"
															width="470"
														/>
													</Link>
												</figure>
												<div className="pointer-events-none absolute bottom-0 w-full p-5">
													<h2 className="font-display text-base leading-none text-white xl:text-lg">
														{name}
													</h2>
													<span className="text-2xs text-white">{last_price.value} {last_price.crypto_unit}</span>
												</div>
											</div>
										</article>
									</Suspense>
								);
							})}
						</div>
					</div>
					{/* <!-- Center image --> */}
					<div className="w-full lg:w-1/3">
						{data.nfts.slice(0, 1).map((item: NftGoNftRecord) => {
							const { name, image, contract_address, token_id, owner, last_price } = item;
							// const itemLink = img
							// 	.split('/')
							// 	.slice(-1)
							// 	.toString()
							// 	.replace('.jpg', '')
							// 	.replace('_square', '')
							// 	.replace('.gif', '');
							return (
								<Suspense fallback={<p>loading...</p>} key={`center-${token_id}`}>
									<article>
										<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
											<figure className="relative">
												<Link href={`/${contract_address}/item/${token_id}`} className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
													<Image
														src={image}
														alt={name}
														className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
														height="470"
														width="470"
													/>
												</Link>
											</figure>
											<div className="pointer-events-none absolute bottom-0 w-full p-5">
												<h2 className="font-display text-base leading-none text-white xl:text-lg">
													{name}
												</h2>
												<span className="text-2xs text-white">{last_price.value} {last_price.crypto_unit}</span>
											</div>
										</div>
									</article>
								</Suspense>
							);
						})}
					</div>
					{/* <!-- Right side --> */}
					<div className="w-full lg:w-1/3">
						<div className="grid grid-cols-2 grid-rows-2 gap-5">
							{data.nfts.slice(5, 9).map((item: NftGoNftRecord) => {
								// const { id, title, img, authorName } = item;
								const { name, image, contract_address, token_id, owner, last_price } = item;
								// const itemLink = img
								// 	.split('/')
								// 	.slice(-1)
								// 	.toString()
								// 	.replace('.jpg', '')
								// 	.replace('_square', '')
								// 	.replace('.gif', '');
								return (
									<Suspense fallback={<p>loading...</p>} key={`right-${token_id}`}>
										<article>
											<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
												<figure className="relative">
													<Link href={`/${contract_address}/item/${token_id}`} className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
														<Image
															src={image}
															alt={name}
															className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
															height="470"
															width="470"
														/>
													</Link>
												</figure>
												<div className="pointer-events-none absolute bottom-0 w-full p-5">
													<h2 className="font-display text-base leading-none text-white xl:text-lg">
														{name}
													</h2>
													<span className="text-2xs text-white">{last_price.value} {last_price.crypto_unit}</span>
												</div>
											</div>
										</article>
									</Suspense>
								);
							})}
						</div>
					</div>
				</div>
			</section>
			{/* <!-- end hero --> */}
		</>
	);
};

export default Hero_6;
