import tempBias from "@/img/tempBias.png";

export default function EmptyBiasBox() {
  return (
    <div className="bias-info">
      <div className={`bias-box`}>
        <img src={tempBias} alt="empty bias" />
      </div>
      <div className="b-name">{<span>&nbsp;</span>}</div>
    </div>
  );
}
