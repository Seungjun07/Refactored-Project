import { useState } from "react";
import {
  fetchAllFeedList,
  fetchFeedListByDate,
  fetchFeedListWithTag,
  fetchFeedWithBiasId,
} from "../api/feed";

interface UseFeedDataParams {
  type: "today" | "weekly" | "all" | "bias" | null;
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
  const [feedData, setFeedData] = useState([]);
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

    // if (type === "today") {
    //   time = "day";
    // } else if (type === "weekly") {
    //   time = "weekly";
    // }

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
    fetchFeed,
    fetchFeedWithTag,
    fetchBiasFeed,
    resetFeed,
  };
}
