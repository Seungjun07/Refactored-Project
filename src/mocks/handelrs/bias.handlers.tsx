import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

export const biasHandlers = [
  http.get(`${BASE_URL}/home/my_bias`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        bias_list: [
          { bid: 1, bname: "한결" },
          { bid: 2, bname: "상품2" },
          { bid: 3, bname: "상품3" },
        ],
      },
    });
  }),
];
