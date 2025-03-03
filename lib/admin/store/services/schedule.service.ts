import { SchedulePayload, Schedule } from "@/lib/admin/types/schedule.type";
import { serviceApi } from "@/lib/admin/store/services/serviceApi";
export interface Pagination {
  limit: number;
  page: number;
}

export const scheduleApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchedules: builder.query<Schedule[], void>({
      query: () => ({
        url: "schedular/schedule",
        method: "GET",
      }),
      transformResponse: (response: {
        data: { schedules: Schedule[] };
      }): Schedule[] => {
        if (response?.data?.schedules) {
          return response.data.schedules;
        }

        return [];
      },
      providesTags: ["Schedule"],
      //providesTags: (result, error) => [{ type: "Schedule", }],
    }),
    createSchedule: builder.mutation<Schedule, SchedulePayload>({
      query: (schedule) => ({
        url: "schedular/schedule",
        method: "POST",
        body: schedule,
      }),
      transformResponse: (response: { data: { schedule: Schedule } }) =>
        response.data.schedule,
      invalidatesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation<
      Schedule,
      SchedulePayload & { id: string }
    >({
      query: (schedule) => {
        let { id } = schedule;

        return {
          url: `schedular/schedule/${id}`,
          method: "PUT",
          body: schedule,
        };
      },

      invalidatesTags: ["Schedule"],
    }),

    deleteSchedule: builder.mutation<Schedule, string>({
      query: (id) => ({
        url: `schedular/schedule/${id}`,
        method: "DELETE",
      }),
      // transformResponse: (response: Schedule) => response.data.schedule,
      invalidatesTags: ["Schedule"],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,

  useUpdateScheduleMutation,
} = scheduleApi;
