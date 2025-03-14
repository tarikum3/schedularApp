import { NextRequest, NextResponse } from "next/server";
import { getDaysByYear } from "@lib/services/prismaServicesSchedular";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  const days = await getDaysByYear(query.year as any);

  return NextResponse.json({ data: days });
}
