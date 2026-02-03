import add_bias_icon from "@/img/add_bias.png";

export default function AddBiasButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="bias-info">
      <button className="add-bias-box" onClick={onClick}>
        <img src={add_bias_icon} alt="add-bias" />
      </button>
      <div className="b-name">주제 추가하기</div>
    </div>
  );
}
