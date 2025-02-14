import { serviceApi } from "@/lib/admin/store/services/serviceApi";

export const overviewApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviews: builder.query<any, any>({
      query: ({ fromDate, toDate, type }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          ...(type && { type }),
        });

        return {
          url: `admin/dashboard/overview?${params.toString()}`,
          method: "GET",
        };
      },
     // providesTags: ["Overview"],
    }),
  }),
});
export const { useGetOverviewsQuery } = overviewApi;
