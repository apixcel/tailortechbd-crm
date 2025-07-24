"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  headerButtons: {
    title: string;
    onClick?: (button: { title: string }) => void;
  }[];
  children: React.ReactNode;
  className?: string;
}
const FormCard: React.FC<IProps> = ({ headerButtons, children, className }) => {
  const [selectedHeaderIndex, setSelectedHeaderIndex] = useState(0);

  return (
    <div
      className={twMerge(
        "mx-auto w-full max-w-[670px] border-[1px] border-border-main bg-white",
        className
      )}
    >
      <div className="flex w-full items-center justify-start gap-[0px]">
        {headerButtons.map((button, index) => (
          <button
            key={index + "form header"}
            onClick={() => {
              setSelectedHeaderIndex(index);
              button.onClick?.({ title: button.title });
            }}
            className={`center w-full cursor-pointer border-[1px] border-border-main px-[20px] py-[5px] text-[14px] font-[700] sm:text-[16px] ${index === selectedHeaderIndex ? "bg-primary text-white" : "bg-white text-primary"}`}
          >
            {button.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-[16px] p-[16px]">{children}</div>
    </div>
  );
};

export default FormCard;
