import StoryFeed from "../StoryFeed/StoryFeed";
import style from "./AllPost.module.css";

export default function AllPost({ allFeed }) {
  return (
    <div className={`${style["wrap-container"]} ${style["allpost-container"]}`}>
      <div className={`${style["all-list"]} `}>
        {allFeed.map((feed, i) => {
          return (
            <StoryFeed key={feed.feed.fid} feedData={feed} type={"home"} />
          );
        })}
      </div>
    </div>
  );
}
