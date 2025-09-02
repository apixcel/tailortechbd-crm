import { api } from "@/redux/api/api";
import { IMeta, TProfitBalance } from "@/types";
import { generateQueryParams } from "@/utils";

const profitBalanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfitBalanceList: builder.query<
      { data: { result: TProfitBalance[]; total_profit: number }; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/profit-balance/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["profitBalance"],
    }),
  }),
});

export const { useGetAllProfitBalanceListQuery } = profitBalanceApi;
