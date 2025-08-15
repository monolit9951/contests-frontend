import { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
}

const ControlledSelector: FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <div className="border rounded-md w-48">
      {options.map((option) => (
        <div
          key={option.value}
          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
            option.value === value ? "bg-gray-200 font-semibold" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ControlledSelector;
