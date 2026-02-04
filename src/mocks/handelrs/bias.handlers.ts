import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";
import wolf from "@/assets/wolf.jpg";

const createRandomBias = (fid: number) => ({
  bid: `bias-${fid + 1}`,
  bname: `Bias-${fid + 1}`,
});

const mockBias = [
  { bid: "1", bname: "한결", img: wolf },
  { bid: "2", bname: "늑대", img: wolf },
  { bid: "3", bname: "새", img: "@/assets/wolf.jpg" },
];

export const biasHandlers = [
  http.get(`${BASE_URL}/bias`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)
    console.log("MSW intercepted111111111:", request.url);
    console.log("Credentials:", request.credentials);

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        bias_list: mockBias,
      },
    });
  }),
];
