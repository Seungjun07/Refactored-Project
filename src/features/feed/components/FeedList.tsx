import { useFeedData } from "../hooks/useFeedData";
import FeedItem from "./Feed/FeedItem";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useBiasStore from "@/stores/BiasStore/useBiasStore";
import type { Feed, FeedType } from "../types/feed";

interface FeedListProps {
  type: "today" | "weekly" | "all" | "bias" | null;
  feedData: Feed[];
  filterCategory?: string[];
  filterFclass?: string;
}
export default function FeedList({
  type,
  feedData,
  filterCategory,
  filterFclass,
}: FeedListProps) {
  const { isLoading, hasMore, fetchFeed, fetchBiasFeed } = useFeedData({
    type,
    filterCategory,
    filterFclass,
  });
  let { selectedBias } = useBiasStore();

  // useEffect(() => {
  //   if (isSameTag) {
  //     setHasMore(true);
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [isSameTag]);

  const loadMoreCallBack = () => {
    if (!isLoading && hasMore) {
      if (type === "bias") {
        fetchBiasFeed(selectedBias?.bid);
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
