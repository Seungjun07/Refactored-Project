import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";
import wolf from "@/assets/wolf.jpg";

export const biasHandlers = [
  http.get(`${BASE_URL}/home/my_bias`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted111111111:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        bias_list: [
          { bid: "1", bname: "한결", img: wolf },
          { bid: "2", bname: "상품2", img: "@/assets/bird.jpg" },
          { bid: "3", bname: "상품3", img: "@/assets/wolf.jpg" },
        ],
      },
    });
  }),
];
