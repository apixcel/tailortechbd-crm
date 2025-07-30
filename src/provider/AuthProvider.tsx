import { useAppDispatch, useAppSelector } from "@/hooks";
// import { useGetAuthorQuery } from "@/redux/features/user/user.api";
import { logout, setLoading, setUser } from "@/redux/features/user/user.slice";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  // const { data, isSuccess, isError, isFetching } = useGetAuthorQuery(undefined, {
  //   skip: !token,
  // });

  /* useEffect(() => {
    dispatch(setLoading(isFetching));

    if (isSuccess) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    }

    if (isError) {
      dispatch(setLoading(false));
      dispatch(logout(undefined));
      dispatch(setUser(null));
    }
  }, [isSuccess, isError, isFetching, dispatch, data]); */

  return <>{children}</>;
};

export default AuthProvider;
