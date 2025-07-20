import { twMerge } from "tailwind-merge";

const HorizontalLine = ({ className }: { className?: string }) => {
  return <span className={twMerge("flex h-[1px] w-full bg-border-muted", className)} />;
};

export default HorizontalLine;
