import style from "@/pages/FeedDetail/FeedDetail.module.css";
import input_icon from "@/img/input.svg";
import { type KeyboardEvent, type RefObject } from "react";
import { useComments } from "../hooks/useComments";

interface CommentEditorProps {
  fid: string;
  targetCid: string;
  value: string;
  onChange: (comment: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function CommentEditor({
  fid,
  targetCid = "",
  value,
  onChange,
  inputRef,
}: CommentEditorProps) {
  const { onCreateComment } = useComments(fid);

  function onKeyDownEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onCreateComment(value, targetCid);
      onChange("");
    }
  }

  function onClickInput() {
    onCreateComment(value, targetCid);
    onChange("");
  }

  return (
    <div className={style["input-wrapper"]}>
      <input
        ref={inputRef}
        type="text"
        id={style["comment"]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDownEnter}
        placeholder="당신의 생각을 남겨보세요."
      />
      <button className={style["input-button"]} onClick={onClickInput}>
        <img src={input_icon} alt="input_icon" />
      </button>
    </div>
  );
}
