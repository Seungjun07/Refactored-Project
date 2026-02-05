import FeedItem from "./Feed/FeedItem";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import type { FeedType } from "../types/feed";

interface FeedListProps {
  feedData: FeedType[];
  onLoadMore: () => void;
  toggleLike: (fid: string) => void;
  hasMore: boolean;
}
export default function FeedList({
  feedData,
  onLoadMore,
  toggleLike,
  hasMore,
}: FeedListProps) {
  // 무한 스크롤
  const targetRef = useIntersectionObserver(
    onLoadMore,
    { threshold: 0.5 },
    hasMore,
  );

  return (
    <>
      {feedData.map((feed, idx) => (
        <FeedItem
          key={feed.fid + idx}
          feed={feed}
          onToggleLike={() => toggleLike(feed.fid)}
        />
      ))}
      <div ref={targetRef} style={{ height: "1px" }}></div>
    </>
  );
}
