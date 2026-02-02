import BiasBoxes from "@/component/BiasBoxes/BiasBoxes";
import StoryFeed from "@/component/StoryFeed/StoryFeed";
import useDragScroll from "@/hooks/useDragScroll";
import style from "@/pages/FeedPage/FeedPage.module.css";
import { useFeedData } from "../../hooks/useFeedData";
import useBiasStore from "@/stores/BiasStore/useBiasStore";

export default function BiasSection() {
  const { setBiasId } = useBiasStore();
  const { feedData, fetchBiasFeed } = useFeedData({ type: "bias" });
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();

  return (
    <div className={style["bias-section"]}>
      <BiasBoxes
        // setBiasId={setBiasId}
        fetchBiasCategoryData={fetchBiasFeed}
      />
      <h4>게시글 미리보기</h4>
      <div
        ref={scrollRef}
        className={style["story_container"]}
        onMouseDown={dragHandlers.onMouseDown}
        onMouseUp={dragHandlers.onMouseUp}
        onMouseMove={dragHandlers.onMouseMove}
      >
        <div className={style["story_wrapper"]}>
          {feedData.map((feed, i) => {
            return (
              <StoryFeed
                key={`story_${feed.feed.fid}`}
                feedData={feed}
                hasDragged={hasDragged}
              />
            );
          })}
        </div>
      </div>

      <div className={style["category-info"]}>
        <p>게시글 목록</p>
        <p className={style["category_change"]} onClick={onClickCategory}>
          카테고리 변경
        </p>
      </div>

      {/* {biasId && (
              <CategoryModal
                SetIsOpen={setIsOpendCategory}
                onClickCategory={onClickCategory}
                biasId={biasId}
                isOpend={isOpendCategory}
              />
            )} */}
    </div>
  );
}
