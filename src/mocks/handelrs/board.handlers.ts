import { BASE_URL } from "@/services/apis/mainApi";
import { http, HttpResponse } from "msw";

const mockBoard = [
  { id: "1", name: "모든게시판" },
  { id: "2", name: "스토리게시판" },
  { id: "3", name: "자유게시판" },
  { id: "4", name: "팬아트" },
  { id: "5", name: "유머게시판" },
];

export const getRandomBoard = () =>
  mockBoard[Math.floor(Math.random() * mockBoard.length)];

export const boardHandlers = [
  http.get(`${BASE_URL}/boards`, ({ request }) => {
    // 요청 헤더 확인 (디버깅용)

    // 임시 응답 데이터
    return HttpResponse.json({
      success: true,
      body: {
        boards: mockBoard,
      },
    });
  }),
];
