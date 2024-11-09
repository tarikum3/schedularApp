import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  return (
    <button
      aria-pressed={active}
      className={` inline-flex items-center justify-center min-h-[44px] max-h-[64px] text-primary-100 p-3 text-xs rounded-xl
      ${className} ${
        disabled || loading
          ? "bg-primary-400 cursor-not-allowed"
          : "bg-primary-900 "
      } `}
      disabled={disabled}
      {...rest}
    >
      {" "}
      {!loading && children}
      {loading && <i className="pl-2 m-0 flex">Loading...</i>}
    </button>
  );
});

export default Button;
