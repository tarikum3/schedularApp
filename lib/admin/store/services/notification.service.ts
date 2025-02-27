// import { serviceApi } from "./serviceApi";

// export const notificationApi = serviceApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getNotifications: builder.query<any, any>({
//       query: ({ page = 1, limit = 10 }) => ({
//         url: `admin/notification?page=${page}&limit=${limit}`,
//         method: "GET",
//       }),
//       providesTags: ["Notification"],
//     }),

//     updateNotification: builder.mutation<any, any & { id: string }>({
//       query: (notification) => {
//         let { id } = notification;

//         return {
//           url: `admin/notification/${id}`,
//           method: "PUT",
//           body: notification,
//         };
//       },

//       invalidatesTags: ["Notification"],
//     }),
//   }),
// });
// export const { useGetNotificationsQuery, useUpdateNotificationMutation } =
//   notificationApi;

// api/notificationApi.ts

import { serviceApi } from "./serviceApi";
// types/notification.ts

export enum NotificationType {
  NEW_PRODUCT = "NEW_PRODUCT",
  NEW_USER = "NEW_USER",
  STOCK_OUT = "STOCK_OUT",
}

export enum NotificationStatus {
  OPENED = "OPENED",
  VIEWED = "VIEWED",
  PENDING = "PENDING",
}

export interface Notification {
  id: string;
  title?: string;
  description?: string;
  link?: string;
  type: NotificationType;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserNotification {
  userId: string;
  notificationId: string;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  notification: Notification;
}

export interface GetNotificationsResponse {
  notifications: UserNotification[];
  total: number;
  page: number;
  limit: number;
}

// export interface UpdateNotificationRequest {
//   id: string;
//   status: NotificationStatus;
// }

export interface UpdateNotificationRequest {
  id?: string; // Optional: ID of a single notification to update
  userId?: string; // Optional: User ID for bulk updates
  currentStatus?: NotificationStatus; // Optional: Filter by current status for bulk updates
  newStatus: NotificationStatus; // New status to set
}

// export const notificationApi = serviceApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getNotifications: builder.query<GetNotificationsResponse, { page?: number; limit?: number; userId: string }>({
//       query: ({ page = 1, limit = 10, userId }) => ({
//         url: `admin/notification?page=${page}&limit=${limit}&userId=${userId}`,
//         method: "GET",
//       }),
//       providesTags: ["Notification"],
//     }),

//     updateNotification: builder.mutation<void, UpdateNotificationRequest>({
//       query: ({ id, ...body }) => ({
//         url: `admin/notification/${id}`,
//         method: "PUT",
//         body,
//       }),
//       invalidatesTags: ["Notification"],
//     }),
//   }),
// });

// export const { useGetNotificationsQuery, useUpdateNotificationMutation } = notificationApi;

export const notificationApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, any>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `admin/notification?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    updateNotification: builder.mutation<void, UpdateNotificationRequest>({
      query: (request) => {
        const { id, userId, currentStatus, newStatus } = request;

        // Single notification update
        if (id) {
          return {
            url: `admin/notification/${id}`,
            method: "PUT",
            body: { newStatus },
          };
        }

        // Bulk notification update
        if (userId && currentStatus) {
          return {
            url: `admin/notification/bulk-update`,
            method: "PUT",
            body: { userId, currentStatus, newStatus },
          };
        }

        throw new Error(
          "Invalid update request: Either `id` or `userId` and `currentStatus` must be provided."
        );
      },
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery, useUpdateNotificationMutation } =
  notificationApi;
