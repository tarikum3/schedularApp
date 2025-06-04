import { NextRequest, NextResponse } from "next/server";
import { updateSingleUserNotification } from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  console.log("sessionauthfromrole", session);
  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const { id } = await params;
  const reqData = await req.json();
  const Notification = await updateSingleUserNotification(
    session.user.id,
    id,
    reqData.newStatus
  );
  return NextResponse.json({ data: Notification });
}

//export async function DELETE(req: NextRequest) {}
