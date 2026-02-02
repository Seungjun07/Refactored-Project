import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import style from "@/pages/FeedPage/FeedPage.module.css";

import star from "./../img/favorite.png";
import link_pin_icon from "./../img/link_pin.svg";
import star_color from "./../img/favorite_color.png";
import info_icon from "./../img/Info.svg";
import comment from "./../img/comment.png";
import postApi from "../services/apis/postApi";
import HEADER from "../constant/header";
import mainApi from "../services/apis/mainApi";
import useDragScroll from "../hooks/useDragScroll.ts";
import LikeStarButton from "./Interaction/LikeStarButton";
import ReportButton from "./Interaction/ReportButton";
import { useLinkPreview } from "@/features/feed/hooks/useLinkPreview";
import LinkPreview from "@/features/feed/components/Feed/LinkPreview";
import FeedActions from "@/features/feed/components/Feed/FeedActions";
import FeedImage from "@/features/feed/components/Feed/FeedImage.tsx";
import FeedBody from "@/features/feed/components/Feed/FeedBody.tsx";

// export function useBrightMode() {
//   const params = new URLSearchParams(window.location.search);
//   const brightModeFromUrl = params.get("brightMode");

//   const initialMode =
//     brightModeFromUrl || localStorage.getItem("brightMode") || "bright";

//   const [mode, setMode] = useState(initialMode);

//   useEffect(() => {
//     localStorage.setItem("brightMode", mode);
//   }, [mode]);

//   return [mode, setMode];
// }
const header = HEADER;

export default function Feed({ feed, setFeedData, type }) {
  const [report, setReport] = useState();

  async function fetchReportResult(fid) {
    await postApi.post("nova_sub_system/try_report", {
      header: header,
      body: {
        fid: fid,
      },
    });
    //.then((res) => //console.log("rerere", res.data));
  }

  return (
    <>
      <ContentFeed
        feed={feed}
        // handleCheckStar={handleCheckStar}
        fetchReportResult={fetchReportResult}
      />
    </>
  );
}

export function ContentFeed({
  detailPage,
  feed,
  handleCheckStar,
  links,
  fetchReportResult,
}) {
  let navigate = useNavigate();
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();

  async function fetchOriginalText(fid) {
    await mainApi
      .get(`feed_explore/original_feed_data?fid=${fid}`)
      .then((res) => {
        console.log("done", res);
      });
  }

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
        navigate(`/feed_detail/${feed.fid}`, {
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
        {/* {feed.fclass === "short" && (
          <div className={style["body-content"]}>{feed.body}</div>
        )}
        {feed.fclass === "long" && <Viewer initialValue={feed.raw_body} />} */}
        <FeedImage images={feed.image} variant="short" />
        {/* {feed.image?.length > 0 && feed.fclass === "short" ? (
          <div className={style["image-container"]}>
            <div
              ref={scrollRef}
              className={`${style["image-origin"]} ${style["two-over-image"]}`}
              onMouseDown={dragHandlers.onMouseDown}
              onMouseMove={dragHandlers.onMouseMove}
              onMouseUp={dragHandlers.onMouseUp}
            >
              {feed.num_image >= 2 ? (
                feed.image.map((img, i) => {
                  return <img key={i} src={img} alt="image" />;
                })
              ) : (
                <img src={feed.image[0]} alt="image" />
              )}
            </div>
          </div>
        ) : null} */}
      </div>

      {links && <LinkSection links={links} />}

      <FeedActions feed={feed} />
      {/* <ActionButtons
        feed={feed}
        // handleCheckStar={handleCheckStar}
        fetchReportResult={fetchReportResult}
      /> */}
    </div>
  );
}

// 피드 날짜 및 작성자
// function FeedHeader({ date, nickname }) {
//   return (
//     <div className={style["user-container"]}>
//       <div>{date}</div>
//       <div>{nickname}</div>
//     </div>
//   );
// }

// function AIFilter({ isReworked, fid, fetchOriginalText }) {
//   if (!isReworked) {
//     return null;
//   }
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
function HashTags({ hashtags }) {
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

// function ActionButtons({ feed, fetchReportResult }) {
//   const navigate = useNavigate();

//   return (
//     <div className={style["button-container"]}>
//       <ReportButton />

//       <div className={style["button-box1"]}>
//         <div className={style["action-button"]}>
//           <LikeStarButton
//             fid={feed.fid}
//             isLiked={feed.star_flag}
//             likeCount={feed.star}
//           />
//         </div>

//         <div className={style["action-button"]}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate(`/feed_detail/${feed.fid}`, {
//                 state: { commentClick: true },
//               });
//             }}
//           >
//             <img src={comment} alt="comment-icon" />
//             <span>{feed.num_comment}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function LinkSection({ links }) {
  const [isLoading, setIsLoading] = useState(true);
  const { images, fetchImages } = useLinkPreview(links);
  // async function fetchImageTag() {
  //   for (const item of links)
  //     await postApi
  //       .post("nova_sub_system/image_tag", {
  //         header: HEADER,
  //         body: {
  //           url: item.url,
  //         },
  //       })
  //       .then((res) => {
  //         setLinkImage((prev) => [...prev, res.data.body.image]);
  //         console.log(res.data);
  //       });
  //   setIsLoading(false);
  // }

  useEffect(() => {
    if (links) {
      fetchImages();
    }
    setIsLoading(false);
  }, [links]);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {links.length > 0 && (
        <div className={style["link-line"]}>
          <div className={style["hr-sect"]}>첨부된 링크</div>
          <p>안전을 위해 신뢰할 수 있는 사이트에만 접속하세요.</p>
        </div>
      )}
      {links.map((link, idx) => (
        <LinkPreview key={link.lid} link={link} image={images[idx]} />
      ))}
    </>
  );
}

// function QuizOption({ feed, interaction, handleInteraction }) {
//   return (
//     <ol className={style["quiz-container"]}>
//       {interaction &&
//         interaction?.choice?.map((option, i) => {
//           return (
//             <li
//               key={i}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleInteraction(e, interaction.fid, i);
//               }}
//             >
//               {i + 1}. {option} / {interaction.result[i]}
//             </li>
//           );
//         })}
//     </ol>
//   );
// }
