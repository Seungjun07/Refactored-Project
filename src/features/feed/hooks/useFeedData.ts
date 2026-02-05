import { useEffect, useState } from "react";
import {
  deleteFeed,
  fetchFeedById,
  fetchFeeds,
  toggleFeedStar,
} from "../api/feed";
import type { FeedType } from "../types/feed";
import type { FeedQueryParams } from "../types/feed.api.type";

interface UseFeedDataParams {
  type?: "today" | "weekly" | "all" | "bias";
  filterCategory?: string;
  filterFclass?: "short" | "long";
  biasId?: string;
  board?: string;
  tag?: string;
}

export function useFeedData({
  type,
  biasId,
  filterCategory,
  filterFclass,
  board = "",
  tag,
}: UseFeedDataParams) {
  const [feedData, setFeedData] = useState<FeedType[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 피드 데이터
  async function fetchFeed(reset = false) {
    setIsLoading(true);

    let time;

    const params: FeedQueryParams = {
      type,
      cursor: nextCursor,
    };

    if (type === "today" || type === "weekly") {
      if (tag) params.hashtag = tag;
      if (time) params.time = type;
    }

    if (type === "bias") {
      if (biasId) params.biasId = biasId;
      if (board) params.board = board;
    }

    if (type === "all") {
      if (filterFclass) params.fclass = filterFclass;
      if (filterCategory) params.category = filterCategory;
    }

    const data = await fetchFeeds(params);

    setFeedData((prev) =>
      reset ? data.body.send_data : [...prev, ...data.body.send_data],
    );
    setNextCursor(data.body.next_cursor);
    setHasMore(data.body.hasMore);

    setIsLoading(false);
  }

  // 피드 데이터 by fid
  async function getFeedById(fid: string) {
    const existing = feedData.find((feed) => feed.fid === fid);

    if (existing) return existing;

    setIsLoading(true);

    const data = await fetchFeedById(fid);
    const feed = data.body.feed;

    setFeedData((prev) => {
      if (prev.find((feed) => feed.fid === fid)) return prev;
      return [...prev, feed];
    });

    setIsLoading(false);
    return feed;
  }

  async function removeFeed(fid: string) {
    const data = await deleteFeed(fid);

    return data.body.result;
  }

  // 좋아요 토글 기능
  async function toggleLike(fid: string) {
    const feed = feedData.find((item) => item.fid === fid);

    if (!feed) return;

    // 1. 이전 상태 저장 (롤백용)
    const prevStar = feed.star;
    const prevStarFlag = feed.star_flag;

    // 2. optimistic update
    const newStarFlag = !feed?.star_flag;
    const newStar = newStarFlag ? feed.star + 1 : feed.star - 1;

    setFeedData((prev) =>
      prev.map((feed) =>
        feed.fid === fid
          ? {
              ...feed,
              star: feed.star + (!feed.star_flag ? 1 : -1),
              star_flag: !feed.star_flag,
            }
          : feed,
      ),
    );

    try {
      const data = await toggleFeedStar(fid);

      setFeedData((prev) =>
        prev.map((feed) =>
          feed.fid === fid
            ? { ...feed, star: data.body.star, star_flag: data.body.star_flag }
            : feed,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle like: ", error);
      setFeedData((prev) =>
        prev.map((feed) =>
          feed.fid === fid
            ? { ...feed, star: prevStar, star_flag: prevStarFlag }
            : feed,
        ),
      );
    }
  }

  function resetFeed() {
    setFeedData([]);
    setNextCursor(null);
    setHasMore(true);
  }

  useEffect(() => {
    resetFeed();
    fetchFeed(true);
  }, [type, biasId, filterCategory, filterFclass, board, tag]);

  return {
    feedData,
    nextCursor,
    hasMore,
    isLoading,
    setFeedData,
    getFeedById,
    toggleLike,
    fetchFeed,
    removeFeed,
    resetFeed,
  };
}
