import { NextRequest, NextResponse } from "next/server";
import {
  getUserNotifications,
  updateUserNotificationsStatus,
} from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" });
  }

  const reqData = await req.json();

  try {
    const result = await updateUserNotificationsStatus(
      session.user.id,
      reqData.newStatus,
      reqData.options
    );

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
