"use client";
import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  onSelect?: (value: string) => void;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  name,
  onSelect,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    // options?.length > 0 ? options[0].value : ""
    defaultValue ?? ""
  );
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    const selectedValue = event.target.value;
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={`select-${label}`}
          className="block text-sm font-medium text-primary-900 "
        >
          {label}
        </label>
      </div>
      <select
        id={`select-${label}`}
        className="block w-full rounded-lg border border-primary-500 text-primary-900 bg-primary-100 p-2.5 text-sm  focus:outline-none shadow-outline-normal  "
        onChange={handleChange}
        name={name}
        value={selectedValue}
      >
        <option value="" selected={selectedValue == ""} disabled></option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={selectedValue == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
