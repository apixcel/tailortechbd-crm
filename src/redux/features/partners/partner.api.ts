import { api } from "@/redux/api/api";
import { IMeta } from "@/types";
import { IPartner, IPartnerNominee } from "@/types/partner";
import { generateQueryParams } from "@/utils/queryParams";

const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPartner: builder.mutation<
      { data: IPartner },
      Omit<IPartner, "_id" | "createdAt" | "updatedAt">
    >({
      query: (payload) => ({
        url: "/partner/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["partners"],
    }),
    cratePartnerNominee: builder.mutation<
      { data: IPartnerNominee },
      Omit<IPartnerNominee, "_id" | "createdAt" | "updatedAt" | "nomineeId">
    >({
      query: (payload) => ({
        url: "/partner/create/nominee",
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
    getAllNomineesByPartnerId: builder.query<{ data: IPartnerNominee[]; meta?: IMeta }, string>({
      query: (partnerId) => {
        return {
          url: `/partner/get/nominee/${partnerId}`,
          method: "GET",
        };
      },
      providesTags: ["partners"],
    }),

    deletePartnerNominee: builder.mutation<{ data: IPartnerNominee }, string>({
      query: (nomineeId) => ({
        url: `/partner/delete/nominee/${nomineeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["partners"],
    }),
    deletePartnerById: builder.mutation<{ data: IPartner }, string>({
      query: (partnerId) => ({
        url: `/partner/delete/${partnerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["partners"],
    }),
  }),
});

export const {
  useCreatePartnerMutation,
  useGetAllPartnersQuery,
  useCratePartnerNomineeMutation,
  useGetAllNomineesByPartnerIdQuery,
  useDeletePartnerNomineeMutation,
  useDeletePartnerByIdMutation,
} = partnersApi;
