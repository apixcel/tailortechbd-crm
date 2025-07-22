import { api } from "@/redux/api/api";
import { IMeta, IPurchase } from "@/types";
import { generateQueryParams } from "@/utils";

const purchaseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation<{ data: IPurchase }, Partial<IPurchase>>({
      query: (payload) => ({
        url: "/purchase/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["purchase"],
    }),
    updatePurchaseBySlug: builder.mutation<
      { data: IPurchase },
      { slug: string; payload: Partial<IPurchase> }
    >({
      query: ({ slug, payload }) => ({
        url: `/purchase/update/${slug}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["purchase"],
    }),
    deletePurchaseBySlug: builder.mutation<{ data: IPurchase }, { slug: string }>({
      query: ({ slug }) => ({
        url: `/purchase/delete/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purchase"],
    }),
    getPurchaseBySlug: builder.query<{ data: IPurchase }, { slug: string }>({
      query: ({ slug }) => ({
        url: `/purchase/get/${slug}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
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
  }),
});
export const {
  useCreatePurchaseMutation,
  useUpdatePurchaseBySlugMutation,
  useDeletePurchaseBySlugMutation,
  useGetPurchaseBySlugQuery,
  useGetAllPurchasesQuery,
} = purchaseApi;
