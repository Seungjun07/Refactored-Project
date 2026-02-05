import useBiasStore from "@/stores/BiasStore/useBiasStore";
import { useFeedData } from "./useFeedData";

export function useHomeFeed() {
  let { selectedBias } = useBiasStore();
  const todayBestFeed = useFeedData({ type: "today" });
  const weeklyBestFeed = useFeedData({ type: "weekly" });
  const allFeed = useFeedData({ type: "all" });
  const biasFeeds = useFeedData({ type: "bias", biasId: selectedBias?.bid });

  return {
    todayBestFeed: todayBestFeed.feedData ?? [],
    weeklyBestFeed: weeklyBestFeed.feedData ?? [],
    allFeed: allFeed.feedData ?? [],
    biasFeeds: biasFeeds.feedData ?? [],
  };
}
