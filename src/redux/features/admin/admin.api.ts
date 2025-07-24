import { api } from "@/redux/api/api";
import { IMeta, IUser } from "@/types";
import { generateQueryParams } from "@/utils";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation<
      { data: string[] },
      Pick<IUser, "email" | "password" | "phoneNumber" | "fullName" | "geo_profile">
    >({
      query: (body) => ({
        url: `/admin/create-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllAdmins: builder.query<{ data: IUser[]; meta: IMeta }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/admin/get-clients?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    toggleAdminAccountActivation: builder.mutation<{ data: IUser[] }, string>({
      query: (userId) => {
        return {
          url: `/admin/toggle-activation/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["admin"],
    }),
    loginAdmin: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      { email?: string; phoneNumber?: string; mode?: "email" | "phoneNumber"; password: string }
    >({
      query: (post) => ({
        url: "/admin/login-admin",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    deleteAdminById: builder.mutation<{ data: IUser }, string>({
      query: (userId) => ({
        url: `/admin/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useToggleAdminAccountActivationMutation,
  useLoginAdminMutation,
  useDeleteAdminByIdMutation,
} = adminApi;
