import React, { useEffect, useState } from 'react';
// import { trendingCategoryData } from '../../data/categories_data';
import Collection_category_filter from '../collection/collection_category_filter';
import CategoryItem from './categoryItem';
import { useDispatch } from 'react-redux';
import { updateTrendingCategoryItemData } from '../../redux/counterSlice';
import { usePathname } from 'next/navigation';

const FilterCategoryItem = () => {
	const params = usePathname();
	const dispatch = useDispatch();
	const [trendingCategoryData, setTrendingCategoryData] = useState([]);

	// const {
	// 	id,
	// 	image,
	// 	title,
	// 	price,
	// 	bidLimit,
	// 	bidCount,
	// 	likes,
	// 	creator,
	// 	owner,
	// }

	const id = params.split('/')[3];
	const contract_address = params.split('/')[2].replace(`/${id}`, '');
	const blockchain = 'eth-mainnet';


	const fetchTrendingCategoryData = async () => {
		const urlV3 = `https://eth-mainnet.g.alchemy.com/nft/v3/` + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
		const urlV2 = `https://eth-mainnet.g.alchemy.com/nft/v2/` + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			}
		};

		const response = await fetch(`${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=1&limit=8`, options)
		const data = await response.json();
		const list = data.nfts
		console.log('list >', list);

		const formattedList = list.map((item: any) => {
			return {
				id: item.tokenId,
				image: item.image.cachedUrl,
				title: item.name,
				price: 'SetPrice' + ' ETH',
				sortPrice: Math.floor(Math.random() * 100) + 1,
				bidLimit: Math.floor(Math.random() * 10) + 1,
				bidCount: Math.floor(Math.random() * 10) + 1,
				likes: Math.floor(Math.random() * 100) + 1,
				creator: 'Creator',
				owner: {
					name: 'owner',
					image: ''
				},
				addDate: new Date().toISOString(),
				category: 'Replace with item category'
			}
		})
		// console.log('formattedList >', formattedList);

		dispatch(updateTrendingCategoryItemData(formattedList));
	}

	useEffect(() => {
		fetchTrendingCategoryData();
	}, []);

	return (
		<div>
			{/* <!-- Filter --> */}
			<Collection_category_filter />
			<CategoryItem />
		</div>
	);
};

export default FilterCategoryItem;
