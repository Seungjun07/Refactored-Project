import { useNavigate } from "react-router-dom";
import style from "@/pages/FeedPage/FeedPage.module.css";

// import info_icon from "./../img/Info.svg";
import FeedActions from "@/features/feed/components/Feed/FeedActions";
import LinkSection from "./LinkSection";
import FeedImage from "./FeedImage.js";
import FeedBody from "./FeedBody.js";
import type { FeedType } from "../../types/feed.js";
import useDragScroll from "@/hooks/useDragScroll.ts";

// const header = HEADER;

// export function Feed({ feed, setFeedData, type }) {

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

//   return (
//     <>
//       <ContentFeed
//         feed={feed}
//         // handleCheckStar={handleCheckStar}
//         fetchReportResult={fetchReportResult}
//       />
//     </>
//   );
// }
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
}

export default function FeedItem({ detailPage, feed, links }: FeedItemProps) {
  let navigate = useNavigate();
  const { hasDragged } = useDragScroll();

  if (!feed) {
    return <div>loading 중...</div>;
  }

  return (
    <div
      className={`${style["wrapper-container"]} ${feed.fclass === "long" && style["long-wrapper"]}`}
      onClick={(e) => {
        if (hasDragged) return;
        e.preventDefault();
        e.stopPropagation();
        navigate(`/feed/${feed.fid}`, {
          state: { commentClick: false },
        });
      }}
    >
      <div className={style["user-container"]}>
        <div>{feed.date}</div>
        <div>{feed.nickname}</div>
      </div>

      {/* <AIFilter
        isReworked={feed.is_reworked}
        fid={feed.fid}
        fetchOriginalText={fetchOriginalText}
      /> */}

      <div
        className={`${style["body-container"]} ${detailPage ? "" : style["long-form-hidden"]}`}
      >
        <HashTags hashtags={feed.hashtag} />

        <FeedBody feed={feed} />
        <FeedImage images={feed.image} variant="short" />
      </div>

      {links && <LinkSection links={links} />}

      <FeedActions feed={feed} />
    </div>
  );
}

// function AIFilter({ isReworked, fid, fetchOriginalText }) {
//   if (!isReworked) {
//     return null;
//   }

// async function fetchOriginalText(fid) {
//   await mainApi
//     .get(`feed_explore/original_feed_data?fid=${fid}`)
//     .then((res) => {
//       console.log("done", res);
//     });
// }
//   return (
//     <div className={style["AI_container"]}>
//       <div className={style["AI_text_info"]}>
//         <span>
//           <img src={info_icon} alt="info" />
//         </span>
//         본 게시글의 본문은 AI에 의해 필터링 되었습니다.
//       </div>
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           fetchOriginalText(fid);
//         }}
//       >
//         원문 보기
//       </button>
//     </div>
//   );
// }

// 해시 태그
function HashTags({ hashtags }: { hashtags: string[] }) {
  if (!hashtags || hashtags.length === 0) {
    return null;
  }

  return (
    <div className={style["body-hashtag"]}>
      {hashtags.length !== 0 &&
        hashtags.map((tag, i) => {
          return <span key={i}>#{tag}</span>;
        })}
    </div>
  );
}
