import { api } from "@/redux/api/api";
import {
  ICapitalTimelineEntry,
  ICostingGroupByCategory,
  IFinancialOverview,
  IInvestmentTimelineEntry,
  ISalesTimeline,
  IWithdrawalTimelineEntry,
} from "@/types/statistics";
import { generateQueryParams } from "@/utils";

const statisticsAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialOverView: builder.query<
      { data: IFinancialOverview },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/financial-overview?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getCapitalTimeline: builder.query<
      { data: ICapitalTimelineEntry[] },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/capital-timeline?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getInvestmentTimeline: builder.query<
      { data: IInvestmentTimelineEntry[] },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/investment-timeline?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getWithdrawalTimeline: builder.query<
      { data: IWithdrawalTimelineEntry[] },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/withdrawal-timeline?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getCostingStatisticsByCategory: builder.query<
      { data: ICostingGroupByCategory[] },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/costing-by-category?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
    getSalesTimeline: builder.query<
      { data: ISalesTimeline[] },
      Record<string, string | number | undefined>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/statistics/sales-timeline?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["statistics"],
    }),
  }),
});

export const {
  useGetFinancialOverViewQuery,
  useGetCapitalTimelineQuery,
  useGetInvestmentTimelineQuery,
  useGetWithdrawalTimelineQuery,
  useGetCostingStatisticsByCategoryQuery,
  useGetSalesTimelineQuery,
} = statisticsAPi;
