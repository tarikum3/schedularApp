import { NextRequest, NextResponse } from "next/server";
import { updateScheduleById } from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const schedule = await updateScheduleById(reqData.id, reqData);

  return NextResponse.json({ data: schedule });
}

//export async function DELETE(req: NextRequest) {}
