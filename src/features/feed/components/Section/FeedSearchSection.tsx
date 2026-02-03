import SearchBox from "@/component/SearchBox";
import style from "@/pages/FeedPage/FeedHashList.module.css";
import filter_icon from "@/img/filter.svg";

export default function FeedSearchSection({
  onFilterClick,
}: {
  onFilterClick: () => void;
}) {
  return (
    <div className={style["search-section"]}>
      <SearchBox />
      <div className={style["search-filter"]}>
        <button onClick={onFilterClick}>
          필터
          <span className={style["filter-icon"]}>
            <img src={filter_icon} alt="filter" />
          </span>
        </button>
      </div>
    </div>
  );
}
