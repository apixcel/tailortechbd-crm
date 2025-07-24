import { forwardRef, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        "min-h-[100px] w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none",
        className
      )}
      {...props}
    />
  );
});
TextArea.displayName = "TextArea";
export default TextArea;
