import type { SyntheticEvent } from "react";
import type { Bias } from "../types/bias";
import tempBias from "@/img/tempBias.png";

interface BiasItemProps {
  bias: Bias;
  isSelected: boolean;
  onClick: (bias: Bias) => void;
}
export default function BiasItem({ bias, isSelected, onClick }: BiasItemProps) {
  function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = tempBias;
  }
  return (
    <div className="bias-info">
      <div className={`bias-box`}>
        {bias && (
          <img
            className={isSelected ? "clicked-img" : ""}
            // src={BIAS_URL + `${bias.bid}.PNG`}
            src={bias.img}
            onError={handleImageError}
            alt={bias.bname || "bias"}
            onClick={() => {
              onClick(bias);
            }}
          />
        )}
      </div>
      <div className="b-name">{bias.bname || <span>&nbsp;</span>}</div>
      {isSelected && <div className="clicked"></div>}
    </div>
  );
}
