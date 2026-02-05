import type { Board } from "@/features/board/types/board.ts";
import BoardContent from "./BoardContent/BoardContent.tsx";
import BoardLink from "./BoardLink/BoardLink.tsx";
import BoardTitle from "./BoardTitle/BoardTitle.tsx";

import "./index.css";
import { useBoardStore } from "@/stores/BoardStore/useBoardStore.ts";

interface BoardProps {
  boards: Board[];
  onClose: () => void;
}

export default function Board({ boards, onClose }: BoardProps) {
  const { selectedBoard, setBoard } = useBoardStore();

  function handleSelectBoard(board: string) {
    setBoard(board);
    onClose();
  }

  return (
    <div className="Board">
      <BoardTitle>게시판 목록</BoardTitle>
      <BoardContent
        boards={boards}
        onBoardSelect={handleSelectBoard}
        selectedBoard={selectedBoard}
      />
      <BoardTitle>외부 링크</BoardTitle>
      <BoardLink />
    </div>
  );
}
