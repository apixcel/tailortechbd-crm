

const PendingOrderCount = () => {
  const { isLoading, data } = useGetPendingOrderCountQuery(undefined);

  return (
    <>
      {isLoading || !data?.data?.pendingOrderCount ? (
        ""
      ) : (
        <span className="center absolute top-[-5px] left-[0px] flex h-[20px] w-[20px] rounded-full bg-danger/90 text-[10px] text-white">
          {data.data.pendingOrderCount > 9 ? "9+" : data.data.pendingOrderCount}
        </span>
      )}
    </>
  );
};
const PendingQuestionCount = () => {
  const { isLoading, data } = useGetPendingQuestionCountQuery(undefined);
  return (
    <>
      {isLoading || !data?.data?.pendingQuestionCount ? (
        ""
      ) : (
        <span className="center absolute top-[-5px] left-[0px] flex h-[20px] w-[20px] rounded-full bg-danger/90 text-[10px] text-white">
          {data.data.pendingQuestionCount > 9 ? "9+" : data.data.pendingQuestionCount}
        </span>
      )}
    </>
  );
};
const UnReadContactMessageCount = () => {
  const { isLoading, data } = useGetUnReadContactMessageCountQuery(undefined);

  return (
    <>
      {isLoading || !data?.data?.unreadContactMessageCount ? (
        ""
      ) : (
        <span className="center absolute top-[-5px] left-[0px] flex h-[20px] w-[20px] rounded-full bg-danger/90 text-[10px] text-white">
          {data.data.unreadContactMessageCount > 9 ? "9+" : data.data.unreadContactMessageCount}
        </span>
      )}
    </>
  );
};

const SidebarElement = {
  PendingOrderCount,
  PendingQuestionCount,
  UnReadContactMessageCount,
};

export default SidebarElement;
