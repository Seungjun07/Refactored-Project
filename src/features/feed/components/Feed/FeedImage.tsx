import useDragScroll from "@/hooks/useDragScroll";
import style from "@/pages/FeedPage/FeedPage.module.css";

interface FeedImageProps {
  images?: string[];
  variant: "short" | "long";
}

export default function FeedImage({ images = [], variant }: FeedImageProps) {
  if (variant !== "short" || !images.length) return null;

  const { scrollRef, dragHandlers } = useDragScroll();

  return (
    <div className={style["image-container"]}>
      <div
        ref={scrollRef}
        className={`${style["image-origin"]} ${style["two-over-image"]}`}
        onMouseDown={dragHandlers.onMouseDown}
        onMouseMove={dragHandlers.onMouseMove}
        onMouseUp={dragHandlers.onMouseUp}
      >
        {images.map((img, i) => {
          return <img key={i} src={img} alt="image" />;
        })}
        {/* {feed.num_image >= 2 ? (
          feed.image.map((img, i) => {
            return <img key={i} src={img} alt="image" />;
          })
        ) : (
          <img src={feed.image[0]} alt="image" />
        )} */}
      </div>
    </div>
  );
}
