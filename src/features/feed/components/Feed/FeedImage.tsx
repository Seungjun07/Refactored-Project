import useDragScroll from "@/hooks/useDragScroll";
import style from "@/pages/FeedPage/FeedPage.module.css";

type DragScroll = ReturnType<typeof useDragScroll>;

interface FeedImageProps {
  images?: string[];
  variant: "short" | "long";
  drag: DragScroll;
}

export default function FeedImage({
  images = [],
  variant,
  drag,
}: FeedImageProps) {
  if (variant !== "short" || !images.length) return null;

  return (
    <div className={style["image-container"]}>
      <div
        ref={drag.scrollRef}
        className={`${style["image-origin"]} ${style["two-over-image"]}`}
        {...drag.dragHandlers}
      >
        {images.map((img, i) => {
          return <img key={i} src={img} alt="image" />;
        })}
      </div>
    </div>
  );
}

{
  /* {feed.num_image >= 2 ? (
          feed.image.map((img, i) => {
            return <img key={i} src={img} alt="image" />;
          })
        ) : (
          <img src={feed.image[0]} alt="image" />
        )} */
}
