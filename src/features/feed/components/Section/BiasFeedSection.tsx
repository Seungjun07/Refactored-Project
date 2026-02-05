import BiasBoxes from "@/features/bias/components/BiasBoxes";
import StoryFeed from "@/features/feed/components/StoryFeed/StoryFeed";
import useDragScroll from "@/hooks/useDragScroll";
import style from "@/pages/FeedPage/FeedHashList.module.css";
import useBiasStore from "@/stores/BiasStore/useBiasStore";
import type { FeedType } from "../../types/feed";
import { useModalStore } from "@/stores/modalStore";
import CategoryModal from "@/component/Modal/CategoryModal/CategoryModal";

interface BiasFeedSection {
  feedData: FeedType[];
}
export default function BiasFeedSection({ feedData }: BiasFeedSection) {
  const { selectedBias } = useBiasStore();
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();
  const { open, close, activeModal } = useModalStore();
  function handleCategoryClick() {
    open("CATEGORY");
  }

  return (
    <div className={style["bias-section"]}>
      <BiasBoxes />
      <h4>게시글 미리보기</h4>

      <div
        ref={scrollRef}
        className={style["story_container"]}
        {...dragHandlers}
      >
        <div className={style["story_wrapper"]}>
          {feedData.map((feed, idx) => {
            return (
              <StoryFeed
                key={`story_${feed.fid + idx}`}
                feedData={feed}
                hasDragged={hasDragged}
              />
            );
          })}
        </div>
      </div>

      <div className={style["category-info"]}>
        <p>게시글 목록</p>
        <p className={style["category_change"]} onClick={handleCategoryClick}>
          카테고리 변경
        </p>
      </div>

      {activeModal === "CATEGORY" && (
        <CategoryModal
          onClose={close}
          // SetIsOpen={setIsOpendCategory}
          // onClickCategory={onClickCategory}
          biasId={selectedBias?.bid}
          // isOpend={isOpendCategory}
        />
      )}
    </div>
  );
}
