import { api } from "@/redux/api/api";
import { IMeta, IProfitDistribution } from "@/types";
import { generateQueryParams } from "@/utils";

const profitDistributionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProfitDistribution: builder.mutation<{ data: IProfitDistribution }, IProfitDistribution>({
      query: (body) => ({
        url: "/profit-distribution/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profit-distribution"],
    }),
    getAllProfitDistribution: builder.query<
      { data: IProfitDistribution[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/profit-distribution?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["profit-distribution"],
    }),
    getProfitDistributionById: builder.query<{ data: IProfitDistribution }, string>({
      query: (id) => ({
        url: `/profit-distribution/${id}`,
        method: "GET",
      }),
      providesTags: ["profit-distribution"],
    }),
    updateProfitDistribution: builder.mutation<
      { data: IProfitDistribution },
      { id: string; body: IProfitDistribution }
    >({
      query: ({ id, body }) => ({
        url: `/profit-distribution/${id}`,
        method: "PUT",
        body,
        invalidatesTags: ["profit-distribution"],
      }),
    }),
    deleteProfitDistributionById: builder.mutation<{ data: IProfitDistribution[] }, string>({
      query: (id) => ({
        url: `/profit-distribution/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profit-distribution"],
    }),
  }),
});

export const {
  useCreateProfitDistributionMutation,
  useGetAllProfitDistributionQuery,
  useGetProfitDistributionByIdQuery,
  useUpdateProfitDistributionMutation,
  useDeleteProfitDistributionByIdMutation,
} = profitDistributionApi;
