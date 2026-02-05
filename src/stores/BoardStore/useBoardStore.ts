import { create } from "zustand";

interface BoardStoreState {
  selectedBoard: string;
  setBoard: (board: string) => void;
}

export const useBoardStore = create<BoardStoreState>((set) => ({
  selectedBoard: "모든게시판",

  setBoard: (board) =>
    set({
      selectedBoard: board,
    }),
}));
