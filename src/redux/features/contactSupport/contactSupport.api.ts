import { api } from "@/redux/api/api";

const contactSupportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUnReadContactMessageCount: builder.query<
      { data: { unreadContactMessageCount: number } },
      undefined
    >({
      query: () => ({
        url: "/contact-support/unread-count",
        method: "GET",
      }),
      providesTags: ["contactSupport"],
    }),
  }),
});
export const { useGetUnReadContactMessageCountQuery } = contactSupportApi;
