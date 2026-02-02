import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import FeedPage from "./pages/FeedPage/FeedPage";
import FeedDetailPage from "./pages/FeedDetail/FeedDetailPage";

export default function RootRoute() {
  return (
    <Routes>
      {/* 피드 페이지 */}
      <Route path="/feed" element={<FeedPage />}></Route>
      <Route path="/feed/:fid" element={<FeedDetailPage />}></Route>

      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
