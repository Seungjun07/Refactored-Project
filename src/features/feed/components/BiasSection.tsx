import BiasBoxes from "@/component/BiasBoxes/BiasBoxes";

export default function BiasSection() {
  return (
    <div className={style["bias-section"]}>
      <BiasBoxes
        setBiasId={setBiasId}
        fetchBiasCategoryData={fetchBiasCategoryData}
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
