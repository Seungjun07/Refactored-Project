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
  http.post(
    `${BASE_URL}/feed_explore/feed_with_community`,
    async ({ request }) => {
      const body = await request.json();
      console.log("POST body:", body);

      return HttpResponse.json({
        success: true,
        body: {
          send_data: mockFeeds,
          nextkey: 0,
        },
      });
    },
  ),

  http.get(
    `${BASE_URL}/feed_explore/search_feed_with_hashtag`,
    ({ request }) => {
      console.log("MSW hashtag search: ");
      const url = new URL(request.url);
      const hashtag = url.searchParams.get("hashtag");
      const targetTime = url.searchParams.get("target_time");
      const key = Number(url.searchParams.get("key"));

      const filteredFeeds = mockFeeds.filter((item) =>
        item.feed.hashtag.some((tag) => tag.includes(hashtag ?? "")),
      );
      console.log(filteredFeeds);

      const start = key * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      const pageData = filteredFeeds.slice(start, end);

      return HttpResponse.json({
        body: {
          send_data: pageData,
          nextKey: 0,
        },
      });
    },
  ),

  http.get(`${BASE_URL}/feed_explore/:date_best`, ({ request, params }) => {
    const { date_best } = params;

    const url = new URL(request.url);
    const key = Number(url.searchParams.get("key") ?? 0);

    const start = key * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const pageData = mockFeeds.slice(start, end);

    // console.log("MSW HIT:", date_best, key);

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
