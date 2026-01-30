import mainApi from "@/services/apis/mainApi";
import type { FeedRequest } from "../types/feed";
import HEADER from "@/constant/header";

export async function fetchTodayBestFeed() {
  const response = await mainApi.get("/home/today_best");

  return response.data;
}

export async function fetchWeeklyBestFeed() {
  const response = await mainApi.get("/home/weekly_best");

  return response.data;
}

export async function fetchAllFeed() {
  const response = await mainApi.get("/home/all_feed");

  return response.data;
}

export async function fetchFeedWithBiasId(payload: FeedRequest) {
  const response = await mainApi.post(`/feed_explore/feed_with_community`, {
    header: HEADER,
    body: payload,
  });

  return response.data;
}
