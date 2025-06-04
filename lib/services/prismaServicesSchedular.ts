import prisma from "@lib/prisma";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  format,
  isSunday,
  isWeekend,
} from "date-fns";

import { NotificationType, NotificationStatus } from "@prisma/client";
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

  // await generateDefaultDays(new Date(startDate).getFullYear());
  // await generateDefaultDays(new Date(endDate).getFullYear());

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

export async function getUserNotifications(
  userId: string,
  options?: {
    status?: NotificationStatus;
    page?: number;
    limit?: number;
  }
): Promise<{
  notifications: any[];
  total: number;
  pendingCount: number; // New field
  page: number;
  limit: number;
}> {
  const { status, page = 1, limit = 10 } = options || {};

  try {
    const skip = (page - 1) * limit;

    // Execute all database queries in parallel for better performance
    const [userNotifications, total, pendingCount] = await Promise.all([
      prisma.userNotification.findMany({
        where: {
          userId,
          ...(status && { status }),
        },
        include: {
          notification: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.userNotification.count({
        where: {
          userId,
          ...(status && { status }),
        },
      }),
      // Additional query to get pending notifications count
      prisma.userNotification.count({
        where: {
          userId,
          status: "PENDING", // Explicitly count only pending notifications
        },
      }),
    ]);

    return {
      notifications: userNotifications,
      total,
      pendingCount, // Include the pending count in response
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw new Error("Unable to fetch user notifications.");
  }
}

export async function updateUserNotificationsStatus(
  userId: string,
  newStatus: NotificationStatus,
  options?: {
    page?: number;
    limit?: number;
    currentFilterStatus?: NotificationStatus; // Optional filter before update
  }
): Promise<{ count: number }> {
  const { page = 1, limit = 10, currentFilterStatus } = options || {};
  const skip = (page - 1) * limit;

  try {
    // First get the notification IDs for the current page
    const userNotifications = await prisma.userNotification.findMany({
      where: {
        userId,
        ...(currentFilterStatus && { status: currentFilterStatus }),
      },
      select: {
        notificationId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const notificationIds = userNotifications.map((un) => un.notificationId);

    // Update all matching notifications in a single transaction
    const result = await prisma.userNotification.updateMany({
      where: {
        userId,
        notificationId: { in: notificationIds },
      },
      data: {
        status: newStatus,
        // updatedAt: new Date(),
      },
    });

    return { count: result.count };
  } catch (error) {
    console.error("Error updating user notifications:", error);
    throw new Error("Unable to update user notifications");
  }
}
export async function updateAllUserNotificationStatus(
  userId: string,
  currentStatus: NotificationStatus, // Current status to filter by
  newStatus: NotificationStatus // New status to set
) {
  try {
    const updatedUserNotifications = await prisma.userNotification.updateMany({
      where: {
        userId: userId,
        status: currentStatus || "PENDING",
      },
      data: {
        status: newStatus || "VIEWED",
      },
    });

    return updatedUserNotifications;
  } catch (error) {
    console.error("Error updating all user notifications:", error);
    throw new Error("Unable to update all user notifications.");
  }
}

// services/notificationService.ts

export async function updateSingleUserNotification(
  userId: string,
  notificationId: string,
  newStatus: NotificationStatus
) {
  try {
    // Update the UserNotification by its composite key (userId and notificationId)
    const updatedNotification = await prisma.userNotification.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
      data: {
        status: newStatus, // Set the new status
      },
      include: {
        notification: true, // Include the associated Notification details
      },
    });

    return updatedNotification;
  } catch (error) {
    console.error("Error updating user notification:", error);
    throw new Error("Unable to update user notification.");
  }
}

interface CreateNotificationParams {
  userId: string;
  title?: string;
  description?: string;
  link?: string;
  type: NotificationType;
  status?: NotificationStatus; // Optional, defaults to PENDING
}

export async function createNotification(params: CreateNotificationParams) {
  const { userId, title, description, link, type, status = "PENDING" } = params;

  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        link,
        type,
        userNotifications: {
          create: {
            userId,
            status,
          },
        },
      },
      include: {
        userNotifications: true,
      },
    });

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    throw new Error("Notification creation failed");
  }
}
