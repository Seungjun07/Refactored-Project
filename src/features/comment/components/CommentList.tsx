import { useComments } from "../hooks/useComments";
import CommentItem from "./CommentItem";

export default function CommentList({
  fid,
  onClick,
}: {
  fid: string;
  onClick: (cid: string, targetCid: string, uname: string) => void;
}) {
  const { comments, onRemoveComment } = useComments(fid);
  return (
    <>
      {comments.length > 0 &&
        comments.map((comment, i) => {
          return (
            <CommentItem
              key={i}
              comment={comment}
              onRemove={onRemoveComment}
              onReply={onClick}
            />
          );
        })}
    </>
  );
}
