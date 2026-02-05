import { useNavigate } from "react-router-dom";
import style from "./FeedThumbnail.module.css";
import more_icon from "@/img/home_arrow.svg";
import NoneFeed from "../../../../component/NoneFeed/NoneFeed";
import type { FeedType } from "@/features/feed/types/feed";
import type { ReactNode } from "react";
import FeedSlider from "../../../../component/Slider/FeedSlider";

interface FeedThumbnailProps {
  title: ReactNode;
  img_src: string;
  feedData: FeedType[];
  children?: ReactNode;
  endPoint: string;
  type?: "bias" | "default";
  replaceContent?: boolean;
  customClassName?: string;
}

export default function FeedThumbnail({
  title,
  img_src,
  feedData,
  endPoint,
  children,
  type = "default",
  replaceContent = false,
  customClassName,
}: FeedThumbnailProps) {
  const navigate = useNavigate();

  const isEmpty = feedData.length === 0;
  return (
    <section className={style["FeedThumbnail"]}>
      <div
        className={style["title-section"]}
        onClick={() => navigate(endPoint)}
      >
        <div className={style["title"]}>
          <img src={img_src} alt="thumbnail" />
          {title}
        </div>
        <div className={`${style["more-icon"]}`}>
          <img src={more_icon} alt="더보기"></img>
        </div>
      </div>

      {/* AllPost, BiasBoxes */}
      {children}

      {!replaceContent && isEmpty && <NoneFeed />}

      {!replaceContent && (
        <FeedSlider
          feedData={feedData}
          type={type === "bias" ? "bias" : undefined}
          className={customClassName || ""}
        />
      )}
    </section>
  );
}
