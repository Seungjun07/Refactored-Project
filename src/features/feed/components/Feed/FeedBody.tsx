import style from "@/pages/FeedPage/FeedPage.module.css";
import { Viewer } from "@toast-ui/react-editor";
import type { FeedType } from "../../types/feed";

export default function FeedBody({ feed }: { feed: FeedType }) {
  if (feed.fclass === "long") {
    return <Viewer initialValue={feed.raw_body} />;
  }

  return <div className={style["body-content"]}>{feed.body}</div>;
}
