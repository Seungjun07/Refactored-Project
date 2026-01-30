import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import FeedPage from "./pages/FeedPage/FeedPage";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />}></Route>
      <Route path="/feed/:fid" element={<FeedPage />}></Route>

      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
