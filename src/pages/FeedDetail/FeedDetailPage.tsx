import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import more_icon from "./../../img/more_icon.svg";
import back from "./../../img/detail_back.png";
import style from "./FeedDetail.module.css";

import FeedItem from "@/features/feed/components/Feed/FeedItem";
import CommentSection from "@/features/comment/components/CommentSection";
import OptionModal from "@/component/Modal/OptionModal/OptionModal";
import { useFeedData } from "@/features/feed/hooks/useFeedData";

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

  function onClickOption() {
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
          <button className={style["delete-button"]} onClick={onClickOption}>
            <img src={more_icon} />
          </button>
        )}
        {showMoreOption && (
          <OptionModal onClick={onClickOption} onDelete={handleDeleteFeed} />
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
