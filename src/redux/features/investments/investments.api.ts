import { api } from "@/redux/api/api";
import { IInvestment, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const investmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createInvestment: builder.mutation<{ data: IInvestment }, IInvestment>({
      query: (body) => ({
        url: "/investments/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["investments"],
    }),
    getAllInvestments: builder.query<
      { data: IInvestment[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/investments?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["investments"],
    }),
    getInvestmentById: builder.query<{ data: IInvestment }, string>({
      query: (id) => ({
        url: `/investments/${id}`,
        method: "GET",
      }),
      providesTags: ["investments"],
    }),
    updateInvestment: builder.mutation<{ data: IInvestment }, { id: string; body: IInvestment }>({
      query: ({ id, body }) => ({
        url: `/investments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["investments"],
    }),
    deleteInvestmentById: builder.mutation<{ data: IInvestment[] }, string>({
      query: (id) => ({
        url: `/investments/${id}`,
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
  useUpdateInvestmentMutation,
} = investmentsApi;
