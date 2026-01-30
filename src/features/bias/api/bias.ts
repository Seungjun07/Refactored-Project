import mainApi from "@/services/apis/mainApi";

export async function getBiasList() {
  const response = await mainApi.get("/home/my_bias");

  return response.data;
}
