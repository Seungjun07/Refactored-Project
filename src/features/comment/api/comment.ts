import HEADER from "@/constant/header";
import mainApi from "@/services/apis/mainApi";

export async function fetchComments(fid: string) {
  const res = await mainApi.get(
    `/feed_explore/feed_detail/comment_data?fid=${fid}`,
  );

  return res.data;
}

export async function createCommentApi(
  fid: string,
  body: string,
  target_cid: string,
) {
  const res = await mainApi.post("/feed_explore/make_comment", {
    header: HEADER,
    body: {
      fid,
      body,
      target_cid,
    },
  });

  return res.data;
}

export async function removeCommentApi(fid: string, cid: string) {
  const res = await mainApi.get(
    `/feed_explore/remove_comment?fid=${fid}&cid=${cid}`,
  );

  return res.data;
}
