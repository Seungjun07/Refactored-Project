import { useEffect } from "react";

import all_post from "@/img/all_post.png";
import best from "@/img/best.png";
import new_pin from "@/img/new_pin.png";

// import useTagStore from "../../stores/TagStore/useTagStore.js";
import LoadingPage from "../LoadingPage/LoadingPage.js";
import "@/App.css";
import Header from "@/component/Header/Header.tsx";
import SearchBox from "@/component/SearchBox.tsx";
import Banner from "@/component/Banner/Banner.tsx";
import BiasBoxes from "@/component/BiasBoxes/BiasBoxes.tsx";
import FeedThumbnail from "@/component/feed-list/FeedThumbnail.tsx";
import AllPost from "@/component/AllPost/AllPost.tsx";
import NavBar from "@/component/NavBar/NavBar.tsx";
import useBiasStore from "@/stores/BiasStore/useBiasStore.ts";
import useFetchFeedData from "../../features/feed/hooks/useFetchFeedData.ts";
import { useFetchFeedWithBias } from "@/features/feed/hooks/useFetchFeedWithBias.ts";

// export function getModeClass(mode) {
//   return mode === "dark" ? "dark-mode" : "bright-mode";
// }

export default function HomePage() {
  let { data: todayBestFeed } = useFetchFeedData(`/home/today_best`);
  let { data: weeklyFeed } = useFetchFeedData(`/home/weekly_best`);
  let { data: allFeed } = useFetchFeedData(`/home/all_feed`);

  let { biasId, biasList, setBiasId } = useBiasStore();

  let bids = biasList.map((item, i) => {
    return item.bid;
  });
  // useEffect(() => {
  //   if (bids.length > 0 && !biasId) {
  //     setBiasId(bids[0]);
  //   }
  // }, [bids]);

  const { feedData, isLoading, fetchBiasCategoryData } = useFetchFeedWithBias();

  useEffect(() => {
    fetchBiasCategoryData();
  }, [biasId]);

  // const [brightMode, setBrightMode] = useState(() => {
  //   return localStorage.getItem("brightMode") || "bright"; // 기본값은 'bright'
  // });
  // useEffect(() => {
  //   document.body.className =
  //     brightMode === "dark" ? "dark-mode" : "bright-mode";
  // }, [brightMode]);

  // const handleModeChange = (newMode) => {
  //   setBrightMode(newMode); // MoreSee에서 전달받은 상태 업데이트
  // };

  // if (isLoading) {
  //   return <LoadingPage />;
  // }
  return (
    <div className={`container`}>
      <div className={`top-area`}>
        {/* <DisplayAds /> */}

        <Header />
        <SearchBox />
        <h4 className="main-title">내 최애가 가장 빛날 수 있는 공간</h4>
        <Banner />

        <FeedThumbnail
          title={
            <>
              최애<span className="title-color">주제</span>
            </>
          }
          img_src={new_pin}
          feedData={feedData}
          type={"bias"}
          endPoint={`/feed_list?type=bias`}
          customClassName="custom-height"
        >
          <BiasBoxes
            setBiasId={setBiasId}
            // fetchBiasCategoryData={fetchBiasCategoryData}
          />
        </FeedThumbnail>
      </div>

      <section className="contents">
        <FeedThumbnail
          title={
            <>
              오늘의 베스트 <span className="title-color">게시글</span>
            </>
          }
          img_src={best}
          feedData={todayBestFeed}
          endPoint={`/feed_list?type=today`}
        />
        <FeedThumbnail
          title={
            <>
              주간 <span className="title-color">TOP 100</span>
            </>
          }
          img_src={best}
          feedData={weeklyFeed}
          endPoint={`/feed_list?type=weekly`}
        />

        <FeedThumbnail
          title={"모든 게시글"}
          img_src={all_post}
          feedData={allFeed}
          allPost={<AllPost allFeed={allFeed} />}
          endPoint={"/feed_list?type=all"}
        />
      </section>
      <NavBar></NavBar>
    </div>
  );
}
