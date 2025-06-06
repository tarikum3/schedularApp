import { NextRequest, NextResponse } from "next/server";

import { sendScheduleReminderEmail } from "@/lib/email"; // Adjust the import path
import prisma from "@lib/prisma";
import { createNotification } from "@lib/services/prismaServicesSchedular";
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    // Find schedules that start today
    const schedules = await prisma.schedule.findMany({
      where: {
        startDate: {
          gte: today, // Greater than or equal to the start of today
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than the start of tomorrow
        },
      },
      include: {
        user: true, // Include the user associated with the schedule
      },
    });

    for (const schedule of schedules) {
      await createNotification({
        userId: schedule.userId,
        title: "Schedule Reminder",
        description: `Your schedule "${schedule.name}" starts today.`,
        type: schedule.scheduleType,
        status: "PENDING",
      });
    }
    const userEmails = Array.from(
      new Set(schedules.map((schedule) => schedule.user.email))
    );

    const validUserEmails = userEmails.filter(
      (email): email is string => email !== null
    );

    if (userEmails.length > 0) {
      const message = "Your schedule starts today. Don't forget to check it!";
      await sendScheduleReminderEmail(validUserEmails, message);
    }

    return NextResponse.json({
      success: true,
      message: "Cron job executed successfully",
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { success: false, message: "Cron job failed" },
      { status: 500 }
    );
  }
}
