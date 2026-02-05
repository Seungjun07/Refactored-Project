import { Link } from "react-router-dom";

export default function LegacyBlockedPage({ path }: { path: string }) {
  return (
    <div className="mx-auto flex h-100 w-250 flex-col items-center justify-center gap-10 bg-yellow-100 text-4xl">
      <h2>{path} 페이지는 현재 리팩토링 대상 외 페이지입니다.</h2>
      <p>핵심 기능 중심으로 구조 개선이 진행되었습니다.</p>

      <Link to="/" className="text-blue-700">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
