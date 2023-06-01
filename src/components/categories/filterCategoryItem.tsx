import React, { useEffect, useState } from 'react';
// import { trendingCategoryData } from '../../data/categories_data';
import Collection_category_filter from '../collection/collection_category_filter';
import CategoryItem from './categoryItem';
import { useDispatch } from 'react-redux';
import { updateTrendingCategoryItemData } from '../../redux/counterSlice';

const FilterCategoryItem = () => {
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

	const fetchTrendingCategoryData = async () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'X-API-KEY': '39181ecb-6ce7-4917-b7fe-011ee66d35d3'
			}
		};

		fetch('https://data-api.nftgo.io/eth/v1/market/rank/nft/24h?by=price&category=ALL&offset=0&limit=10', options)
			.then(response => response.json())
			.then(response => {
				const list = response.nfts.slice(0, 8);
				console.log('list >', list);

				const formattedList = list.map((item: any) => {
					return {
						id: item.token_id,
						image: item.image,
						title: item.name,
						price: item.last_price.value + ' ETH',
						sortPrice: item.last_price.value,
						bidLimit: 1,
						bidCount: 1,
						likes: 5,
						creator: '',
						owner: item.owner.address
					}
				})
				console.log('formattedList >', formattedList);

				dispatch(updateTrendingCategoryItemData(formattedList));
			})
			.catch(err => console.error(err));

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
