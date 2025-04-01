import { NextRequest, NextResponse } from "next/server";
import {
  getDaysByYear,
  getAllSchedules,
  createSchedule,
} from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  if (!session.user.id) {
    return NextResponse.json({ message: "No user id" });
  }
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  const schedules = await getAllSchedules();
  return NextResponse.json({ data: schedules });
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  if (!session.user.id) {
    return NextResponse.json({ message: "No user id" });
  }
  const reqData = await req.json();
  const schedule = await createSchedule({
    scheduleBody: reqData,
    userId: session.user.id as any,
  });

  return NextResponse.json({ data: schedule });
}

//export async function DELETE(req: NextRequest) {}
