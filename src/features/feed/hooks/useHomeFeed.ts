import useBiasStore from "@/stores/BiasStore/useBiasStore";
import { useEffect } from "react";
import useFetchFeedData from "./useFetchFeedData";
import { useFetchFeedWithBias } from "./useFetchFeedWithBias";

export function useHomeFeed() {
  const { data: todayBestFeed } = useFetchFeedData(`/home/today_best`);
  const { data: weeklyFeed } = useFetchFeedData(`/home/weekly_best`);
  const { data: allFeed } = useFetchFeedData(`/home/all_feed`);

  let { selectedBias } = useBiasStore();

  const { feedData: biasFeed, fetchBiasCategoryData } = useFetchFeedWithBias();

  useEffect(() => {
    fetchBiasCategoryData();
  }, [selectedBias]);

  return {
    feeds: {
      todayBestFeed,
      weeklyFeed,
      allFeed,
      biasFeed,
    },
    biasActions: {
      fetchBiasCategoryData,
    },
  };
}
