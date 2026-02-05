import style from "@/pages/FeedDetail/FeedDetail.module.css";

interface OptionModalProps {
  onClick: () => void;
  onDelete: () => void;
}
export default function OptionModal({ onClick, onDelete }: OptionModalProps) {
  return (
    <div className={style["OptionModal"]} onClick={onClick}>
      <div className={style["modal_container"]}>
        <div className={style["modal_title"]}>설정</div>
        {/* <div className={style["modal_content"]}>수정</div> */}
        <div
          className={`${style["modal_content"]} ${style["modal_content_accent"]}`}
          onClick={onDelete}
        >
          삭제
        </div>
      </div>
    </div>
  );
}
