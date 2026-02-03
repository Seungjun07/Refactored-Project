import { getBiasList } from "@/features/bias/api/bias";
import type { Bias } from "@/features/bias/types/bias";
import { create } from "zustand";

interface BiasStoreState {
  biasList: Bias[];
  loading: boolean;
  selectedBias: Bias | null;
  setSelectedBias: (bias: Bias) => void;
  fetchBiasList: () => Promise<void>;
}

const useBiasStore = create<BiasStoreState>((set) => ({
  biasList: [],
  loading: false,
  selectedBias: null,

  fetchBiasList: async () => {
    set({ loading: true });
    try {
      const data = await getBiasList();
      set({
        biasList: data.body.bias_list,
        loading: false,
        selectedBias: data.body.bias_list[0] || null,
      });
    } catch (err) {
      console.log(err);
      set({ loading: false });
    }
  },

  setSelectedBias: (bias) => set({ selectedBias: bias }),
}));

export default useBiasStore;
