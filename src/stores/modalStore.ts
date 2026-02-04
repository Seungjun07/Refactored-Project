import { create } from "zustand";

type ModlaType = "CATEGORY" | "FILTER" | null;

interface ModalStore {
  activeModal: null | "CATEGORY" | "FILTER";

  open: (type: ModlaType) => void;
  close: () => void;
}
export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,

  open: (type) => set({ activeModal: type }),
  close: () => set({ activeModal: null }),
}));
