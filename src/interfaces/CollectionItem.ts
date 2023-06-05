interface CollectionItem {
  id: string;
  title: string;
  image: string;
  icon: boolean;
  creator: string;
  text: string;
  amount: string;
  details: {
    id: string;
    detailsNumber: string;
    detailsText: string;
  }[];
}

export interface CollectionData {
  id: number;
  title: string;
  image: string;
  icon: boolean;
  amount: string;
  postTime: string;
  postDate: string;
}

export default CollectionItem;
