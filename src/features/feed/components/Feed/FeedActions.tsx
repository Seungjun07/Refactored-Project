import LikeStarButton from "@/component/Interaction/LikeStarButton";
import ReportButton from "@/component/Interaction/ReportButton";
import style from "@/pages/FeedPage/FeedPage.module.css";
import { useNavigate } from "react-router-dom";
import comment from "@/img/comment.png";

export default function FeedActions({ feed }) {
  const navigate = useNavigate();

  function handleNavigate(fid: string) {
    navigate(`/feed/${fid}`, {
      state: { commentClick: true },
    });
  }

  return (
    <div className={style["button-container"]}>
      {/* 신고 버튼 */}
      <ReportButton />

      {/* 좋아요 버튼 */}
      <div className={style["button-box1"]}>
        <div className={style["action-button"]}>
          <LikeStarButton
            fid={feed.fid}
            isLiked={feed.star_flag}
            likeCount={feed.star}
          />
        </div>

        <div className={style["action-button"]}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(feed.fid);
            }}
          >
            <img src={comment} alt="comment-icon" />
            <span>{feed.num_comment}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
