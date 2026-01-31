// hooks/useFeedData.js
import HEADER from "@/constant/header";
import mainApi from "@/services/apis/mainApi";
import { useState } from "react";
import { fetchFeedWithBiasId } from "../api/feed";

export function useFetchFeedWithBias() {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchBiasCategoryData(
    bid?: string,
    biasId?: string,
    bids?: string[],
  ) {
    setIsLoading(true);

    const data = await fetchFeedWithBiasId({
      bid: bid || biasId || bids?.[0] || "",
      board: "자유게시판",
      key: 0,
    });

    setFeedData(data.body.send_data);
    setIsLoading(false);
  }

  return {
    feedData,
    isLoading,
    fetchBiasCategoryData,
  };
}
