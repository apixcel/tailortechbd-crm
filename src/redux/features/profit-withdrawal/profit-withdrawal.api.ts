import { api } from "@/redux/api/api";
import { IMeta, IProfitWithdrawal, IProfitWithdrawalPayload } from "@/types";
import { generateQueryParams } from "@/utils";

const profitWithdrawalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProfitWithdrawal: builder.mutation<{ data: IProfitWithdrawal }, IProfitWithdrawalPayload>(
      {
        query: (payload) => ({
          url: "/finance/create/withdrawal",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["finance"],
      }
    ),
    getAllProfitWithdrawal: builder.query<
      { data: IProfitWithdrawal[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/finance/get/withdrawal?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["finance"],
    }),

    updateProfiteWithdrawalStatusById: builder.mutation<
      { data: IProfitWithdrawal },
      { id: string; payload: Pick<IProfitWithdrawal, "status"> }
    >({
      query: ({ id, payload }) => ({
        url: `/finance/update/withdrawal/status/${id}`,
        method: "PUT",
        body: { status: payload.status },
      }),
      invalidatesTags: ["finance"],
    }),
    getProfitWithdrawalById: builder.query<
      { data: IProfitWithdrawal },
      { profitWithdrawalId: string }
    >({
      query: ({ profitWithdrawalId }) => ({
        url: `/profit-withdrawal/get/${profitWithdrawalId}`,
        method: "GET",
      }),
      providesTags: ["finance"],
    }),
    updateProfitWithdrawalById: builder.mutation<
      { data: IProfitWithdrawal },
      { profitWithdrawalId: string; payload: Partial<IProfitWithdrawal> }
    >({
      query: ({ profitWithdrawalId, payload }) => ({
        url: `/profit-withdrawal/update/${profitWithdrawalId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["finance"],
    }),
    deleteProfitWithdrawalById: builder.mutation<
      { data: IProfitWithdrawal },
      { profitWithdrawalId: string }
    >({
      query: ({ profitWithdrawalId }) => ({
        url: `/profit-withdrawal/delete/${profitWithdrawalId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["finance"],
    }),
  }),
});

export const {
  useCreateProfitWithdrawalMutation,
  useGetAllProfitWithdrawalQuery,
  useLazyGetAllProfitWithdrawalQuery,
  useGetProfitWithdrawalByIdQuery,
  useUpdateProfitWithdrawalByIdMutation,
  useUpdateProfiteWithdrawalStatusByIdMutation,
  useDeleteProfitWithdrawalByIdMutation,
} = profitWithdrawalApi;
