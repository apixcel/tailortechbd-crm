import { api } from "@/redux/api/api";
import { IUser } from "@/types";

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

    logoutUser: builder.mutation<{ data: null }, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    // getMyRole

    // getAuthor: builder.query<{ data: IUser }, undefined>({
    //     query: () => {
    //       return {
    //         url: `/auth/author`,
    //         method: "GET",
    //       };
    //     },
    //     providesTags: ["user"],
    //   }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation /* useGetAuthorQuery */ } = userApi;
