import style from "@/pages/FeedDetail/FeedDetail.module.css";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import { useRef, useState } from "react";

interface CommentSectionProps {
  fid: string;
  numComment: number;
}

export default function CommentSection({
  fid,
  numComment,
}: CommentSectionProps) {
  const [comment, setComment] = useState("");
  const [targetCid, setTargetCid] = useState("");
  const commentRef = useRef<HTMLInputElement | null>(null);

  const handleReplyComment = (
    cid: string,
    targetCid: string,
    uname: string,
  ) => {
    setTargetCid(targetCid || cid);
    setComment(`@${uname} `);
    commentRef?.current?.focus();
  };
  return (
    <div className={style["comment-container"]}>
      <div className={style["title-box"]}>
        <div className={style["comment-title"]}>댓글</div>
        <div className={style["comment-total"]}>총 {numComment}건</div>
      </div>

      {/* 댓글 각각 */}
      <CommentList fid={fid} onClick={handleReplyComment} />
      <div className={style["input-container"]}>
        <CommentEditor
          fid={fid}
          inputRef={commentRef}
          value={comment}
          targetCid={targetCid}
          onChange={setComment}
        />
      </div>
    </div>
  );
}
