import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

export const exploreHandlers = [
  http.post(`${BASE_URL}/feed_explore/all_feed`, async ({ request }) => {
    const body = await request.json();
    console.log("POST body:", body);

    return HttpResponse.json({
      success: true,
      body: {
        send_data: [
          {
            feed: {
              body: "테스트111111",
              fid: 1,
              bid: "214214214",
              nickname: "hello",
              date: "2026/01/30",
              board: "자유게시판",
              title: "테스트 게시글 1",
              content: "테스트 내용입니다",
              author: "사용자1",
              hashtag: ["test"],
              createdAt: new Date().toISOString(),
              star: 10,
              star_flag: false,
              num_comment: 5,
            },
          },
          {
            feed: {
              body: "테스트",
              fid: 2,
              bid: "1002",
              nickname: "hello",
              date: "2026/01/28",
              board: "자유게시판",
              title: "테스트 게시글 1",
              content: "테스트 내용입니다",
              hashtag: ["테스트"],
              author: "사용자1",
              createdAt: new Date().toISOString(),
              star: 10,
              star_flag: false,
              num_comment: 5,
            },
          },
        ],
      },
    });
  }),
];
