///api/cron
// import { NextResponse } from "next/server";

// export async function GET() {}

import { NextResponse } from "next/server";

import { sendScheduleReminderEmail } from "@/lib/email"; // Adjust the import path
import prisma from "@lib/prisma";

export async function GET() {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
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

    const userEmails = Array.from(
      new Set(schedules.map((schedule) => schedule.user.email))
    );

    // Filter out null values (if any)
    const validUserEmails = userEmails.filter(
      (email): email is string => email !== null
    );
    // Send emails to all users with schedules starting today
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
