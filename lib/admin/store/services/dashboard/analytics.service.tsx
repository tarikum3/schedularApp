import { serviceApi } from "@/lib/admin/store/services/serviceApi";

export const analyticsApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<any, any>({
      query: ({ fromDate, toDate, type }) => {
        const params = new URLSearchParams({
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          ...(type && { type }),
        });

        return {
          url: `admin/dashboard/analytics?${params.toString()}`,
          method: "GET",
        };
      },
     // providesTags: ["Analytics"],
    }),
  }),
});
export const { useGetAnalyticsQuery } = analyticsApi;