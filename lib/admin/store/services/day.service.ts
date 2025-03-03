import { serviceApi } from "@/lib/admin/store/services/serviceApi";
import { DayPayload, Day } from "@/lib/admin/types/day.type";

export interface Pagination {
  limit: number;
  page: number;
}

export const DayApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getDayByYear: builder.query<Day, string>({
      query: (year) => {
        const params = new URLSearchParams({
          year: year.toString(),
        });

        return {
          url: `schedular/day/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: { days: Day[] } }): Day[] => {
        if (response?.data?.days) {
          return response.data.days;
        }

        return [];
      },
      providesTags: ["Day"],
    }),
  }),
});

export const { useGetDayByYearQuery } = DayApi;
