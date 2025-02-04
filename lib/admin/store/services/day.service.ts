import { serviceApi } from "@/lib/admin/store/services/serviceApi";
import { DayPayload, Day } from "@/lib/admin/types/day.type";

export interface Pagination {
  limit: number;
  page: number;
}

export const DayApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDay: builder.mutation<Day, DayPayload & { id: string }>({
      query: (Day) => {
        let id = (Day as any).get("id");
        (Day as any).delete("id");

        return {
          url: `admin/day/${id}`,
          method: "PATCH",
          body: Day,
        };
      },

      invalidatesTags: ["Day"],
    }),

    getDayByYear: builder.query<Day, string>({
      query: (id) => ({
        url: `admin/day/${id}`,
      }),

      providesTags: ["Day"],
    }),
  }),
});

export const {
  useGetDayByYearQuery,

  useUpdateDayMutation,
} = DayApi;
