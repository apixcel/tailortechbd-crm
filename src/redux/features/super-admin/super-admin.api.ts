import { api } from "@/redux/api/api";
import { IMeta, IUser } from "@/types";
import { generateQueryParams } from "@/utils";

const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSuperAdmin: builder.mutation<
      { data: string[] },
      Pick<IUser, "email" | "password" | "phoneNumber" | "fullName" | "geo_profile">
    >({
      query: (body) => ({
        url: `/super-admin/create-super-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["super-admin"],
    }),
    getAllSuperAdmins: builder.query<
      { data: IUser[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/super-admin/get-clients?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["super-admin"],
    }),
    toggleSuperAdminAccountActivation: builder.mutation<{ data: IUser[] }, string>({
      query: (userId) => {
        return {
          url: `/super-admin/toggle-activation/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["super-admin"],
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
      invalidatesTags: ["super-admin"],
    }),
  }),
});

export const {
  useCreateSuperAdminMutation,
  useGetAllSuperAdminsQuery,
  useToggleSuperAdminAccountActivationMutation,
  useLoginSuperAdminMutation,
  useDeleteSuperAdminByIdMutation,
} = superAdminApi;
