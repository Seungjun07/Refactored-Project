import mainApi from "@/services/apis/mainApi";

export async function getBiasList() {
  const response = await mainApi.get("/bias");

  return response.data;
}
