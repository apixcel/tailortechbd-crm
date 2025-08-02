import { api } from "@/redux/api/api";
import { IDeposit, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const depositsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDeposit: builder.mutation<{ data: IDeposit }, Partial<IDeposit>>({
      query: (payload) => ({
        url: "/deposit/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["deposits"],
    }),
    getAllDeposits: builder.query<
      { data: IDeposit[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/deposit/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["deposits"],
    }),
    getDepositById: builder.query<{ data: IDeposit }, { depositId: string }>({
      query: ({ depositId }) => ({
        url: `/deposit/get/${depositId}`,
        method: "GET",
      }),
      providesTags: ["deposits"],
    }),
    updateDepositById: builder.mutation<
      { data: IDeposit },
      { depositId: string; payload: Partial<IDeposit> }
    >({
      query: ({ depositId, payload }) => ({
        url: `/deposit/update/${depositId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["deposits"],
    }),
    deleteDepositById: builder.mutation<{ data: IDeposit }, string>({
      query: (depositId) => ({
        url: `/deposit/delete/${depositId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deposits"],
    }),
  }),
});

export const {
  useCreateDepositMutation,
  useGetAllDepositsQuery,
  useDeleteDepositByIdMutation,
  useGetDepositByIdQuery,
  useUpdateDepositByIdMutation,
} = depositsApi;
