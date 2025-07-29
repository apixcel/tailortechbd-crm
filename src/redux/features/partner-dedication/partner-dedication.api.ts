import { api } from "@/redux/api/api";
import { IMeta, IPartnerDedication } from "@/types";
import { generateQueryParams } from "@/utils";

const partnerDedicationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPartnerDedication: builder.mutation<
      { data: IPartnerDedication },
      Partial<IPartnerDedication>
    >({
      query: (payload) => ({
        url: "/partner-dedication/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["partner-dedication"],
    }),
    getAllPartnerDedication: builder.query<
      { data: IPartnerDedication[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/partner-dedication/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["partner-dedication"],
    }),
    getPartnerDedicationById: builder.query<
      { data: IPartnerDedication },
      { partnerDedicationId: string }
    >({
      query: ({ partnerDedicationId }) => ({
        url: `/partner-dedication/get/${partnerDedicationId}`,
        method: "GET",
      }),
      providesTags: ["partner-dedication"],
    }),
    updatePartnerDedicationById: builder.mutation<
      { data: IPartnerDedication },
      { partnerDedicationId: string; payload: Partial<IPartnerDedication> }
    >({
      query: ({ partnerDedicationId, payload }) => ({
        url: `/partner-dedication/update/${partnerDedicationId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["partner-dedication"],
    }),
    deletePartnerDedicationById: builder.mutation<
      { data: IPartnerDedication },
      { partnerDedicationId: string }
    >({
      query: ({ partnerDedicationId }) => ({
        url: `/partner-dedication/delete/${partnerDedicationId}`,
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
