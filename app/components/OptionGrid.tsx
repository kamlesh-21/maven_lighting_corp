// app/components/OptionGrid.tsx
"use client";

type Option = {
  value: string;
  label: string;
};

type OptionGridProps = {
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
};

export default function OptionGrid({
  options,
  selected,
  onToggle,
}: OptionGridProps) {
  return (
    <div className="option-grid">
      {options.map((option) => {
        const active = selected.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            className={`option ${active ? "selected" : ""}`}
            onClick={() => onToggle(option.value)}
            aria-pressed={active}
          >
            <span className="option-title">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}