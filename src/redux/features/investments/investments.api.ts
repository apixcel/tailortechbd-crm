import { api } from "@/redux/api/api";
import { IInvestment, IInvestmentPayload, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const investmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createInvestment: builder.mutation<{ data: IInvestment }, IInvestmentPayload>({
      query: (payload) => ({
        url: "/finance/create/investment",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["finance"],
    }),
    getAllInvestments: builder.query<
      { data: IInvestment[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const params = { ...query };
        if (params.partnerId) {
          params.partner = params.partnerId;
          delete params.partnerId;
        }
        const queryString = generateQueryParams(params);
        return {
          url: `/finance/get/investment?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["finance"],
    }),
  }),
});

export const {
  useCreateInvestmentMutation,
  useGetAllInvestmentsQuery,
  useLazyGetAllInvestmentsQuery,
} = investmentsApi;
