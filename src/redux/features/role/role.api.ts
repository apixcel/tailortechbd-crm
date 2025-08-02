import { api } from "@/redux/api/api";
import { IMeta, IRole, IRoleAction, IUser } from "@/types";
import { generateQueryParams } from "@/utils";

const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSuperAdmin: builder.mutation<
      { data: string[] },
      Pick<IUser, "email" | "password" | "phoneNumber" | "fullName">
    >({
      query: (body) => ({
        url: `/super-admin/create-super-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["role"],
    }),
    getAllAdmins: builder.query<{ data: IUser[]; meta: IMeta }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/role/get-all/admin?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["role"],
    }),
    toggleSuperAdminAccountActivation: builder.mutation<{ data: IUser[] }, string>({
      query: (userId) => {
        return {
          url: `/super-admin/toggle-activation/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["role"],
    }),
    loginSuperAdmin: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      { email?: string; phoneNumber?: string; mode?: "email" | "phoneNumber"; password: string }
    >({
      query: (post) => ({
        url: "/super-admin/login-super-admin",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    deleteSuperAdminById: builder.mutation<{ data: IUser }, string>({
      query: (userId) => ({
        url: `/super-admin/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["role"],
    }),

    getAllRoles: builder.query<
      { data: (IRole & { authCount: number })[] },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/role/get-all?${queryString}`,
          method: "GET",
        };
      },
    }),

    getRoleDetailsByRoleId: builder.query<{ data: IRole }, string>({
      query: (roleId) => ({
        url: `/role/get/${roleId}`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),
    getAllRoleActions: builder.query<{ data: IRoleAction[] }, undefined>({
      query: () => ({
        url: `/role/get-all/actions`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),

    updateRoleActionsByRoleId: builder.mutation<
      { data: IRole },
      { roleId: string; payload: Pick<IRole, "actions"> }
    >({
      query: ({ roleId, payload }) => ({
        url: `/role/update/${roleId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const {
  useCreateSuperAdminMutation,
  useGetAllAdminsQuery,
  useToggleSuperAdminAccountActivationMutation,
  useLoginSuperAdminMutation,
  useDeleteSuperAdminByIdMutation,
  useGetAllRolesQuery,
  useGetAllRoleActionsQuery,
  useGetRoleDetailsByRoleIdQuery,
  useUpdateRoleActionsByRoleIdMutation,
} = superAdminApi;
