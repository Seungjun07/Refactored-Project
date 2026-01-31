import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

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

export const feedHandlers = [
  http.get(`${BASE_URL}/home/today_best`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        send_data: [
          {
            feed: {
              fid: 1,
              nickname: "밍바라기",
              hashtag: ["이시연", "qwer"],
              body: "상품1",
              star: 114,
              star_flag: false,
              num_comment: 0,
              uid: "1234",
            },
          },
          {
            feed: {
              fid: 2,
              nickname: "밍바라기",
              hashtag: ["이시연", "qwer"],
              body: "상품1",
              star: 114,
              star_flag: false,
              num_comment: 0,
              uid: "1234",
            },
          },
          {
            feed: {
              fid: 3,
              nickname: "밍바라기",
              hashtag: ["이시연", "qwer"],
              body: "상품1",
              star: 114,
              star_flag: false,
              num_comment: 0,
              uid: "1234",
            },
          },
        ],
      },
    });
  }),

  http.get(`${BASE_URL}/home/weekly_best`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        send_data: [
          {
            feed: {
              fid: 1,
              nickname: "밍바라기",
              hashtag: ["이시연", "qwer"],
              body: "상품1",
              star: 114,
              star_flag: false,
              num_comment: 0,
              uid: "1234",
            },
          },
        ],
      },
    });
  }),

  http.get(`${BASE_URL}/home/all_feed`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        send_data: [
          {
            feed: {
              fid: 1,
              nickname: "밍바라기",
              hashtag: ["이시연", "qwer"],
              body: "상품1",
              star: 114,
              star_flag: false,
              num_comment: 0,
              uid: "1234",
            },
          },
        ],
      },
    });
  }),

  http.post(
    `${BASE_URL}/feed_explore/feed_with_community`,
    async ({ request }) => {
      const body = await request.json();
      console.log("POST body:", body);

      return HttpResponse.json({
        success: true,
        body: {
          send_data: mockFeeds,
        },
      });
    },
  ),
];
