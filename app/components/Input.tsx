"use client";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
}

const Input: React.FC<InputProps> = (props) => {
  const { className, children, onChange, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input
        className={`${className} bg-primary py-2 px-6 w-full appearance-none rounded-xl
         pr-10 border border-primary-3 text-secondary-3 focus:outline-none shadow-outline-normal`}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
};

export default Input;
