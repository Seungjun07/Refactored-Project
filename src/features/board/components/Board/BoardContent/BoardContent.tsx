import "./index.css";

type Board = {
  id: string;
  name: string;
};
interface BoardContentProps {
  boards: Board[];
  selectedBoard: string;
  onBoardSelect: (boardName: string) => void;
}

export default function BoardContent({
  boards,
  selectedBoard,
  onBoardSelect,
}: BoardContentProps) {
  return (
    <ul className="Board_content">
      {boards.map((board, i) => (
        <li key={board.id}>
          <span>{board.name}</span>
          <input
            type="radio"
            name="board"
            value={selectedBoard}
            checked={selectedBoard === board.name}
            onChange={() => onBoardSelect(board.name)}
          />
        </li>
      ))}
    </ul>
  );
}
