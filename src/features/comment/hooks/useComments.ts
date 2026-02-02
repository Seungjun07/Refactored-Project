import { useEffect, useState } from "react";
import {
  createCommentApi,
  fetchComments,
  removeCommentApi,
} from "../api/comment";

export function useComments(fid: string) {
  const [comments, setComments] = useState([]);

  async function fetchFeedComments() {
    const data = await fetchComments(fid);

    setComments(data.body.comments);
  }

  async function onCreateComment(body: string, targetCid: string) {
    const data = await createCommentApi(fid, body, targetCid);

    setComments((prev) => ({ ...prev, ...data.body.comment }));
  }

  async function onRemoveComment(targetCid: string) {
    const data = await removeCommentApi(fid, targetCid);

    setComments(data.body.comments);
  }

  useEffect(() => {
    fetchFeedComments();
  }, []);

  return { comments, onCreateComment, onRemoveComment };
}
