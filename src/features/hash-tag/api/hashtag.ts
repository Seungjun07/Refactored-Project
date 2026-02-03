import mainApi from "@/services/apis/mainApi";

export async function fetchHashTags(type: string) {
  const res = await mainApi.get(`home/${type}_spiked_hot_hashtag`);

  return res.data;
}
