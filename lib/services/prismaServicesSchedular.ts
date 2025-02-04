import prisma from "@lib/prisma";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  format,
  isSunday,
  isWeekend,
} from "date-fns";

// export const generateDefaultDays = async (year?: number): Promise<void> => {
//   let currentYear = new Date().getFullYear().toString();
//   if (year) {
//     currentYear = year.toString();

//     const exists = await prisma.day.findFirst({
//       where: { year: currentYear },
//       select: { id: true },
//     });

//     if (exists) {

//       return;
//     }
//   }

//   // Generate dates for the entire year
//   const dates = eachDayOfInterval({
//     start: startOfYear(new Date(Number(currentYear), 0, 1)),
//     end: endOfYear(new Date(Number(currentYear), 11, 31)),
//   });

//   const defaultDays = dates.map((date) => {
//     const dayName = format(date, 'EEEE') as any;
//     const isWorkingDay = !isSunday(date) && !isWeekend(date);

//     return {
//       date: date,
//       dayName,
//       startTimes: [],
//       endTimes: [],
//       isWorkingDay,
//       isCustom: false,
//       year: currentYear,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//   });

//   await prisma.day.createMany({ data: defaultDays });
// };

// export const getDaysByYear = async (year: number) => {
//   await generateDefaultDays(year); // Ensure default days are generated

//   try {
//     const days = await prisma.day.findMany({
//       where: { year: year.toString() },
//       include: {
//         schedule: true, // Fetch related schedule details
//       },
//     });

//     return days;
//   } catch (error) {
//     throw new Error("Unable to fetch schedues.");
//   }
// };

// export const createSchedule = async (scheduleBody: any) => {
//   const { startDate, endDate, days, startTimes, endTimes, isWorkingDay, name } = scheduleBody;

//   // Generate default working hours for the year
//   await generateDefaultDays(new Date(startDate).getFullYear());
//   await generateDefaultDays(new Date(endDate).getFullYear());

//   try {
//     // Create the schedule
//     const schedule = await prisma.schedule.create({
//       data: scheduleBody,
//     });

//     // Update related Day records based on the schedule's startDate, endDate, and days
//     await prisma.day.updateMany({
//       where: {
//         date: { gte: new Date(startDate), lte: new Date(endDate) },
//         dayName: { in: days },
//       },
//       data: {
//         scheduleId: schedule.id,
//         startTimes: startTimes,
//         endTimes: endTimes,
//         isWorkingDay: isWorkingDay,
//       },
//     });

//     return schedule;
//   } catch (error) {
//     throw new Error('Error creating Schedule');
//   }
// };

// export const updateScheduleById = async (scheduleId: number, updateBody: object) => {
//   try {
//     // Fetch the Schedule by its ID
//     const schedule = await prisma.schedule.findUnique({
//       where: { id: scheduleId },
//     });

//     if (!schedule) {
//       throw new Error('Schedule not found');
//     }

//     await prisma.schedule.update({
//       where: { id: scheduleId },
//       data: updateBody,
//     });

//     await prisma.day.updateMany({
//       where: {
//         scheduleId: scheduleId,
//         date: { gte: new Date(schedule.startDate), lte: new Date(schedule.endDate) },
//         dayName: { in: schedule.days as any },
//       },
//       data: {
//         startTimes: schedule.startTimes,
//         endTimes: schedule.endTimes,
//         isWorkingDay: schedule.isWorkingDay,
//       },
//     });

//     return schedule;
//   } catch (error) {
//     throw new Error("error updating schedule");
//   }
// };

// export const getScheduleById = async (scheduleId: number) => {
//   try {
//     const schedule = await prisma.schedule.findUnique({
//       where: { id: scheduleId },
//     });
//     return schedule;
//   } catch (error) {
//     throw new Error('Schedule not found');
//   }
// };
// export const deleteScheduleById = async (scheduleId: number) => {
//   try {
//     // Find the schedule by ID
//     const schedule = await prisma.schedule.findUnique({
//       where: { id: scheduleId },
//       include: { daysRelation: true }, // Ensure associated `days` are fetched
//     });

//     if (!schedule) {

//       throw new Error('Schedule not found');
//     }

//     // Delete all related days first (Prisma does not support cascading delete by default)
//     await prisma.day.deleteMany({
//       where: { scheduleId },
//     });

//     // Delete the schedule
//     await prisma.schedule.delete({
//       where: { id: scheduleId },
//     });

//     return schedule;
//   } catch (error) {

//     throw new Error('Error Deleting Schedule ');
//   }
// };

// export const getAllSchedules = async (query: object) => {
//   try {
//     const schedules = await prisma.schedule.findMany({
//       ...query,
//      // orderBy: { createdAt: 'desc' },
//     });
//     return schedules;
//   } catch (error) {
//     throw new Error("error fetching schedules");
//   }
// };

export const generateDefaultDays = async (year?: number): Promise<void> => {
  const currentYear = year
    ? year.toString()
    : new Date().getFullYear().toString();

  const exists = await prisma.day.findFirst({
    where: { year: currentYear },
    select: { id: true },
  });

  if (exists) return;

  const dates = eachDayOfInterval({
    start: startOfYear(new Date(Number(currentYear), 0, 1)),
    end: endOfYear(new Date(Number(currentYear), 11, 31)),
  });

  const defaultDays = dates.map((date) => ({
    date,
    dayName: format(date, "EEEE") as any,
    year: currentYear,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await prisma.day.createMany({ data: defaultDays });
};

export const createSchedule = async (scheduleBody: any) => {
  const { startDate, endDate, days, scheduleType, name } = scheduleBody;

  await generateDefaultDays(new Date(startDate).getFullYear());
  await generateDefaultDays(new Date(endDate).getFullYear());

  try {
    const relatedDays = await prisma.day.findMany({
      where: {
        date: { gte: new Date(startDate), lte: new Date(endDate) },
        dayName: { in: days },
      },
    });

    const schedule = await prisma.schedule.create({
      data: {
        name,
        startDate,
        endDate,
        days,
        scheduleType,
        daysRelation: {
          connect: relatedDays.map((day) => ({ id: day.id })),
        },
      },
    });

    return schedule;
  } catch (error) {
    throw new Error("Error creating Schedule");
  }
};

export const updateScheduleById = async (
  scheduleId: string,
  updateBody: any
) => {
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) throw new Error("Schedule not found");

    const { startDate, endDate, days } = updateBody;

    let updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: updateBody,
    });

    if (startDate || endDate || days) {
      const relatedDays = await prisma.day.findMany({
        where: {
          date: {
            gte: new Date(startDate || schedule.startDate),
            lte: new Date(endDate || schedule.endDate),
          },
          dayName: { in: days || schedule.days },
        },
      });

      updatedSchedule = await prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          daysRelation: {
            set: relatedDays.map((day) => ({ id: day.id })),
          },
        },
      });
    }

    return updatedSchedule;
  } catch (error) {
    throw new Error("Error updating schedule");
  }
};

export const getScheduleById = async (scheduleId: string) => {
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { daysRelation: true },
    });
    if (!schedule) throw new Error("Schedule not found");
    return schedule;
  } catch (error) {
    throw new Error("Error fetching schedule");
  }
};

export const deleteScheduleById = async (scheduleId: string) => {
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { daysRelation: true },
    });

    if (!schedule) throw new Error("Schedule not found");

    await prisma.schedule.update({
      where: { id: scheduleId },
      data: { daysRelation: { set: [] } },
    });

    await prisma.schedule.delete({ where: { id: scheduleId } });

    return schedule;
  } catch (error) {
    throw new Error("Error deleting schedule");
  }
};

export const getAllSchedules = async () => {
  try {
    return await prisma.schedule.findMany({
      orderBy: { createdAt: "desc" },
      include: { daysRelation: true },
    });
  } catch (error) {
    throw new Error("Error fetching schedules");
  }
};
