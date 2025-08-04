import { api } from "@/redux/api/api";
import { ICapital, ICapitalPayload, IMeta } from "@/types";
import { generateQueryParams } from "@/utils";

const capitalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCapital: builder.mutation<{ data: ICapital }, ICapitalPayload>({
      query: (payload) => ({
        url: "/finance/create/capital-journal",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["finance"],
    }),
    getAllCapitalJournal: builder.query<
      { data: ICapital[]; meta?: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/finance/get/capital-journal?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["finance"],
    }),
  }),
});

export const { useCreateCapitalMutation, useGetAllCapitalJournalQuery } = capitalApi;
