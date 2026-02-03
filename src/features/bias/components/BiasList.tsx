import type { Bias } from "../types/bias";
import AddBiasButton from "./AddBiasButton";
import BiasItem from "./BiasItem";
import EmptyBiasBox from "./EmptyBiasBox";

interface BiasListProps {
  biasList: Bias[];
  selectedBias: Bias | null;
  onBiasSelect: (bias: Bias) => void;
  onAddClick: () => void;
}

export default function BiasList({
  biasList,
  selectedBias,
  onBiasSelect,
  onAddClick,
}: BiasListProps) {
  return (
    <div className="bias-wrapper">
      {biasList.length === 0 && <EmptyBiasBox />}
      {biasList.map((bias) => {
        const isSelected = selectedBias?.bid === bias.bid;

        return (
          <BiasItem
            key={bias.bid}
            bias={bias}
            isSelected={isSelected}
            onClick={onBiasSelect}
          />
        );
      })}

      <AddBiasButton onClick={onAddClick} />
    </div>
  );
}
