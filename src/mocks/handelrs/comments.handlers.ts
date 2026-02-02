import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

let mockComments = Array.from({ length: 5 }).map((_, i) => ({
  cid: `${i + 1}`,
  reply: [],
  target_cid: 1,
  uname: `user name ${i + 1}`,
  is_reworked: "ds",
  owner: true,
  body: `Mock comment ${i + 1}`,
  date: new Date().toISOString(),
}));

export const commentsHandlers = [
  http.get(`${BASE_URL}/feed_explore/remove_comment`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);
    const url = new URL(request.url);
    const fid = url.searchParams.get("fid");
    const cid = url.searchParams.get("cid");

    mockComments = mockComments.filter((comment) => comment.cid !== cid);
    console.log(mockComments);

    // 임시 응답 데이터
    return HttpResponse.json({
      body: {
        comments: mockComments,
      },
    });
  }),

  http.get(
    `${BASE_URL}/feed_explore/feed_detail/comment_data`,
    ({ request }) => {
      // 요청 헤더 확인 (디버깅용)
      console.log("MSW intercepted:", request.url);
      const url = new URL(request.url);
      const fid = url.searchParams.get("fid");

      // 임시 응답 데이터
      return HttpResponse.json({
        body: {
          comments: mockComments,
        },
      });
    },
  ),

  http.post(`${BASE_URL}/feed_explore/make_comment`, async ({ request }) => {
    const body = await request.json();

    const { fid, body: comment, target_cid } = body.body;
    console.log("makecpmmem", body);
    const newComment = {
      fid,
      body: comment,
      target_cid,
      cid: Date.now().toString(),
      date: new Date().toISOString(),
    };

    mockComments.unshift(newComment);

    // 임시 응답 데이터
    return HttpResponse.json({
      body: {
        comments: mockComments,
      },
    });
  }),
];
