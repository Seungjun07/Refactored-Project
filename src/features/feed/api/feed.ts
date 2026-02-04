import mainApi from "@/services/apis/mainApi";
import HEADER from "@/constant/header";
import type { FeedQueryParams, FeedResponse } from "../types/feed.api.type";

export async function fetchFeeds(
  params: FeedQueryParams = {},
): Promise<FeedResponse> {
  const response = await mainApi.get("/feeds", { params });

  return response.data;
}

export async function fetchFeedById(fid: string) {
  const res = await mainApi.get(`/feeds/${fid}`);

  return res.data;
}

export async function deleteFeed(fid: string) {
  const res = await mainApi.delete(`/feeds/${fid}`);

  return res.data;
}

export async function toggleFeedStar(fid: string) {
  const res = await mainApi.post(`/feeds/${fid}/star`);

  return res.data;
}

export async function fetchLinkImage(url: string) {
  const res = await mainApi.post(`/nova_sub_system/image_tag`, {
    header: HEADER,
    body: url,
  });

  return res.data;
}
