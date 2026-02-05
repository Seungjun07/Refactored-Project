import type { FeedType } from "@/features/feed/types/feed";
import style from "./AllPost.module.css";
import StoryFeed from "@/features/feed/components/StoryFeed/StoryFeed";

export default function AllPost({ feedData }: { feedData: FeedType[] }) {
  return (
    <div className={`${style["wrap-container"]} ${style["allpost-container"]}`}>
      <div className={`${style["all-list"]} `}>
        {feedData.map((feed) => {
          return <StoryFeed key={feed.fid} feedData={feed} type={"home"} />;
        })}
      </div>
    </div>
  );
}
