import { NextRequest, NextResponse } from "next/server";
import { getDaysByYear } from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);

  const days = await getDaysByYear({
    year: query.year as any,
    userId: session.user.id as any,
  });

  return NextResponse.json({ data: days });
}
