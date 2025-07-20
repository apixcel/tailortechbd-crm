import Skeleton from "./Skeleton";

const TableSkeleton = ({ row, columns }: { row?: number; columns?: number }) => {
  return (
    <>
      {[...Array(row || 5)].map((_, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {Array.from({ length: columns || 6 }).map((_, indx) => (
            <td key={indx} className="px-6 py-3">
              <Skeleton className="h-4 w-16" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
