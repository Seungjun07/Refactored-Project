import LegacyBlockedPage from "@/pages/LegacyBlockedPage";
import { Route } from "react-router-dom";

const feedPaths = ["/write_feed", "/write_feed/:type", "/follow_page"];
const authPaths = ["/novalogin", "/find_pw", "/find_pw_change", "/signup"];
const fundingPaths = [
  "/like_funding",
  "/duck_funding",
  "/funding_project/:type",
  "/funding_ranking",
  "/open_ranking",
  "/bias_funding",
  "/bias_funding/:type",
];
const otherPaths = [
  "/terms_page",
  "/notice",
  "/report",
  "/notice/:nid",
  "/search",
  "/search_result",
  "/more_see",
  "/mypage",
  "/mypage_edit",
];

const allPaths = [...feedPaths, ...authPaths, ...fundingPaths, ...otherPaths];
export default function LegacyRoutes() {
  return (
    <>
      {allPaths.map((path) => (
        <Route
          key={path}
          path={path}
          element={<LegacyBlockedPage path={path} />}
        />
      ))}

      {/* 테스트 페이지 및 에러 페이지 */}
      <Route path="*" element={<div>404 Error</div>}></Route>
    </>
  );
}
