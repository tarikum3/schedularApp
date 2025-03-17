import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const user = await getUser({ id: session.user.id as any });
  return NextResponse.json({ data: user });
}
