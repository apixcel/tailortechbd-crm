import { api } from "@/redux/api/api";
import { IMeta } from "@/types";
import { IPartner } from "@/types/partner";
import { generateQueryParams } from "@/utils/queryParams";

const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPartner: builder.mutation<
      { data: Omit<IPartner, "_id" | "createdAt" | "updatedAt"> },
      IPartner
    >({
      query: (payload) => ({
        url: "/partner/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["partners"],
    }),
    getAllPartners: builder.query<
      { data: IPartner[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/partner/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["partners"],
    }),
  }),
});

export const { useCreatePartnerMutation, useGetAllPartnersQuery } = partnersApi;
