import React from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

const Button = ({
  className,
  children,
  disabled,
  isLoading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={twMerge(
        "flex cursor-pointer items-center justify-center gap-[10px] rounded-[5px] bg-primary px-[20px] py-[6px] text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-primary/70",
        className
      )}
    >
      {children} {isLoading && <CgSpinner className="animate-spin" />}
    </button>
  );
};

export default Button;
