import all_post from "@/img/all_post.png";
import best from "@/img/best.png";
import new_pin from "@/img/new_pin.png";

// import useTagStore from "../../stores/TagStore/useTagStore.js";
// import LoadingPage from "../LoadingPage/LoadingPage.js";
import "@/App.css";
import Header from "@/component/Header/Header.tsx";
import SearchBox from "@/component/SearchBox.tsx";
import Banner from "@/component/Banner/Banner.tsx";
import BiasBoxes from "@/features/bias/components/BiasBoxes";
import AllPost from "@/component/AllPost/AllPost.tsx";
// import NavBar from "@/component/NavBar/NavBar.tsx";
import { useHomeFeed } from "@/features/feed/hooks/useHomeFeed.ts";
import FeedThumbnail from "@/features/feed/components/Thumbnail/FeedThumbnail";

export default function HomePage() {
  const { biasFeeds, todayBestFeed, weeklyBestFeed, allFeed } = useHomeFeed();
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
          feedData={biasFeeds}
          type={"bias"}
          endPoint={`/feed?type=bias`}
          customClassName="custom-height"
        >
          <BiasBoxes />
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
          endPoint={`/feed?type=today`}
        />
        <FeedThumbnail
          title={
            <>
              주간 <span className="title-color">TOP 100</span>
            </>
          }
          img_src={best}
          feedData={weeklyBestFeed}
          endPoint={`/feed?type=weekly`}
        />

        <FeedThumbnail
          title={"모든 게시글"}
          img_src={all_post}
          feedData={allFeed}
          endPoint={"/feed?type=all"}
          replaceContent
        >
          <AllPost feedData={allFeed} />
        </FeedThumbnail>
      </section>
      {/* <NavBar /> */}
    </div>
  );
}
