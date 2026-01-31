import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

const PAGE_SIZE = 10;

const mockFeeds = Array.from({ length: 30 }).map((_, i) => ({
  feed: {
    fid: i + 1,
    title: `Mock Feed ${i + 1}`,
    body: `this is mock content ${i + 1}`,
    bid: `${i + 1}`,
    nickname: `${i}`,
    date: "2026/01/30",
    board: "자유게시판",
    content: "테스트 내용입니다",
    author: `사용자 ${i}`,
    hashtag: [`test ${i}`],
    createdAt: new Date().toISOString(),
    star: 10,
    star_flag: false,
    num_comment: 5,
  },
}));

export const exploreHandlers = [
  http.get(`${BASE_URL}/feed_explore/:date_best`, ({ request, params }) => {
    const { date_best } = params;

    const url = new URL(request.url);
    const key = Number(url.searchParams.get("key") ?? 0);

    const start = key * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const pageData = mockFeeds.slice(start, end);

    console.log("MSW HIT:", date_best, key);

    return HttpResponse.json({
      body: {
        send_data: pageData,
        nextKey: key + 1,
      },
    });
  }),

  http.post(`${BASE_URL}/feed_explore/all_feed`, async ({ request }) => {
    const body = await request.json();
    console.log("POST body:", body);

    return HttpResponse.json({
      success: true,
      body: {
        send_data: mockFeeds,
      },
    });
  }),
];
