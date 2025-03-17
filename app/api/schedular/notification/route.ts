import { NextRequest, NextResponse } from "next/server";
import { getUserNotifications } from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const notifications = await getUserNotifications(
    session.user.id as any,
    query
  );
  return NextResponse.json({ data: notifications });
}

//export async function DELETE(req: NextRequest) {}
