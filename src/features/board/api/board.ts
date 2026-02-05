import mainApi from "@/services/apis/mainApi";

export async function fetchBoard() {
  const res = await mainApi.get(`/boards`);

  return res.data;
}
