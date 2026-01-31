import mainApi from "@/services/apis/mainApi";
import type { FeedRequest } from "../types/feed";
import HEADER from "@/constant/header";

// home 엔드 포인트
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

// feed_explore 엔드 포인트
export async function fetchFeedWithBiasId(payload: FeedRequest) {
  const response = await mainApi.post(`/feed_explore/feed_with_community`, {
    header: HEADER,
    body: payload,
  });

  return response.data;
}

// 주간, 오늘 피드 데이터
export async function fetchFeedListByDate(type: string, nextData: number) {
  const res = await mainApi.get(`feed_explore/${type}_best?key=${nextData}`);
  return res.data;
}

// 전체 피드 데이터 추가 받기
export async function fetchAllFeedList(
  nextData: number,
  filterCategory?: string[],
  filterFclass?: string,
) {
  const res = await mainApi.post(`feed_explore/all_feed`, {
    header: HEADER,
    body: {
      key: nextData,
      category: filterCategory || [""],
      fclass: filterFclass || "",
    },
  });
  return res.data;
}

// 태그 클릭 시 피드 받기
export async function fetchFeedListWithTag(tag: string, time: string) {
  const res = await mainApi.get(
    `feed_explore/search_feed_with_hashtag?hashtag=${tag}&key=0&target_time=${time}`,
  );
  return res.data;
}

// // 주제별 피드 리스트
// export async function fetchBiasFeedList(bid, bids, board, nextData) {
//   let bodyData = {
//     bid: bid || bids?.[0] || "",
//     board: board || "",
//     key: nextData || -1,
//   };

//   const res = await mainApi.post(`feed_explore/feed_with_community`, {
//     header: HEADER,
//     body: bodyData,
//   });

//   return res.data;
// }
