import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ModalStore = {
  bidsModal: boolean;
  showBidsModal: () => void;
  hideBidsModal: () => void;
};

const useModalStore = create<ModalStore>()(
  immer((set) => ({
    bidsModal: false,
    showBidsModal: () =>
      set((state) => {
        state.bidsModal = true;
      }),
    hideBidsModal: () =>
      set((state) => {
        state.bidsModal = false;
      }),
  }))
);

export default useModalStore;
