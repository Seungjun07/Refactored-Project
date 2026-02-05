import "./FilterModal.css";

type Option<T> = {
  id: number;
  name: string;
  value: T;
};

interface FilterSectionProps<T> {
  title: string;
  value: T;
  options: Option<T>[];
  onClickOption: (value: T) => void;
}
export default function FilterSection<T>({
  title,
  options,
  value,
  onClickOption,
}: FilterSectionProps<T>) {
  return (
    <section className="FilterModal_kind">
      <h5>{title}</h5>
      <div className="button_container">
        {options.map((option, i) => {
          return (
            <button
              className={`${value === option.value ? "clicked_button" : ""}`}
              key={option.id}
              onClick={() => onClickOption(option.value)}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
