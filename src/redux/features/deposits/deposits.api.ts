import { api } from "@/redux/api/api";
import { IDeposit, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const depositsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDeposit: builder.mutation<{ data: IDeposit }, IDeposit>({
      query: (body) => ({
        url: "/deposits/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deposits"],
    }),
    getAllDeposits: builder.query<
      { data: IDeposit[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/deposits?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["deposits"],
    }),
    getDepositById: builder.query<{ data: IDeposit }, string>({
      query: (id) => ({
        url: `/deposits/${id}`,
        method: "GET",
      }),
      providesTags: ["deposits"],
    }),
    updateDeposit: builder.mutation<{ data: IDeposit }, { id: string; body: IDeposit }>({
      query: ({ id, body }) => ({
        url: `/deposits/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["deposits"],
    }),
    deleteDepositById: builder.mutation<{ data: IDeposit[] }, string>({
      query: (id) => ({
        url: `/deposits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deposits"],
    }),
  }),
});

export const {
  useCreateDepositMutation,
  useGetAllDepositsQuery,
  useGetDepositByIdQuery,
  useDeleteDepositByIdMutation,
  useUpdateDepositMutation,
} = depositsApi;
