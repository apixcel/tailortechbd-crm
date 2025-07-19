import { api } from "@/redux/api/api";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrderCount: builder.query<{ data: { pendingOrderCount: number } }, undefined>({
      query: () => ({
        url: "/order/pending-count",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});
export const { useGetPendingOrderCountQuery } = orderApi;
