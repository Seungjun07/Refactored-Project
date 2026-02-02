import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useBiasStore from "../../stores/BiasStore/useBiasStore.js";

import { getModeClass } from "../../App.js";

import filter_icon from "./../../img/filter.svg";

import BiasBoxes from "../../component/BiasBoxes/BiasBoxes.js";
// import FilterModal from "../../component/FilterModal/FilterModal.js";
import SearchBox from "../../component/SearchBox.js";
import KeywordBox from "../../component/keyword/KeywordBox.js";
// import CategoryModal from "../../component/CategoryModal/CategoryModal.js";
import NoneFeed from "../../component/NoneFeed/NoneFeed.js";
import Header from "../../component/Header/Header.js";
import StoryFeed from "../../component/StoryFeed/StoryFeed.js";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import style from "./FeedHashList.module.css";
import useDragScroll from "../../hooks/useDragScroll.js";
import LoadingPage from "../LoadingPage/LoadingPage.js";
import useIntersectionObserver from "../../hooks/useIntersectionObserver.js";
import useBoardStore from "../../stores/BoardStore/useBoardStore.js";
import Feed from "@/component/feed.js";
import { useFeedListByDateQuery } from "@/features/feed/hooks/queries/useFeedListByDateQuery.js";
import { useFeedData } from "@/features/feed/hooks/useFeedData.js";
import FeedList from "@/features/feed/components/FeedList.js";
import FeedItem from "@/features/feed/components/Feed/FeedItem.js";
// import MyPageLoading from "../LoadingPage/MypageLoading.js";

export default function FeedPage() {
  // url 파라미터 가져오기
  const [params] = useSearchParams();

  const brightModeFromUrl = params.get("brightMode");
  const FEED_TYPES = ["today", "weekly", "all", "bias"] as const;
  type FeedType = (typeof FEED_TYPES)[number];

  const rawType = params.get("type");

  const type: FeedType | null = FEED_TYPES.includes(rawType as FeedType)
    ? (rawType as FeedType)
    : null;
  // 전역 상태 관리
  let { biasList, biasId, setBiasId } = useBiasStore();
  const { board } = useBoardStore();

  // 드래그 기능
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();
  let [isFilterClicked, setIsFilterClicked] = useState(false);
  let [isOpendCategory, setIsOpendCategory] = useState(false);

  // let [isLoading, setIsLoading] = useState(true);
  // let [feedDatas, setFeedData] = useState([]);
  let [nextData, setNextData] = useState(0);

  const [isSameTag, setIsSameTag] = useState(true);
  // let [biasId, setBiasId] = useState();

  const initialMode =
    brightModeFromUrl || localStorage.getItem("brightMode") || "bright"; // URL에서 가져오고, 없으면 로컬 스토리지에서 가져옴
  const [mode, setMode] = useState(initialMode);

  // const [hasMore, setHasMore] = useState(true);

  let [filterCategory, setFilterCategory] = useState(
    JSON.parse(localStorage.getItem("board")) || [""],
  );
  let [filterFclass, setFilterFclass] = useState(
    JSON.parse(localStorage.getItem("content")) || "",
  );

  let bids = biasList.map((item) => {
    return item.bid;
  });

  useEffect(() => {
    if (bids.length > 0 && !biasId) {
      setBiasId(bids[0]);
    }
  }, [bids]);

  function onClickApplyButton1() {
    setNextData(-1);
  }

  async function fetchAllFeed() {
    // let updatedNextData = 0;
    //  만약 적용 버튼을 누르면 -1로 세팅
    // if (clickedFetch) {
    //   updatedNextData = -1;
    //   setNextData(-1);
    // }
    // 그게 아닌 상황에서는 기존의 nextData 를 사용
    // else {
    //   updatedNextData = nextData;
    // }
    // const data = await fetchAllFeedList(nextData, filterCategory, filterFclass);
    // setFeedData(data.body.send_data);
    // setNextData(data.body.key);
    // setHasMore(data.body.send_data.length > 0);
    // setIsLoading(false);
  }

  const {
    feedData,
    nextKey,
    isLoading,
    hasMore,
    fetchFeed,
    setFeedData,
    fetchFeedWithTag,
    fetchBiasFeed,
    resetFeed,
  } = useFeedData({ type, filterCategory, filterFclass });

  useEffect(() => {
    if (!type) return;
    resetFeed();

    if (type === "bias") {
      fetchBiasFeed(biasId);
    } else {
      fetchFeed();
    }
  }, [type]);

  // useEffect(() => {
  //   if (isSameTag) {
  //     setHasMore(true);
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [isSameTag]);

  function onClickTag(tag: string) {
    fetchFeedWithTag(tag);
  }

  // const loadMoreCallBack = () => {
  //   if (!isLoading && hasMore) {
  //     if (type === "bias") {
  //       fetchBiasFeed(biasId);
  //     } else {
  //       fetchFeed();
  //     }
  //   }
  // };

  // // 무한 스크롤
  // const targetRef = useIntersectionObserver(
  //   loadMoreCallBack,
  //   { threshold: 0.5 },
  //   hasMore,
  // );

  // 모달 창 - 전체 피드 목록
  function onClickCategory() {
    setIsOpendCategory(!isOpendCategory);
  }

  function onClickFilterButton() {
    setIsFilterClicked(!isFilterClicked);
  }

  // if (isFilterClicked) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }
  function TopSectionByType() {
    if (type === "bias") return;
    if (type === "all") return;
    if (type === "today" || type === "weekly") return;

    return null;
  }

  return (
    <div className={`all-box ${style["all_container"]}`}>
      <div className={`${style["container"]} ${style[getModeClass(mode)]}`}>
        <Header />
        {type === "bias" && (
          <div className={style["bias-section"]}>
            <BiasBoxes
              setBiasId={setBiasId}
              fetchBiasCategoryData={fetchBiasFeed}
            />
            <h4>게시글 미리보기</h4>
            <div
              ref={scrollRef}
              className={style["story_container"]}
              onMouseDown={dragHandlers.onMouseDown}
              onMouseUp={dragHandlers.onMouseUp}
              onMouseMove={dragHandlers.onMouseMove}
            >
              <div className={style["story_wrapper"]}>
                {feedData.map((feed, i) => {
                  return (
                    <StoryFeed
                      key={`story_${feed.feed.fid}`}
                      feedData={feed}
                      hasDragged={hasDragged}
                    />
                  );
                })}
              </div>
            </div>

            <div className={style["category-info"]}>
              <p>게시글 목록</p>
              <p className={style["category_change"]} onClick={onClickCategory}>
                카테고리 변경
              </p>
            </div>

            {/* {biasId && (
              <CategoryModal
                SetIsOpen={setIsOpendCategory}
                onClickCategory={onClickCategory}
                biasId={biasId}
                isOpend={isOpendCategory}
              />
            )} */}
          </div>
        )}
        {type === "all" && (
          <div className={style["search-section"]}>
            <SearchBox />
            <div className={style["search-filter"]}>
              <button onClick={onClickFilterButton}>
                필터
                <span className={style["filter-icon"]}>
                  <img src={filter_icon} alt="filter" />
                </span>
              </button>
            </div>
          </div>
        )}

        {(type === "today" || type === "weekly") && (
          <div className={style["keyword-section"]}>
            <KeywordBox
              type={type}
              title={type === "today" ? "인기 급상승" : "많은 사랑을 받은"}
              subTitle={type === "today" ? "오늘의 키워드" : "이번주 키워드"}
              onClickTagButton={onClickTag}
              fetchData={fetchFeed}
              setIsSameTag={setIsSameTag}
            />
          </div>
        )}

        <div
          className={
            feedData.length > 0
              ? style["scroll-area"]
              : style["none_feed_scroll"]
          }
        >
          <FeedList type={type} feedData={feedData} />
          {/* {isLoading ? (
            <></>
          ) : // <MyPageLoading />
          feedData.length > 0 ? (
            feedData.map((feed, i) => {
              return (
                <FeedItem
                  key={feed.feed.fid}
                  feed={feed.feed}
                  links={feed.feed.links}
                />
                // <Feed
                //   key={`feed_${feed.feed.fid}`}
                //   className={`${style["feed-box"]} ${style[getModeClass(mode)]}`}
                //   feed={feed.feed}
                // ></Feed>
              );
            })
          ) : (
            <NoneFeed />
          )} */}
          {/* <div ref={targetRef} style={{ height: "1px" }}></div> */}
          {/* {isFilterClicked && (
            <FilterModal
              onClickFilterButton={onClickFilterButton}
              setFilterCategory={setFilterCategory}
              setFilterFclass={setFilterFclass}
              fetchAllFeed={fetchAllFeed}
              onClickApplyButton1={onClickApplyButton1}
            />
          )} */}
        </div>
      </div>
      {/* <NavBar /> */}
    </div>
  );
}
