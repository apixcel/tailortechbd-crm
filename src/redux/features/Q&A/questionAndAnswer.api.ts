import { api } from "@/redux/api/api";

const questionAndAnswerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPendingQuestionCount: builder.query<{ data: { pendingQuestionCount: number } }, undefined>({
      query: () => ({
        url: "/question-and-answer/pending-count",
        method: "GET",
      }),
      providesTags: ["questionAndAnswer"],
    }),
  }),
});
export const { useGetPendingQuestionCountQuery } = questionAndAnswerApi;
