"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPass ? "text" : type;

    const inputElement = (
      <input
        ref={ref}
        type={inputType}
        className={twMerge(
          "w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none",
          className
        )}
        {...props}
      />
    );

    return isPassword ? (
      <div className="relative">
        {inputElement}
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute top-[50%] right-3 bottom-2.5 h-fit -translate-y-1/2 cursor-pointer"
          tabIndex={-1}
        >
          {showPass ? <IoMdEyeOff /> : <MdRemoveRedEye />}
        </button>
      </div>
    ) : (
      inputElement
    );
  }
);

Input.displayName = "Input";

export default Input;
