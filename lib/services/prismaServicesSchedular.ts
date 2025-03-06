import prisma from "@lib/prisma";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  format,
  isSunday,
  isWeekend,
} from "date-fns";
import { Prisma } from "@prisma/client";

import { z } from "zod";
import bcrypt from "bcryptjs";

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
}

export async function createCustomer(user: any) {
  try {
    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        password: user.password,
        ...(user.firstName && { firstName: user.firstName }),
        ...(user.lastName && { lastName: user.lastName }),
        ...(user.email && { email: user.email }),
        ...(user.phone && { phone: user.phone }),
      },
    });

    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Unable to create customer.");
  }
}
export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Unable to fetch customers.");
  }
}

// Define the FetchCustomersOptions interface
interface FetchCustomersOptions {
  searchKey?: string;
  filter?: {
    userId?: string;
    email?: string;
    phone?: string;
  };
  pagination?: {
    offset?: number;
    limit?: number;
  };
  sort?: {
    field: "createdAt" | "totalSpent" | "totalOrders";
    order: "asc" | "desc";
  };
}

// Define the Customer type (assuming it matches your Prisma model)
type Customer = Prisma.CustomerGetPayload<{
  include: {
    user: true;
    orders: true;
  };
}>;
export async function fetchCustomers(
  options: FetchCustomersOptions
): Promise<{ customers: Customer[]; total: number }> {
  const { searchKey, filter, pagination, sort } = options;

  const where: Prisma.CustomerWhereInput = {};

  // Search across multiple fields
  if (searchKey) {
    where.OR = [
      { firstName: { contains: searchKey, mode: "insensitive" } },
      { lastName: { contains: searchKey, mode: "insensitive" } },
      { email: { contains: searchKey, mode: "insensitive" } },
      { phone: { contains: searchKey, mode: "insensitive" } },
      { city: { contains: searchKey, mode: "insensitive" } },
      { country: { contains: searchKey, mode: "insensitive" } },
    ];
  }

  // Apply filters
  if (filter?.userId) {
    where.userId = filter.userId;
  }

  if (filter?.email) {
    where.email = filter.email;
  }

  if (filter?.phone) {
    where.phone = filter.phone;
  }

  // Define sorting
  const orderBy: Prisma.CustomerOrderByWithRelationInput = sort
    ? { [sort.field]: sort.order }
    : { createdAt: "desc" };

  // Fetch customers with pagination
  const customers = await prisma.customer.findMany({
    where,
    orderBy,
    skip: pagination?.offset ?? 0,
    take: pagination?.limit ?? 10,
    include: {
      user: true,
      orders: true,
    },
  });

  // Get the total count of customers matching the filters
  const total = await prisma.customer.count({ where });

  return { customers, total };
}

// Define the FetchAdminUsersOptions interface
interface FetchAdminUsersOptions {
  searchKey?: string;
  filter?: {
    userId?: string;
    email?: string;
    phone?: string;
  };
  pagination?: {
    offset?: number;
    limit?: number;
  };
  sort?: {
    field: "createdAt" | "email" | "phone";
    order: "asc" | "desc";
  };
}

// Function to create a new customer
export async function createUser(data: CreateUserData) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the customer with the hashed password
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Unable to create customer.");
  }
}
export async function deleteUser(id: string) {
  try {
    const customer = await prisma.user.delete({
      where: { id },
    });
    return customer;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Unable to delete customer.");
  }
}
export async function getUsers() {
  try {
    const customers = await prisma.user.findMany();
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Unable to fetch customers.");
  }
}
export async function getUser(identifier: { id?: string; email?: string }) {
  const { id, email } = identifier;

  if (!id && !email) {
    throw new Error("Either id or email must be provided.");
  }

  try {
    const whereClause = id ? { id } : { email: email as string };

    const customer = await prisma.user.findUnique({
      where: whereClause,
    });

    if (!customer) {
      throw new Error(
        `Customer not found with ${id ? `ID ${id}` : `email ${email}`}.`
      );
    }

    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Unable to fetch customer.");
  }
}
type UpdateUserData = Partial<CreateUserData>;

export async function updateUser(id: string, data: UpdateUserData) {
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const customer = await prisma.user.update({
      where: { id },
      data,
    });
    return customer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Unable to update customer.");
  }
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const { email, password } = data;

  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    // Return user data or a JWT token, etc.
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      image: user.image,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Unable to log in.");
  }
}

async function checkmain() {
  // First, execute the SELECT query
  const selectResult = await prisma.$queryRaw`
    SELECT "id", "migration_name", "checksum"
    FROM "_prisma_migrations"
    WHERE "migration_name" = '20250219182035_new'
  `;
  console.log("Before Updateeee:", selectResult);

  // Now, execute the UPDATE query
  const updateResult = await prisma.$executeRaw`
    UPDATE "_prisma_migrations"
    SET "checksum" = '01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b'
    WHERE "migration_name" = '20250219182035_new'
  `;
  console.log("Update Result:", updateResult);
}

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

export const getDaysByYear = async (year: number) => {
  await generateDefaultDays(year); // Ensure default days are generated

  try {
    const days = await prisma.day.findMany({
      where: { year: year.toString() },
      include: {
        schedules: true, // Fetch related schedule details
      },
    });

    return days;
  } catch (error) {
    throw new Error("Unable to fetch schedues.");
  }
};

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
    const schedules = await prisma.schedule.findMany({
      orderBy: { createdAt: "desc" },
      include: { daysRelation: true },
    });
    return { schedules };
  } catch (error) {
    throw new Error("Error fetching schedules");
  }
};
