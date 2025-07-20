import React, { ReactNode, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface PropsType {
  children: ReactNode;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const DialogProvider: React.FC<PropsType> = ({ children, state, setState, className }) => {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [state]);

  if (!state) return null;

  return createPortal(
    <div className="center fixed top-0 left-0 z-[999] h-full w-full overflow-y-auto">
      <div
        className="absolute top-0 left-0 z-[99] h-full w-full bg-black/40"
        onClick={() => setState(false)}
      ></div>
      <div className={twMerge("relative z-[9999] max-h-[90dvh] w-fit overflow-y-auto", className)}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default DialogProvider;
