import { api } from "@/redux/api/api";
import { TCategoryWithSubcategories, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { data: TCategoryWithSubcategories[]; meta: IMeta },
      Record<string, string | number | undefined>
    >({
      query: (queryParams) => {
        const queryString = generateQueryParams(queryParams);
        return {
          url: `/category/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
