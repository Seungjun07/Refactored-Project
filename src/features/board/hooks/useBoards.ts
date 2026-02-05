import { useEffect, useState } from "react";
import { fetchBoard } from "../api/board";

export function useBoards() {
  const [boards, setBoards] = useState([]);

  async function fetchBoards() {
    const data = await fetchBoard();

    setBoards(data.body.boards);
  }

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards };
}
