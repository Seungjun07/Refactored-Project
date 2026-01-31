import { useEffect, useState } from "react";
import { fetchAllFeedList, fetchFeedListByDate } from "../api/feed";

export function useFeedDataByType(type: string) {
  const [feedData, setFeedData] = useState([]);
  const [nextKey, setNextKey] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFeedData() {
    if (!type) return;

    setIsLoading(true);

    const data = await fetchFeedListByDate(type, nextKey);

    setFeedData((prev) =>
      nextKey === 0 ? data.body.send_data : [...prev, ...data.body.send_data],
    );
    setNextKey(data.body.key);
    setHasMore(data.body.send_data.length > 0);

    setIsLoading(false);
  }

  useEffect(() => {
    setFeedData([]);
    setNextKey(0);
  }, [type]);

  return { feedData, nextKey, hasMore, isLoading, fetchFeedData };
}
