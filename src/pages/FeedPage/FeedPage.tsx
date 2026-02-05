import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import useBiasStore from "../../stores/BiasStore/useBiasStore.js";
import { useBoardStore } from "@/stores/BoardStore/useBoardStore.ts";
import { useFilterStore } from "@/stores/FilterStore/useFilterStore.ts";
import { useFeedData } from "@/features/feed/hooks/useFeedData.js";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import style from "./FeedHashList.module.css";

import NoneFeed from "../../component/NoneFeed/NoneFeed.js";
import Header from "../../component/Header/Header.js";
import FeedList from "@/features/feed/components/FeedList.js";
import FeedSearchSection from "@/features/feed/components/Section/FeedSearchSection.js";
import KeywordFeedSection from "@/features/feed/components/Section/KeywordFeedSection.js";
import BiasFeedSection from "@/features/feed/components/Section/BiasFeedSection.js";

export default function FeedPage() {
  // url 파라미터 가져오기
  const [params] = useSearchParams();
  const [tag, setTag] = useState("");

  const FEED_TYPES = ["today", "weekly", "all", "bias"] as const;
  type FeedType = (typeof FEED_TYPES)[number];

  const rawType = params.get("type");

  const type: FeedType | null = FEED_TYPES.includes(rawType as FeedType)
    ? (rawType as FeedType)
    : "all";

  // 전역 상태 관리
  let { selectedBias } = useBiasStore();
  const { selectedBoard } = useBoardStore();
  const { fclass, category } = useFilterStore();

  const { feedData, fetchFeed, toggleLike, isLoading, hasMore } = useFeedData({
    type,
    filterCategory: category,
    filterFclass: fclass,
    biasId: selectedBias?.bid,
    board: selectedBoard,
    tag,
  });

  function onClickTag(clickedTag: string) {
    setTag((prev) => {
      return prev === clickedTag ? "" : clickedTag;
    });
  }

  function loadMore() {
    if (!hasMore || isLoading) return;

    fetchFeed();
  }

  return (
    <div className={`all-box ${style["all_container"]}`}>
      <div className={`${style["container"]} `}>
        <Header />
        {type === "bias" && <BiasFeedSection feedData={feedData} />}
        {type === "all" && <FeedSearchSection />}

        {(type === "today" || type === "weekly") && (
          <KeywordFeedSection type={type} onClickTag={onClickTag} />
        )}

        <div
          className={
            feedData.length > 0
              ? style["scroll-area"]
              : style["none_feed_scroll"]
          }
        >
          {feedData.length > 0 ? (
            <FeedList
              feedData={feedData}
              onLoadMore={loadMore}
              toggleLike={toggleLike}
              hasMore={hasMore}
            />
          ) : (
            <NoneFeed />
          )}
        </div>
      </div>
    </div>
  );
}
