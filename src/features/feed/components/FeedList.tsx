import { useEffect } from "react";
import { useFeedData } from "../hooks/useFeedData";
import FeedItem from "./Feed/FeedItem";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useBiasStore from "@/stores/BiasStore/useBiasStore";

interface FeedListProps {
  type: "today" | "weekly" | "all" | "bias" | null;
  filterCategory?: string[];
  filterFclass?: string;
}
export default function FeedList({
  type,
  filterCategory,
  filterFclass,
}: FeedListProps) {
  const {
    feedData,
    nextKey,
    isLoading,
    hasMore,
    fetchFeed,
    setFeedData,
    fetchFeedWithTag,
    fetchBiasFeed,
    resetFeed,
  } = useFeedData({ type, filterCategory, filterFclass });
  let { biasList, biasId, setBiasId } = useBiasStore();

  useEffect(() => {
    if (!type) return;
    resetFeed();

    if (type === "bias") {
      fetchBiasFeed(biasId);
    } else {
      fetchFeed();
    }
  }, [type]);

  // useEffect(() => {
  //   if (isSameTag) {
  //     setHasMore(true);
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [isSameTag]);

  function onClickTag(tag: string) {
    fetchFeedWithTag(tag);
  }

  const loadMoreCallBack = () => {
    if (!isLoading && hasMore) {
      if (type === "bias") {
        fetchBiasFeed(biasId);
      } else {
        fetchFeed();
      }
    }
  };

  // 무한 스크롤
  const targetRef = useIntersectionObserver(
    loadMoreCallBack,
    { threshold: 0.5 },
    hasMore,
  );

  return (
    <>
      {feedData.map((feed) => (
        <FeedItem key={feed.feed.fid} feed={feed.feed} />
      ))}
      {/* <div ref={targetRef} style={{ height: "1px" }}></div> */}
    </>
  );
}
