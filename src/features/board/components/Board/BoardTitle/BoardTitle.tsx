import type { ReactNode } from "react";
import "./index.css";

export default function BoardTitle({ children }: { children: ReactNode }) {
  return <div className="Board_title">{children}</div>;
}
