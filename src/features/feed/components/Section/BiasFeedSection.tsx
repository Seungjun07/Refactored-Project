import BiasBoxes from "@/features/bias/components/BiasBoxes";
import StoryFeed from "@/component/StoryFeed/StoryFeed";
import useDragScroll from "@/hooks/useDragScroll";
import style from "@/pages/FeedPage/FeedHashList.module.css";
import { useFeedData } from "../../hooks/useFeedData";
import useBiasStore from "@/stores/BiasStore/useBiasStore";
import type { Feed } from "../../types/feed";

interface BiasFeedSection {
  feedData: Feed[];
  onClickCategory: () => void;
}
export default function BiasFeedSection({
  feedData,
  onClickCategory,
}: BiasFeedSection) {
  const {} = useBiasStore();
  const { fetchBiasFeed } = useFeedData({ type: "bias" });
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();

  return (
    <div className={style["bias-section"]}>
      <BiasBoxes fetchBiasCategoryData={fetchBiasFeed} />
      <h4>게시글 미리보기</h4>

      <div
        ref={scrollRef}
        className={style["story_container"]}
        {...dragHandlers}
      >
        <div className={style["story_wrapper"]}>
          {feedData.map((feed) => {
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
