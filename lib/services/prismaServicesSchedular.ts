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

export const getDaysByYear = async ({
  year,
  userId,
}: {
  year: number;
  userId: string;
}) => {
  await generateDefaultDays(year); // Ensure default days are generated

  try {
    const days = await prisma.day.findMany({
      where: { year: year.toString() },
      include: {
        schedules: { where: { userId: userId } },
      },
    });

    return { days };
  } catch (error) {
    throw new Error("Unable to fetch schedues.");
  }
};

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

export const createSchedule = async ({
  scheduleBody,
  userId,
}: {
  scheduleBody: any;
  userId: string;
}) => {
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
        userId,
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
