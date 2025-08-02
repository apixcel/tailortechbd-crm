import { api } from "@/redux/api/api";
import { IMeta, IProfitWithdrawal } from "@/types";
import { generateQueryParams } from "@/utils";

const profitWithdrawalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProfitWithdrawal: builder.mutation<
      { data: IProfitWithdrawal },
      Partial<IProfitWithdrawal>
    >({
      query: (payload) => ({
        url: "/profit-withdrawal/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["profit-withdrawal"],
    }),
    getAllProfitWithdrawal: builder.query<
      { data: IProfitWithdrawal[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/profit-withdrawal/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["profit-withdrawal"],
    }),
    getProfitWithdrawalById: builder.query<
      { data: IProfitWithdrawal },
      { profitWithdrawalId: string }
    >({
      query: ({ profitWithdrawalId }) => ({
        url: `/profit-withdrawal/get/${profitWithdrawalId}`,
        method: "GET",
      }),
      providesTags: ["profit-withdrawal"],
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
      invalidatesTags: ["profit-withdrawal"],
    }),
    deleteProfitWithdrawalById: builder.mutation<
      { data: IProfitWithdrawal },
      { profitWithdrawalId: string }
    >({
      query: ({ profitWithdrawalId }) => ({
        url: `/profit-withdrawal/delete/${profitWithdrawalId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profit-withdrawal"],
    }),
  }),
});

export const {
  useCreateProfitWithdrawalMutation,
  useGetAllProfitWithdrawalQuery,
  useGetProfitWithdrawalByIdQuery,
  useUpdateProfitWithdrawalByIdMutation,
  useDeleteProfitWithdrawalByIdMutation,
} = profitWithdrawalApi;
