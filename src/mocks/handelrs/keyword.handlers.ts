import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

export const keywordHandlers = [
  http.get(`${BASE_URL}/home/:type_spiked_hot_hashtag`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        hashtags: ["test 1", "test 2", "상품3"],
      },
    });
  }),
];
