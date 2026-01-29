import { http, HttpResponse } from "msw";

// baseURL을 환경변수나 상수로 정의
const BASE_URL = "https://nova-platform.kr";

export const handlers = [
  http.get(`${BASE_URL}/home/today_best`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json(
      {
        success: true,
        data: {
          todayBest: [
            { id: 1, title: "상품1", price: 10000 },
            { id: 2, title: "상품2", price: 20000 },
            { id: 3, title: "상품3", price: 30000 },
          ],
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }),

  http.get(`${BASE_URL}/home/banner`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json(
      {
        success: true,
        body: {
          banner: [
            { id: 1, imageUrl: "상품1", price: 10000 },
            { id: 2, imageUrl: "상품2", price: 20000 },
            { id: 3, imageUrl: "상품3", price: 30000 },
          ],
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
