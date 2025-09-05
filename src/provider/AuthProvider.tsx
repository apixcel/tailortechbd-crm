import { Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetMyRoleQuery } from "@/redux/features/role/role.api";
import { useGetAuthorQuery } from "@/redux/features/user/user.api";
import { logout, setLoading, setRole, setUser } from "@/redux/features/user/user.slice";
import { useEffect } from "react";
// import { useGetAuthorQuery } from "@/redux/features/user/user.api";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  const { data, isSuccess, isError, isFetching } = useGetAuthorQuery(undefined, {
    skip: !token,
  });

  const { data: roleData, isFetching: isRoleFetching } = useGetMyRoleQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
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

    if (roleData) {
      dispatch(setRole(roleData.data));
    }
  }, [isSuccess, isError, isFetching, dispatch, data, roleData]);

  if (isFetching || isRoleFetching) {
    return <Loader className="h-[100dvh]" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
