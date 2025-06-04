import { Prisma, NotificationType, NotificationStatus } from "@prisma/client";
import { serviceApi } from "./serviceApi";

import { supabase } from "@/lib/supabaseClient";
export type UserNotification = Prisma.UserNotificationGetPayload<{
  include: {
    notification: true;
    id: true;
  };
}>;

export interface GetNotificationsResponse {
  notifications: UserNotification[];
  total: number;
  page: number;
  limit: number;
  pendingCount: number;
}

interface GetNotificationsParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export interface UpdateNotificationRequest {
  id?: string;
  userId?: string;
  currentStatus?: NotificationStatus;
  newStatus: NotificationStatus;
}

export interface UpdateUserNotificationsStatusRequest {
  userId?: string;
  newStatus: NotificationStatus;
  options?: {
    page?: number;
    limit?: number;
    currentFilterStatus?: NotificationStatus;
  };
}

export const notificationApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      GetNotificationsResponse,
      GetNotificationsParams
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `admin/notification?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: {
        data: GetNotificationsResponse;
      }): GetNotificationsResponse => {
        if (response?.data) {
          return response.data;
        }
        return {} as any;
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // Create a channel for realtime updates
        const channel = supabase
          .channel("user-notification")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "UserNotification",
            },
            (payload) => {
              updateCachedData((draft) => {
                // Handle different event types
                switch (payload.eventType) {
                  case "INSERT":
                    draft.notifications.unshift(
                      payload.new as UserNotification
                    );
                    if (
                      (payload.new as UserNotification).status === "PENDING"
                    ) {
                      draft.pendingCount += 1;
                    }
                    break;
                  case "UPDATE":
                    const index = draft.notifications.findIndex(
                      (n) => n.id === (payload.new as UserNotification).id
                    );
                    if (index !== -1) {
                      const oldStatus = draft.notifications[index].status;
                      const newStatus = (payload.new as UserNotification)
                        .status;

                      draft.notifications[index] =
                        payload.new as UserNotification;

                      // Update pending count if status changed to/from PENDING
                      if (oldStatus === "PENDING" && newStatus !== "PENDING") {
                        draft.pendingCount -= 1;
                      } else if (
                        oldStatus !== "PENDING" &&
                        newStatus === "PENDING"
                      ) {
                        draft.pendingCount += 1;
                      }
                    }
                    break;
                  case "DELETE":
                    draft.notifications = draft.notifications.filter(
                      (n) => n.id !== (payload.old as UserNotification).id
                    );
                    if (
                      (payload.old as UserNotification).status === "PENDING"
                    ) {
                      draft.pendingCount -= 1;
                    }
                    break;
                }
              });
            }
          )
          .subscribe();

        await cacheEntryRemoved;
        channel.unsubscribe();
      },
      providesTags: ["Notification"],
    }),

    updateNotification: builder.mutation<void, UpdateNotificationRequest>({
      query: (request) => {
        const { id, userId, currentStatus, newStatus } = request;
        return {
          url: `schedular/notification/${id}`,
          method: "PUT",
          body: { newStatus },
        };
      },
      invalidatesTags: ["Notification"],
    }),

    updateUserNotificationsStatus: builder.mutation<
      void,
      UpdateUserNotificationsStatusRequest
    >({
      query: (request) => ({
        url: `admin/notification/status`,
        method: "PUT",
        body: request,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
  useUpdateUserNotificationsStatusMutation,
} = notificationApi;
