export type TrendingCategoryItem = {
  id: string;
  image: string;
  category: string;
  title: string;
  nfsw: boolean;
  lazyMinted: boolean;
  verified: boolean;
  addDate: number;
  sortPrice: number;
  price: string;
  bidLimit: number;
  bidCount: number;
  likes: number;
  creator: {
    name: string;
    image: string;
  };
  owner: {
    name: string;
    image: string;
  };
};
