import { api } from "@/redux/api/api";
import { IMeta, ISupplier } from "@/types";
import { ISupplierPayment } from "@/types/supplierPayment";
import { generateQueryParams } from "@/utils";

const supplierPaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSupplierPayment: builder.mutation<{ data: ISupplierPayment }, Partial<ISupplierPayment>>({
      query: (payload) => ({
        url: "/supplier-payment/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["supplierPayment"],
    }),
    getAllSupplierPayments: builder.query<
      { data: ISupplierPayment[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/supplier-payment/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["supplierPayment"],
    }),

    deleteSupplierPaymentById: builder.mutation<{ data: ISupplier }, string>({
      query: (supplierPaymentId) => ({
        url: `/supplier-payment/delete/${supplierPaymentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplierPayment"],
    }),
  }),
});

export const {
  useGetAllSupplierPaymentsQuery,
  useLazyGetAllSupplierPaymentsQuery,
  useCreateSupplierPaymentMutation,
  useDeleteSupplierPaymentByIdMutation,
} = supplierPaymentApi;
