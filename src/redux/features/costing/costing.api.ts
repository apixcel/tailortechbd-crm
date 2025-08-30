import { api } from "@/redux/api/api";
import { ICosting, ICostingReport, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const costingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCosting: builder.mutation<{ data: ICosting }, Partial<ICosting>>({
      query: (payload) => ({
        url: "/costing/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["costing"],
    }),
    getAllCostings: builder.query<
      { data: ICosting[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/costing/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["costing"],
    }),
    getCostingById: builder.query<{ data: ICosting }, { costingId: string }>({
      query: ({ costingId }) => ({
        url: `/costing/get/${costingId}`,
        method: "GET",
      }),
      providesTags: ["costing"],
    }),
    updateCostingById: builder.mutation<
      { data: ICosting },
      { payload: Partial<ICosting>; costingId: string }
    >({
      query: ({ costingId, payload }) => ({
        url: `/costing/update/${costingId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["costing"],
    }),
    deleteCostingById: builder.mutation<{ data: ICosting }, string>({
      query: (costingId) => ({
        url: `/costing/delete/${costingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["costing"],
    }),
    getCostingReport: builder.query<{ data: ICostingReport }, Record<string, string | number>>({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/costing/get/report?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["costing"],
    }),
  }),
});

export const {
  useCreateCostingMutation,
  useGetAllCostingsQuery,
  useLazyGetAllCostingsQuery,
  useGetCostingByIdQuery,
  useUpdateCostingByIdMutation,
  useDeleteCostingByIdMutation,
  useGetCostingReportQuery,
} = costingApi;
