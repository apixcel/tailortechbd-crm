import { api } from "@/redux/api/api";
import { IInvestment, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const investmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createInvestment: builder.mutation<{ data: IInvestment }, Partial<IInvestment>>({
      query: (payload) => ({
        url: "/investments/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["investments"],
    }),
    getAllInvestments: builder.query<
      { data: IInvestment[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/investments/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["investments"],
    }),
    getInvestmentById: builder.query<{ data: IInvestment }, { investmentId: string }>({
      query: ({ investmentId }) => ({
        url: `/investments/get/${investmentId}`,
        method: "GET",
      }),
      providesTags: ["investments"],
    }),
    updateInvestmentById: builder.mutation<
      { data: IInvestment },
      { investmentId: string; payload: Partial<IInvestment> }
    >({
      query: ({ investmentId, payload }) => ({
        url: `/investments/update/${investmentId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["investments"],
    }),
    deleteInvestmentById: builder.mutation<{ data: IInvestment }, { investmentId: string }>({
      query: ({ investmentId }) => ({
        url: `/investments/delete/${investmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["investments"],
    }),
  }),
});

export const {
  useCreateInvestmentMutation,
  useGetAllInvestmentsQuery,
  useDeleteInvestmentByIdMutation,
  useGetInvestmentByIdQuery,
  useUpdateInvestmentByIdMutation,
} = investmentsApi;
