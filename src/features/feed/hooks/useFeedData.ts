import { useState } from "react";
import {
  fetchAllFeedList,
  fetchFeedListByDate,
  fetchFeedListWithTag,
  fetchFeedStar,
  fetchFeedWithBiasId,
} from "../api/feed";
import type { Feed, FeedType } from "../types/feed";

interface UseFeedDataParams {
  type?: "today" | "weekly" | "all" | "bias" | null;
  filterCategory?: string[];
  filterFclass?: string;
  biasId?: string;
  bids?: string[];
  board?: string;
}

export function useFeedData({
  type,
  filterCategory = [],
  filterFclass = "",
  biasId = "",
  bids = [],
  board = "",
}: UseFeedDataParams) {
  const [feedData, setFeedData] = useState<Feed[]>([]);
  const [nextKey, setNextKey] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFeed() {
    setIsLoading(true);

    let data;

    if (type === "today" || type === "weekly") {
      data = await fetchFeedListByDate(type, nextKey);
    }

    if (type === "all") {
      data = await fetchAllFeedList(nextKey, filterCategory, filterFclass);
    }

    if (data) {
      setFeedData((prev) =>
        nextKey === 0 ? data.body.send_data : [...prev, ...data.body.send_data],
      );
      setNextKey(data.body.key);
      setHasMore(data.body.send_data.length > 0);
    }

    setIsLoading(false);
  }

  // 태그 클릭 시 데이터 받기
  async function fetchFeedWithTag(tag: string) {
    setIsLoading(true);

    const timeMap = { today: "day", weekly: "weekly" } as const;

    const time = timeMap[type as "today" | "weekly"];

    if (!time) return;

    const data = await fetchFeedListWithTag(tag, time);
    setFeedData(data.body.send_data);
    setNextKey(data.body.key);
    // setHasMore(false)
    setIsLoading(false);
  }

  async function fetchBiasFeed(bid?: string) {
    setIsLoading(true);
    const currentBid = bid || bids[0] || "";

    const data = await fetchFeedWithBiasId({
      bid: currentBid,
      board,
      key: nextKey,
    });
    setFeedData((prev) =>
      nextKey === 0 ? data.body.send_data : [...prev, ...data.body.send_data],
    );
    setNextKey(data.body.key);
    setHasMore(data.body.send_data.length > 0);
    setIsLoading(false);
  }

  async function handleToggleLike(fid: string) {
    const data = await fetchFeedStar(fid);

    const updatedFeed = data.send_data.feed;

    setFeedData((prev) =>
      prev.map((feed) =>
        feed.fid === fid
          ? {
              ...feed,
              feed: {
                ...feed,
                star: updatedFeed.star,
                star_flag: updatedFeed.star_flag,
              },
            }
          : feed,
      ),
    );
  }

  function resetFeed() {
    setFeedData([]);
    setNextKey(0);
    setHasMore(true);
  }

  return {
    feedData,
    nextKey,
    hasMore,
    isLoading,
    setFeedData,
    fetchFeed,
    fetchFeedWithTag,
    fetchBiasFeed,
    handleToggleLike,
    resetFeed,
  };
}
