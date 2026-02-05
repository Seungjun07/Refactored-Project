import { useRef, useState, type MouseEvent } from "react";

export default function useDragScroll() {
  let scrollRef = useRef<HTMLDivElement>(null);
  let [isDrag, setIsDrag] = useState(false);
  let [dragStart, setDragStart] = useState(0);
  let [hasDragged, setHasDragged] = useState(false);

  function onMouseDown(e: MouseEvent) {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setDragStart(e.pageX + scrollRef.current.scrollLeft);
    setHasDragged(false);
  }

  function onMouseUp(e: MouseEvent) {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsDrag(false);
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDrag || !scrollRef.current) return;

    scrollRef.current.scrollLeft = dragStart - e.pageX;
    setHasDragged(true);
  }

  return {
    scrollRef,
    hasDragged,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
    },
  };
}
