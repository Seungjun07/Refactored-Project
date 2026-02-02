import style from "@/pages/FeedDetail/FeedDetail.module.css";
import type { Comment } from "../types/comment";

interface CommentItemProps {
  comment: Comment;
  onRemove: (cid: string) => void;
  onReply: (cid: string, targetCid: string, uname: string) => void;
}

export default function CommentItem({
  comment,
  onRemove,
  onReply,
}: CommentItemProps) {
  //   async function fetchOriginalComment(cid) {
  //     await mainApi
  //       .get(`feed_explore/original_comment_data?cid=${cid}`)
  //       .then((res) => {
  //         //console.log("ccc", res.data);
  //       });
  //   }

  return (
    <div
      key={comment.cid}
      className={style["comment-box"]}
      onClick={() => {
        onReply(comment.cid, comment.target_cid, comment.uname);
      }}
    >
      {/* // comment.reply.length !== 0 ? style["reply-exist"] : "" */}
      <section className={`${style["comment-section"]} `}>
        <div className={style["comment-user"]}>
          <div className={style["user-name"]}>{comment.uname}</div>

          <div className={style["function_button_container"]}>
            {/* {comment.is_reworked && (
              <button
                className={style["AI_text"]}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                //   fetchOriginalComment(comment.cid);
                }}
              >
                원문 보기
              </button>
            )} */}
            {comment.owner ? (
              <div
                className={style["comment-delete-report"]}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(comment.cid);
                }}
              >
                삭제
              </div>
            ) : (
              <div className={style["comment-delete-report"]}>신고</div>
            )}
          </div>
        </div>

        <div className={style["comment-content"]}>{comment.body}</div>

        <span className={style["date-st"]}>{comment.date}</span>
      </section>

      {/* {comment.reply.length !== 0 &&
        comment.reply?.map((reply, i) => {
          return (
            <ReplyComment
              key={reply.cid}
              index={i}
              length={comment.reply.length}
              reply={reply}
              fetchOriginalComment={fetchOriginalComment}
              handleRemove={handleRemove}
            />
          );
        })} */}
    </div>
  );
}

// function fetchRemoveComment(cid) {
//   mainApi
//     .get(`feed_explore/remove_comment?fid=${fid}&cid=${cid}`)
//     .then(() => {
//       setComments((prev) => {
//         return prev
//           .map((comment) => {
//             if (comment.cid === cid) {
//               return null;
//             }

//             if (comment.reply && comment.reply.length > 0) {
//               comment.reply = comment.reply.filter(
//                 (reply) => reply.cid !== cid,
//               );
//             }

//             return comment;
//           })
//           .filter((comment) => comment !== null);
//       });
//     });
// }
