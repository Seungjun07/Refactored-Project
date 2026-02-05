import { useNavigate } from "react-router-dom";
import style from "@/pages/FeedPage/FeedPage.module.css";

import FeedActions from "@/features/feed/components/Feed/FeedActions";
import LinkSection from "./LinkSection";
import FeedImage from "./FeedImage.js";
import FeedBody from "./FeedBody.js";
import type { FeedType } from "../../types/feed.js";
import useDragScroll from "@/hooks/useDragScroll.ts";
import FeedHashTags from "./FeedHashTags.js";

type Link = {
  lid: string;
  title: string;
  domain: string;
  explain: string;
  url: string;
};
interface FeedItemProps {
  detailPage?: boolean;
  feed: FeedType;
  links?: Link[];
  onToggleLike: () => void;
}

export default function FeedItem({
  detailPage,
  feed,
  links,
  onToggleLike,
}: FeedItemProps) {
  let navigate = useNavigate();
  const drag = useDragScroll();

  if (!feed) {
    return <div>loading 중...</div>;
  }

  return (
    <div
      className={`${style["wrapper-container"]} ${feed.fclass === "long" && style["long-wrapper"]}`}
      onClick={() => {
        if (drag.hasDragged) return;

        navigate(`/feed/${feed.fid}`, {
          state: { commentClick: false },
        });
      }}
    >
      <div className={style["user-container"]}>
        <div>{feed.date}</div>
        <div>{feed.nickname}</div>
      </div>

      <div
        className={`${style["body-container"]} ${detailPage ? "" : style["long-form-hidden"]}`}
      >
        <FeedHashTags hashtags={feed.hashtag} />

        <FeedBody feed={feed} />
        <FeedImage images={feed.image} variant="short" drag={drag} />
      </div>

      {links && <LinkSection links={links} />}

      <FeedActions feed={feed} onToggleLike={onToggleLike} />
    </div>
  );
}

//   const [report, setReport] = useState();

//   async function fetchReportResult(fid) {
//     await postApi.post("nova_sub_system/try_report", {
//       header: header,
//       body: {
//         fid: fid,
//       },
//     });
//     //.then((res) => //console.log("rerere", res.data));
//   }
