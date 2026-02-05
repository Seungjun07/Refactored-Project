import SearchBox from "@/component/SearchBox";
import style from "@/pages/FeedPage/FeedHashList.module.css";
import filter_icon from "@/img/filter.svg";
import FilterModal from "@/component/Modal/FilterModal/FilterModal";
import { useModalStore } from "@/stores/modalStore";

export default function FeedSearchSection() {
  const { open, close, activeModal } = useModalStore();

  function handleFilterClick() {
    open("FILTER");
  }

  const isOpen = activeModal !== null;

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className={style["search-section"]}>
      <SearchBox />
      <div className={style["search-filter"]}>
        <button onClick={handleFilterClick}>
          필터
          <span className={style["filter-icon"]}>
            <img src={filter_icon} alt="filter" />
          </span>
        </button>
      </div>

      {activeModal === "FILTER" && <FilterModal onClose={close} />}
    </div>
  );
}
