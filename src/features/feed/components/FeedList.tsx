import FeedItem from "./Feed/FeedItem";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useBiasStore from "@/stores/BiasStore/useBiasStore";
import type { FeedType } from "../types/feed";

interface FeedListProps {
  type: "today" | "weekly" | "all" | "bias";
  feedData: FeedType[];
  filterCategory?: string[];
  filterFclass?: string;
  onLoadMore?: () => void;
  toggleLike: (fid: string) => void;
}
export default function FeedList({
  type,
  feedData,
  filterCategory,
  filterFclass,
  onLoadMore,
  toggleLike,
}: FeedListProps) {
  // useEffect(() => {
  //   if (isSameTag) {
  //     setHasMore(true);
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [isSameTag]);

  // const loadMoreCallBack = () => {
  //   if (!isLoading && hasMore) {
  //     if (type === "bias") {
  //       fetchBiasFeed(selectedBias?.bid);
  //     } else {
  //       fetchFeed();
  //     }
  //   }
  // };

  // 무한 스크롤
  // const targetRef = useIntersectionObserver(
  //   onLoadMore,
  //   { threshold: 0.5 },
  //   hasMore,
  // );

  return (
    <>
      {feedData.map((feed, idx) => (
        <FeedItem
          key={feed.fid + idx}
          feed={feed}
          onToggleLike={() => toggleLike(feed.fid)}
        />
      ))}
      {/* <div ref={targetRef} style={{ height: "1px" }}></div> */}
    </>
  );
}
