import { useNavigate } from "react-router-dom";
import style from "./StoryFeed.module.css";
import type { FeedType } from "@/features/feed/types/feed";

interface StoryFeedProps {
  feedData: FeedType;
  type?: "home";
  hasDragged?: boolean;
}
export default function StoryFeed({
  feedData,
  type,
  hasDragged,
}: StoryFeedProps) {
  let navigate = useNavigate();

  function onClickFeed(fid: string) {
    navigate(`/feed/${fid}`, { state: { commentClick: false } });
  }

  if (!feedData) {
    return <div>loading...</div>;
  }

  return (
    <div
      className={`${style["story_feed"]} ${style[`story_feed_${type}`]}`}
      onClick={() => {
        if (hasDragged) return;
        onClickFeed(feedData.fid);
      }}
    >
      <div className={style["all-img"]}>
        <img
          src={
            feedData?.image?.length > 0
              ? feedData.image[0]
              : "https://kr.object.ncloudstorage.com/nova-feed-images/nova-platform.png"
          }
          alt="이미지"
        />
      </div>
      <div className={style["all-text"]}>
        <p>{feedData.body}</p>
      </div>
    </div>
  );
}
