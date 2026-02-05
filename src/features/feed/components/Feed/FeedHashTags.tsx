import style from "@/pages/FeedPage/FeedPage.module.css";

export default function FeedHashTags({ hashtags }: { hashtags: string[] }) {
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
