import { BiError } from "react-icons/bi";

const TableDataNotFound = ({ span, message }: { span?: number; message: string }) => {
  return (
    <tr>
      <td colSpan={span || 3} className="h-32 text-center">
        <div
          className="flex flex-col items-center justify-center space-y-3"
          role="status"
          aria-live="polite"
        >
          {/* <SearchX
            className="h-12 w-12 text-muted-foreground"
            aria-hidden="true"
          /> */}
          <BiError className="mt-8 mb-3 h-10 w-10 text-primary" aria-hidden="true" />
          <div className="text-lg font-medium text-primary">
            No Data Found
            <p className="mt-1 text-sm text-gray-400 capitalize">{message}</p>
          </div>
          <div className="text-muted-foreground max-w-sm text-sm"></div>
        </div>
      </td>
    </tr>
  );
};

export default TableDataNotFound;
