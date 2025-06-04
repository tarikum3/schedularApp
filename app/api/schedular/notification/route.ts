import { NextRequest, NextResponse } from "next/server";
import {
  getUserNotifications,
  updateUserNotificationsStatus,
} from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const notifications = await getUserNotifications(session.user.id, query);

  return NextResponse.json({ data: notifications });
}
export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const reqData = await req.json();
  const Notifications = await updateUserNotificationsStatus(
    session.user.id,
    reqData
  );

  return NextResponse.json({ data: Notifications });
}
