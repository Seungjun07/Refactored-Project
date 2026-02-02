import { useEffect, useState } from "react";
import { fetchFeedById, fetchFeedStar } from "../api/feed";
import type { FeedType } from "../types/feed";

export function useFeedDetail(fid: string) {
  const [feed, setFeed] = useState<FeedType | null>(null);

  async function fetchFeed() {
    const data = await fetchFeedById(fid);

    setFeed(data.body.feed.feed);
  }

  async function toggleLike(fid: string) {
    const data = await fetchFeedStar(fid);

    const updatedFeed = data.send_data.feed;

    setFeed((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        feed: {
          star: updatedFeed.star,
          star_flag: updatedFeed.star_flag,
        },
      };
    });
  }

  useEffect(() => {
    fetchFeed();
  }, [fid]);

  return { feed, fetchFeed, toggleLike };
}
