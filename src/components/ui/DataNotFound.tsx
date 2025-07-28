import { twMerge } from "tailwind-merge";

const DataNotFound = ({ className, title }: { title?: string; className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex h-[100dvh] flex-col items-center justify-center gap-[8px]",
        className
      )}
    >
      <h4 className="text-[25px] font-[700]">{title || "Data Not Found"}</h4>
      <p className="text-[16px] text-muted">Couldn&lsquo;t find any data for this page</p>
    </div>
  );
};

export default DataNotFound;
