import { SchedulePayload, Schedule } from "@/lib/admin/types/schedule.type";
import { serviceApi } from "@/lib/admin/store/services/serviceApi";
export interface Pagination {
  limit: number;
  page: number;
}

export const scheduleApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation<Schedule, SchedulePayload>({
      query: (schedule) => ({
        url: "admin/schedule",
        method: "POST",
        body: schedule,
      }),
      // transformResponse: (response: Schedule) => response.data.schedule,
      invalidatesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation<
      Schedule,
      SchedulePayload & { id: string }
    >({
      query: (schedule) => {
        let { id } = schedule;

        return {
          url: `admin/schedule/${id}`,
          method: "PUT",
          body: schedule,
        };
      },

      invalidatesTags: ["Schedule"],
    }),

    deleteSchedule: builder.mutation<Schedule, string>({
      query: (id) => ({
        url: `admin/schedule/${id}`,
        method: "DELETE",
      }),
      // transformResponse: (response: Schedule) => response.data.schedule,
      invalidatesTags: ["Schedule"],
    }),

    getAllSchedules: builder.query<Schedule[], void>({
      query: () => ({
        url: "schedules/fetch-all-schedules",
      }),
      providesTags: ["Schedule"],
      //providesTags: (result, error) => [{ type: "Schedule", }],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,

  useUpdateScheduleMutation,
} = scheduleApi;
