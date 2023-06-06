import { createSlice } from '@reduxjs/toolkit';
import TypeItem from '@/interfaces/TypeItem';

const initialState = {
  mblMenu: false,
  dropdown: false,
  collection_activity_item_data: [] as TypeItem[],
  trendingCategoryItemData: [] as TypeItem[],
  sortedtrendingCategoryItemData: [] as TypeItem[],
  collectiondata: [] as TypeItem[],
  sortedCollectionData: [] as TypeItem[],
  renkingData: [] as TypeItem[],
  filteredRenkingData: [] as TypeItem[],
  walletModal: false,
  bidsModal: false,
  buyModal: false,
  propartiesModalValue: false,
  trendingCategorySorText: '',
  startToken: 1,
  limit: 30,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    openMblMenu: (state) => {
      state.mblMenu = true;
    },
    incrementStartToken: (state, action) => {
      state.startToken += action.payload;
    },
    incrementLimit: (state, action) => {
      state.limit += action.payload;
    },
    closeMblMenu: (state) => {
      state.mblMenu = false;
    },

    openDropdown: (state) => {
      state.dropdown = true;
    },
    closeDropdown: (state) => {
      state.dropdown = false;
    },
    handle_collection_activity_item_data: (state, action) => {
      // was payload.data before, payload on param
      state.collection_activity_item_data = action.payload.data;
    },
    walletModalShow: (state) => {
      state.walletModal = true;
    },
    walletModalhide: (state) => {
      state.walletModal = false;
    },
    bidsModalShow: (state) => {
      state.bidsModal = true;
    },
    bidsModalHide: (state) => {
      state.bidsModal = false;
    },
    buyModalShow: (state) => {
      state.buyModal = true;
    },
    buyModalHide: (state) => {
      state.buyModal = false;
    },
    showPropatiesModal: (state) => {
      state.propartiesModalValue = true;
    },
    closePropatiesModal: (state) => {
      state.propartiesModalValue = false;
    },
    updateTrendingCategoryItemData: (state, action) => {
      const newData = action.payload;

      const existingItems = state.trendingCategoryItemData.filter(
        (item) => !newData.some((newItem: TypeItem) => newItem.id === item.id)
      );
      state.trendingCategoryItemData = [...existingItems, ...newData];
      state.sortedtrendingCategoryItemData = [
        ...state.trendingCategoryItemData,
      ];
    },
    updatetrendingCategorySorText: (state, action) => {
      const sortText = action.payload;
      if (sortText === 'Price: Low to High') {
        state.sortedtrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a, b) => +a.sortPrice - +b.sortPrice
          );
      } else if (sortText === 'Price: high to low') {
        state.sortedtrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a, b) => +b.sortPrice - +a.sortPrice
          );
      } else if (sortText === 'Recently Added') {
        state.sortedtrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a, b) =>
              new Date(a.addDate).getTime() - new Date(b.addDate).getTime()
          );
      } else if (sortText === 'Auction Ending Soon') {
        state.sortedtrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a, b) =>
              new Date(b.addDate).getTime() - new Date(a.addDate).getTime()
          );
      } else {
        state.sortedtrendingCategoryItemData = state.trendingCategoryItemData;
      }
    },
    updateTrendingCategoryItemByInput: (state, action) => {
      const text = action.payload;
      // if (text === 'Verified Only') {
      //   state.sortedtrendingCategoryItemData =
      //     state.trendingCategoryItemData.filter((item) => {
      //       return item.verified;
      //     });
      // } else if (text === 'NFSW Only') {
      //   state.sortedtrendingCategoryItemData =
      //     state.trendingCategoryItemData.filter((item) => {
      //       return item.nfsw;
      //     });
      // } else if (text === 'Show Lazy Minted') {
      //   state.sortedtrendingCategoryItemData =
      //     state.trendingCategoryItemData.filter((item) => {
      //       return item.lazyMinted;
      //     });
      // } else {
      //   state.sortedtrendingCategoryItemData = state.trendingCategoryItemData;
      // }
    },
    collectCollectionData: (state, action) => {
      const data = action.payload;
      state.collectiondata = data;
      state.sortedCollectionData = data;
    },
    updateCollectionData: (state, action) => {
      const text = action.payload;
      // if (text === 'trending') {
      //   const tampItem = state.collectiondata.filter((item) => item.trending);
      //   state.sortedCollectionData = tampItem;
      // }
      // if (text === 'top') {
      //   const tampItem = state.collectiondata.filter((item) => item.top);
      //   state.sortedCollectionData = tampItem;
      // }
      // if (text === 'recent') {
      //   const tampItem = state.collectiondata.filter((item) => item.recent);
      //   state.sortedCollectionData = tampItem;
      // }
      // state.sortedCollectionData = state.collectiondata;
    },
    collectRenkingData: (state, action) => {
      state.renkingData = action.payload;
      state.filteredRenkingData = action.payload;
    },
    updateRenkingData: (state, action) => {
      const text = action.payload;
      let tempItem = state.renkingData.filter((item) => item.category === text);
      if (text === 'All') {
        tempItem = state.renkingData;
      }
      state.filteredRenkingData = tempItem;
    },
    updateRenkingDataByBlockchain: (state, action) => {
      const text = action.payload;
      // let tempItem = state.renkingData.filter(
      //   (item) => item.blockchain === text
      // );
      // if (text === 'All') {
      //   tempItem = state.renkingData;
      // }
      // state.filteredRenkingData = tempItem;
    },
    updateRenkingDataByPostdate: (state, action) => {
      const text = action.payload;
      // let tempItem = state.renkingData.filter((item) => item.postDate === text);
      // if (text === 'All Time' || text === 'Last Year') {
      //   tempItem = state.renkingData;
      // }
      // state.filteredRenkingData = tempItem;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openMblMenu,
  incrementStartToken,
  incrementLimit,
  closeMblMenu,
  openDropdown,
  closeDropdown,
  walletModalShow,
  walletModalhide,
  bidsModalShow,
  bidsModalHide,
  buyModalShow,
  buyModalHide,
  showPropatiesModal,
  closePropatiesModal,
  updatetrendingCategorySorText,
  updateTrendingCategoryItemData,
  updateTrendingCategoryItemByInput,
  collectCollectionData,
  updateCollectionData,
  collectRenkingData,
  updateRenkingData,
  updateRenkingDataByBlockchain,
  updateRenkingDataByPostdate,
} = counterSlice.actions;

export default counterSlice.reducer;
