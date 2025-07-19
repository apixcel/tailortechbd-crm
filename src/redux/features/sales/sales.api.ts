import { api } from "@/redux/api/api";

const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalSalesQuantity: builder.query({
      query: ({ filter }) => ({
        url: `/sales/total-sales-quantity?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useGetTotalSalesQuantityQuery } = salesApi;
