import mainApi from "@/services/apis/mainApi";

export async function fetchTodayBestFeed() {
  const response = await mainApi.get("/home/today_best");

  const data = response.data;

  return data;
}
