import { useState } from "react";
import useDragScroll from "../../hooks/useDragScroll.ts";
import style from "./KeywordBox.module.css";
import { useBestHashtags } from "@/features/hash-tag/hooks/useBestHashtags.ts";

interface KeywordBoxProps {
  type: "today" | "weekly";
  title: string;
  subTitle: string;
  onClickTag: (tag: string) => void;
  setIsSameTag: (value: boolean) => void;
}

export default function KeywordBox({
  type,
  title,
  subTitle,
  onClickTag,
  setIsSameTag,
}: KeywordBoxProps) {
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();
  const { tags } = useBestHashtags(type);

  let [activeIndex, setActiveIndex] = useState<number | null>(null);

  function handleTagClick(index: number, tag: string) {
    if (activeIndex === index) {
      setActiveIndex(null);
      setIsSameTag(true);
      return;
    }

    setIsSameTag(false);
    setActiveIndex(index);
    onClickTag(tag);
  }

  return (
    <div className={style["keyword-container"]}>
      <div className={style["title-container"]}>
        {title} <span className={style["sub-title"]}>{subTitle}</span>
      </div>

      <div
        className={style["tags-container"]}
        ref={scrollRef}
        {...dragHandlers}
      >
        <div className={style["tags-wrapper"]}>
          {tags.map((tag, i) => {
            return (
              <div
                key={tag}
                onClick={() => {
                  if (hasDragged) return;
                  handleTagClick(i, tag);
                }}
                className={`${style["tags"]} ${activeIndex === i ? style["click-tag"] : ""}`}
              >
                #{tag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
