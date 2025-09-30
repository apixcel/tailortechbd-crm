import { api } from "@/redux/api/api";
import { IPurchaseWrite, IPurchase, IMeta, IPurchaseStatisticsResponse } from "@/types";
import { generateQueryParams } from "@/utils";

const purchaseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation<{ data: IPurchase }, IPurchaseWrite>({
      query: (payload) => ({
        url: "/purchase/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["purchase"],
    }),
    getAllPurchases: builder.query<
      { data: IPurchase[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/purchase/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["purchase"],
    }),
    getPurchaseStatistics: builder.query<
      IPurchaseStatisticsResponse,
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/purchase/get/report?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["purchase"],
    }),
    getPurchaseById: builder.query<{ data: IPurchase }, { purchaseId: string }>({
      query: ({ purchaseId }) => ({
        url: `/purchase/get/${purchaseId}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),
    updatePurchaseById: builder.mutation<
      { data: IPurchase },
      { purchaseId: string; payload: Partial<IPurchaseWrite> }
    >({
      query: ({ purchaseId, payload }) => ({
        url: `/purchase/update/${purchaseId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["purchase"],
    }),
    deletePurchaseById: builder.mutation<{ data: IPurchase }, { purchaseId: string }>({
      query: ({ purchaseId }) => ({
        url: `/purchase/delete/${purchaseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseByIdMutation,
  useDeletePurchaseByIdMutation,
  useGetAllPurchasesQuery,
  useGetPurchaseStatisticsQuery,
} = purchaseApi;
