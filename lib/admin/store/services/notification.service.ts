import { serviceApi } from "./serviceApi";

export const notificationApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, any>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `admin/notification?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    updateNotification: builder.mutation<any, any & { id: string }>({
      query: (notification) => {
        let { id } = notification;

        return {
          url: `admin/notification/${id}`,
          method: "PUT",
          body: notification,
        };
      },

      invalidatesTags: ["Notification"],
    }),
  }),
});
export const { useGetNotificationsQuery, useUpdateNotificationMutation } =
  notificationApi;
