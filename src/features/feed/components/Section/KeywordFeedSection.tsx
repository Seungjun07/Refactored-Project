import KeywordBox from "@/component/keyword/KeywordBox";
import style from "@/pages/FeedPage/FeedHashList.module.css";

interface KeywordFeedSectionProps {
  type: "today" | "weekly";
  onClickTag: (tag: string) => void;
  setIsSameTag: (value: boolean) => void;
}

export default function KeywordFeedSection({
  type,
  onClickTag,
  setIsSameTag,
}: KeywordFeedSectionProps) {
  if (!type) return null;

  const title = type === "today" ? "인기 급상승" : "많은 사랑을 받은";
  const subTitle = type === "today" ? "오늘의 키워드" : "이번주 키워드";

  return (
    <div className={style["keyword-section"]}>
      <KeywordBox
        type={type}
        title={title}
        subTitle={subTitle}
        onClickTag={onClickTag}
        setIsSameTag={setIsSameTag}
      />
    </div>
  );
}
