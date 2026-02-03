import { useEffect, useState } from "react";
import { fetchHashTags } from "../api/hashtag";

export function useBestHashtags(type: string) {
  const [tags, setTags] = useState<string[]>([]);

  async function fetchTags() {
    const data = await fetchHashTags(type);

    setTags(data.body.hashtags);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags };
}
