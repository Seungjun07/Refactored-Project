import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useBiasStore from "../../stores/BiasStore/useBiasStore.js";

import { getModeClass } from "../../App.js";
// import FilterModal from "../../component/FilterModal/FilterModal.js";
// import CategoryModal from "../../component/CategoryModal/CategoryModal.js";
import NoneFeed from "../../component/NoneFeed/NoneFeed.js";
import Header from "../../component/Header/Header.js";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import style from "./FeedHashList.module.css";
import LoadingPage from "../LoadingPage/LoadingPage.js";
import { useFeedData } from "@/features/feed/hooks/useFeedData.js";
import FeedList from "@/features/feed/components/FeedList.js";
import FeedSearchSection from "@/features/feed/components/Section/FeedSearchSection.js";
import KeywordFeedSection from "@/features/feed/components/Section/KeywordFeedSection.js";
import BiasFeedSection from "@/features/feed/components/Section/BiasFeedSection.js";
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
  let { selectedBias } = useBiasStore();

  // 드래그 기능
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

  // let bids = biasList.map((item) => {
  //   return item.bid;
  // });

  // useEffect(() => {
  //   if (bids.length > 0 && !biasId) {
  //     setBiasId(bids[0]);
  //   }
  // }, [bids]);

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
      fetchBiasFeed(selectedBias?.bid ?? "");
    } else {
      fetchFeed();
    }
  }, [type, selectedBias]);

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

  return (
    <div className={`all-box ${style["all_container"]}`}>
      <div className={`${style["container"]} ${style[getModeClass(mode)]}`}>
        <Header />
        {type === "bias" && (
          <BiasFeedSection
            feedData={feedData}
            onClickCategory={onClickCategory}
          />

          //   {biasId && (
          //     <CategoryModal
          //       SetIsOpen={setIsOpendCategory}
          //       onClickCategory={onClickCategory}
          //       biasId={biasId}
          //       isOpend={isOpendCategory}
          //     />
          //   )}
          // </div>
        )}
        {type === "all" && (
          <FeedSearchSection onFilterClick={onClickFilterButton} />
        )}

        {(type === "today" || type === "weekly") && (
          <KeywordFeedSection
            type={type}
            onClickTag={onClickTag}
            fetchFeed={fetchFeed}
            setIsSameTag={setIsSameTag}
          />
        )}

        <div
          className={
            feedData.length > 0
              ? style["scroll-area"]
              : style["none_feed_scroll"]
          }
        >
          {feedData.length > 0 ? (
            <FeedList type={type} feedData={feedData} />
          ) : (
            <NoneFeed />
          )}

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
