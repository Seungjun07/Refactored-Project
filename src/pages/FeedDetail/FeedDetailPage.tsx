import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type MouseEvent } from "react";

import more_icon from "./../../img/more_icon.svg";
import back from "./../../img/detail_back.png";
// import reArrow1 from "./../../img/reArrow1.svg";
// import reArrow2 from "./../../img/reArrow2.svg";
// import reArrow3 from "./../../img/reArrow3.svg";
// import reArrow4 from "./../../img/reArrow4.svg";

import style from "./FeedDetail.module.css";
import FeedItem from "@/features/feed/components/Feed/FeedItem";
import { useFeedData } from "@/features/feed/hooks/useFeedData";
import CommentSection from "@/features/comment/components/CommentSection";

export default function FeedDetailPage() {
  let navigate = useNavigate();
  const params = useParams<{ fid: string }>();
  const fid = params.fid!;

  const { feedData, removeFeed, toggleLike, getFeedById } = useFeedData({});

  const [showMoreOption, setShowMoreOption] = useState(false);

  useEffect(() => {
    if (!feedData.find((feed) => feed.fid === fid)) {
      getFeedById(fid);
    }
  }, [fid]);

  async function handleDeleteFeed() {
    const success = await removeFeed(fid);
    if (success) {
      alert("삭제되었습니다.");
      navigate(-1);
    }
  }

  function onClickOption(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setShowMoreOption(!showMoreOption);
  }

  const feed = feedData.find((feed) => feed.fid === fid);

  if (!feed) return <div>로딩중</div>;

  return (
    <div className={style["FeedDetail"]}>
      <div className={style["top-container"]}>
        <button
          className={style["back-button"]}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={back} alt="back" />
          <span>뒤로</span>
        </button>
        {feed.is_owner && (
          <button
            className={style["delete-button"]}
            onClick={(e) => {
              onClickOption(e);
            }}
          >
            <img src={more_icon} />
          </button>
        )}
        {showMoreOption && (
          <OptionModal
            onClickOption={onClickOption}
            onClickDelete={handleDeleteFeed}
          />
        )}
      </div>

      <div>
        <FeedItem
          detailPage
          feed={feed}
          links={feed.links}
          onToggleLike={() => toggleLike(fid)}
        />
      </div>

      <CommentSection fid={fid} numComment={feed.num_comment} />
    </div>
  );
}

/// 대댓글
// function ReplyComment({
//   index,
//   length,
//   reply,
//   fetchOriginalComment,
//   handleRemove,
// }) {
//   const [firstWord, ...restWords] = reply.body.split(" ");

//   let src;

//   if (length === 1) {
//     src = reArrow1;
//   } else {
//     if (index === 0) {
//       src = reArrow2;
//     } else if (index + 1 === length) {
//       src = reArrow4;
//     } else {
//       src = reArrow3;
//     }
//   }

//   return (
//     <div className={style["img-container"]}>
//       <img src={src} alt="대댓글" />
//       <div
//         key={reply.cid}
//         className={`${style["reply-box"]}`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className={style["comment-user"]}>
//           <p>{reply.uname}</p>
//           <div className={style["function_button_container"]}>
//             {reply.is_reworked && (
//               <button
//                 className={style["AI_text"]}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   fetchOriginalComment(reply.cid);
//                 }}
//               >
//                 원문 보기
//               </button>
//             )}
//             {reply.owner ? (
//               <div
//                 className={style["comment-delete-report"]}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(reply.cid);
//                 }}
//               >
//                 삭제
//               </div>
//             ) : (
//               <div className={style["comment-delete-report"]}>신고</div>
//             )}
//           </div>
//         </div>

//         <div className={style["comment-content"]}>
//           <span style={{ color: reply.mention ? "#2C59CD" : "black" }}>
//             {firstWord}{" "}
//           </span>
//           {restWords.join("")}
//         </div>

//         <span className={style["date-st"]}> {reply.date}</span>
//       </div>
//     </div>
//   );
// }

// 모달
function OptionModal({ onClickOption, onClickDelete }) {
  return (
    <div className={style["OptionModal"]} onClick={onClickOption}>
      <div className={style["modal_container"]}>
        <div className={style["modal_title"]}>설정</div>
        {/* <div className={style["modal_content"]}>수정</div> */}
        <div
          className={`${style["modal_content"]} ${style["modal_content_accent"]}`}
          onClick={onClickDelete}
        >
          삭제
        </div>
      </div>
    </div>
  );
}
