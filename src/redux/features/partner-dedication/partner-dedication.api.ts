import { api } from "@/redux/api/api";
import { IMeta, IPartnerDedication } from "@/types";
import { generateQueryParams } from "@/utils";

const partnerDedicationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPartnerDedication: builder.mutation<{ data: IPartnerDedication }, IPartnerDedication>({
      query: (body) => ({
        url: "/partner-dedication/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["partner-dedication"],
    }),
    getAllPartnerDedication: builder.query<
      { data: IPartnerDedication[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/partner-dedication?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["partner-dedication"],
    }),
    getPartnerDedicationById: builder.query<{ data: IPartnerDedication }, string>({
      query: (id) => ({
        url: `/partner-dedication/${id}`,
        method: "GET",
      }),
      providesTags: ["partner-dedication"],
    }),
    updatePartnerDedicationById: builder.mutation<
      { data: IPartnerDedication },
      { id: string; body: IPartnerDedication }
    >({
      query: ({ id, body }) => ({
        url: `/partner-dedication/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["partner-dedication"],
    }),
    deletePartnerDedicationById: builder.mutation<{ data: IPartnerDedication[] }, string>({
      query: (id) => ({
        url: `/partner-dedication/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["partner-dedication"],
    }),
  }),
});

export const {
  useCreatePartnerDedicationMutation,
  useGetAllPartnerDedicationQuery,
  useGetPartnerDedicationByIdQuery,
  useUpdatePartnerDedicationByIdMutation,
  useDeletePartnerDedicationByIdMutation,
} = partnerDedicationApi;
