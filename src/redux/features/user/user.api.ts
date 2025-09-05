import { api } from "@/redux/api/api";
import { IMeta, IUser } from "@/types";
import { generateQueryParams } from "@/utils";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      { email?: string; phoneNumber?: string; password: string; mode?: "email" | "phoneNumber" }
    >({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    createAdmin: builder.mutation<
      { data: string[] },
      Pick<IUser, "email" | "password" | "phoneNumber" | "fullName"> & { role: string }
    >({
      query: (body) => ({
        url: `/auth/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    logoutUser: builder.mutation<{ data: null }, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    updateProfile: builder.mutation<{ data: IUser }, Partial<IUser>>({
      query: (payload) => {
        return {
          url: `/auth/update-profile`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),

    getAuthor: builder.query<{ data: IUser }, undefined>({
      query: () => {
        return {
          url: `/auth/author`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getAllAdmins: builder.query<{ data: IUser[]; meta: IMeta }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/auth/get/admins?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetAuthorQuery,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = userApi;
