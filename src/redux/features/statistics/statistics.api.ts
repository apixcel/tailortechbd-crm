import { api } from "@/redux/api/api";
import { ICapitalTimelineEntry, IFinancialOverview } from "@/types/statistics";
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
  }),
});

export const { useGetFinancialOverViewQuery, useGetCapitalTimelineQuery } = statisticsAPi;
