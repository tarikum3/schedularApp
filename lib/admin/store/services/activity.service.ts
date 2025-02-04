

import { serviceApi } from './serviceApi';







export const activityApi = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getActivitys: builder.query<any, any>({
          query: ({ page = 1, limit = 10, searchText = '' }) => ({
            url: `admin/activity?page=${page}&limit=${limit}&searchText=${searchText}`,
            method: "GET",
          }),
          providesTags: ["Activity", ],
        }),
    
        createActivity: builder.mutation<any, any>({
          query: (activity) => ({
            url: "admin/activity",
            method: "POST",
            body: activity,
          }),
          // transformResponse: (response: Activity) => response.data.activity,
          invalidatesTags: ["Activity"],
        }),
        updateActivity: builder.mutation<
        any,
        any & { id: string }
      >({
        query: (activity) => {
          let { id } = activity;
  
          return {
            url: `admin/activity/${id}`,
            method: "PUT",
            body: activity,
          };
        },
  
        invalidatesTags: ["Activity"],
      }),

      }),

})
export const { useGetActivitysQuery ,useCreateActivityMutation,useUpdateActivityMutation} = activityApi