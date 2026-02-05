import { create } from "zustand";
export type FclassType = "short" | "long" | "";
interface FilterStoreState {
  fclass: FclassType;
  category: string;

  setCategory: (category: string) => void;
  setFclass: (fclass: FclassType) => void;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  fclass: "",
  category: "",

  setFclass: (fclass) =>
    set({
      fclass,
    }),

  setCategory: (category) =>
    set({
      category,
    }),
}));
