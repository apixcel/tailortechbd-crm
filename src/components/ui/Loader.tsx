import { ImSpinner11 } from "react-icons/im";
import { twMerge } from "tailwind-merge";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex h-[90dvh] w-full items-center justify-center", className)}>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-[10px] bg-white">
        <ImSpinner11 className="animate-spin text-[40px]" />
        <span className="text-[16px] font-[700] text-primary">Loading Content...</span>
      </div>
    </div>
  );
};

export default Loader;
