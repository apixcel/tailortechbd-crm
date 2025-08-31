import { api } from "@/redux/api/api";
import { IMeta, ISupplier } from "@/types";
import { ISupplierPayment } from "@/types/supplierPayment";
import { generateQueryParams } from "@/utils";

const supplierPaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation<{ data: ISupplier }, Partial<ISupplier>>({
      query: (payload) => ({
        url: "/supplier/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["supplier"],
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
      providesTags: ["supplier"],
    }),

    deleteSupplierById: builder.mutation<{ data: ISupplier }, { supplierId: string }>({
      query: ({ supplierId }) => ({
        url: `/supplier/delete/${supplierId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),
  }),
});

export const { useGetAllSupplierPaymentsQuery } = supplierPaymentApi;
