import type { FeedType } from "@/features/feed/types/feed";
import style from "./MainPart.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

interface SliderItemProps {
  feed: FeedType;
  type?: "bias" | "default";
  onClick: (fid: string) => void;
}
export default function SliderItem({ feed, type, onClick }: SliderItemProps) {
  return (
    <div className="slide-box">
      <div className={`slide-content`} onClick={() => onClick(feed.fid)}>
        {type === "bias" && (
          <div className={style["name-container"]}>
            <div className={style["profile"]}>{feed.nickname}</div>
          </div>
        )}

        {!type && (
          <div className={style["img-container"]}>
            <img
              src={
                feed.image?.length > 0
                  ? feed.image[0]
                  : "https://kr.object.ncloudstorage.com/nova-feed-images/nova-platform.png"
              }
              alt="이미지"
            />
          </div>
        )}

        <section className={style["text-container"]}>
          <div className={style["tag-text"]}>
            {feed.hashtag?.map((tag: string, i) => {
              return (
                <span key={i} className={style["tag"]}>
                  #{tag}
                </span>
              );
            })}
          </div>
          <div className={style["main-text"]}>{feed.body}</div>
        </section>
        <footer className={style["like-comment"]}>
          좋아요 {feed.star}개 | 댓글 {feed.num_comment}개
        </footer>
      </div>
    </div>
  );
}
