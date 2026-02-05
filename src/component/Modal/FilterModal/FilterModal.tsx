import {
  useFilterStore,
  type FclassType,
} from "@/stores/FilterStore/useFilterStore";
import "./FilterModal.css";
import { useState } from "react";
import FilterSection from "./FilterSection";

const CATEGORY_FILTERS = [
  {
    id: 0,
    value: "유머게시판",
    name: "유머게시판",
  },
  {
    id: 1,
    value: "자유게시판",
    name: "자유게시판",
  },
  {
    id: 2,
    value: "팬아트",
    name: "팬아트",
  },
  {
    id: 3,
    value: "스토리게시판",
    name: "스토리게시판",
  },
  {
    id: 4,
    value: "",
    name: "전체",
  },
];

const FCLASS_FILTERS: { id: number; value: FclassType; name: string }[] = [
  { id: 0, value: "short", name: "모멘트" },
  { id: 1, value: "long", name: "포스트" },
  { id: 2, value: "", name: "전체" },
];

interface FilterModalProps {
  onClose: () => void;
}
export default function FilterModal({ onClose }: FilterModalProps) {
  const { fclass, category, setFclass, setCategory } = useFilterStore();
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftFclass, setDraftFclass] = useState(fclass);

  function handleFilterCategory(value: string) {
    setDraftCategory(value);
  }

  function handleFilterContent(value: FclassType) {
    setDraftFclass(value);
  }

  function handleApply() {
    setCategory(draftCategory);
    setFclass(draftFclass);
    onClose();
  }

  return (
    <div className="wrapper-container" onClick={onClose}>
      <div
        className="FilterModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="FilterModal_title">
          <h3>딱 맞는 피드를 추천해드려요!</h3>
          <p>보고 싶은 게시글만 보여질 수 있도록, 지금 바로 경험해보세요.</p>
        </div>

        <FilterSection
          title={"게시글 종류"}
          options={CATEGORY_FILTERS}
          onClickOption={handleFilterCategory}
          value={draftCategory}
        />

        <FilterSection
          title={"컨텐츠 종류"}
          options={FCLASS_FILTERS}
          onClickOption={handleFilterContent}
          value={draftFclass}
        />

        <div className="FilterModal_buttons">
          <button className="close_button" onClick={onClose}>
            닫기
          </button>
          <button className="apply_button" onClick={handleApply}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
