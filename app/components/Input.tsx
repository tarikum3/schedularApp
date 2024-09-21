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
      onChange(e);
    }
    return null;
  };

  const defaultClasses = `${className} bg-primary-100 py-2 px-6 w-full appearance-none rounded-xl
  pr-10 border border-primary-500 text-primary-500 focus:outline-none shadow-outline-normal`;
  const checkboxClass = "mr-2 h-4 w-4";
  const classFull = `${
    props.type == "checkbox" ? checkboxClass : defaultClasses
  }`;

  // type="checkbox"

  return (
    <label>
      <input
        className={`${classFull}`}
        onChange={(e) => handleOnChange(e)}
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
