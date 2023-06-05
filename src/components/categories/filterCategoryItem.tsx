import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStartToken, updateTrendingCategoryItemData } from '../../redux/counterSlice';
import { usePathname } from 'next/navigation';
import Collection_category_filter from '../collection/collection_category_filter';
import CategoryItem from './categoryItem';
import { RootState } from '@/redux/store';

const FilterCategoryItem = () => {
	const params = usePathname();
	const dispatch = useDispatch();
	const { startToken, limit } = useSelector<RootState, RootState['counter']>((state) => state.counter);


	const id = params.split('/')[4];
	const contract_address = params.split('/')[3].replace(`/${id}`, '');
	const blockchain = params.split('/')[2].replace(`/${contract_address}/${id}`, '');

	const fetchTrendingCategoryData = async () => {
		const urlV3 = `https://${blockchain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			}
		};

		const response = await fetch(`${urlV3}/getNFTsForContract?contractAddress=${contract_address}&withMetadata=true&startToken=${startToken}&limit=${limit}`, options);
		const data = await response.json();
		const list = data.nfts;

		const formattedList = list.map((item: any) => ({
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
		}));
		// if (startToken === 1) {
		// 	dispatch(incrementStartToken(+list[0].tokenId))
		// }
		dispatch(updateTrendingCategoryItemData(formattedList));
	};

	useEffect(() => {
		fetchTrendingCategoryData();
	}, [startToken]);

	return (
		<div>
			{/* <!-- Filter --> */}
			<Collection_category_filter />
			<CategoryItem />
		</div>
	);
};

export default FilterCategoryItem;
