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
      invalidatesTags: ["finance"],
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
      providesTags: ["finance"],
    }),
    getDepositById: builder.query<{ data: IDeposit }, { depositId: string }>({
      query: ({ depositId }) => ({
        url: `/deposit/get/${depositId}`,
        method: "GET",
      }),
      providesTags: ["finance"],
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
      invalidatesTags: ["finance"],
    }),
    deleteDepositById: builder.mutation<{ data: IDeposit }, string>({
      query: (depositId) => ({
        url: `/deposit/delete/${depositId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["finance"],
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
