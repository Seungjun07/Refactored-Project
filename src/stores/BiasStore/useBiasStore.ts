import { getBiasList } from "@/features/bias/api/bias";
import { create } from "zustand";

interface BiasStoreState {
  biasList: [];
  loading: boolean;
  error: string | null;
  biasId: string;
  setBiasId: (id: string) => void;
}

const useBiasStore = create<BiasStoreState>((set) => ({
  biasList: [],
  loading: false,
  error: null,
  biasId: "",

  setBiasId: (id) => set({ biasId: id }),

  fetchBiasList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getBiasList();
      set({ biasList: res.body.bias_list, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useBiasStore;
