import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

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
          send_data: [
            {
              feed: {
                id: 1,
                bid: body.body.bid,
                nickname: "hello",
                board: "자유게시판",
                title: "테스트 게시글 1",
                content: "테스트 내용입니다",
                author: "사용자1",
                hashtag: [],
                createdAt: new Date().toISOString(),
                likes: 10,
                comments: 5,
              },
            },
            {
              feed: {
                id: 2,
                bid: body.body.bid,
                nickname: "hello",
                board: "자유게시판",
                title: "테스트 게시글 1",
                content: "테스트 내용입니다",
                hashtag: [],
                author: "사용자1",
                createdAt: new Date().toISOString(),
                likes: 10,
                comments: 5,
              },
            },
          ],
        },
      });
    },
  ),
];
