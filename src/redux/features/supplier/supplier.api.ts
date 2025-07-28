import { api } from "@/redux/api/api";
import { IMeta, ISupplier } from "@/types";
import { generateQueryParams } from "@/utils";

const supplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation<{ data: ISupplier }, Partial<ISupplier>>({
      query: (payload) => ({
        url: "/supplier/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["supplier"],
    }),
    getAllSuppliers: builder.query<
      { data: ISupplier[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/supplier/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["supplier"],
    }),
    getSupplierById: builder.query<{ data: ISupplier }, { supplierId: string }>({
      query: ({ supplierId }) => ({
        url: `/supplier/get/${supplierId}`,
        method: "GET",
      }),
      providesTags: ["supplier"],
    }),
    updateSupplierById: builder.mutation<
      { data: ISupplier },
      { payload: Partial<ISupplier>; supplierId: string }
    >({
      query: ({ supplierId, payload }) => ({
        url: `/supplier/update/${supplierId}`,
        method: "PATCH",
        body: { _id: undefined, ...payload },
      }),
      invalidatesTags: ["supplier"],
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

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useUpdateSupplierByIdMutation,
  useDeleteSupplierByIdMutation,
  useGetSupplierByIdQuery,
} = supplierApi;
