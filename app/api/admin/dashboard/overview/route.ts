import { NextRequest, NextResponse } from "next/server";
import {
  fetchOrders,
  getDailyNewCustomers,
  getMonthlyNewCustomers,
} from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const { type, startDate, endDate } = Object.fromEntries(searchParams);
  if (type == "newCustomers") {
    const products = await getMonthlyNewCustomers(startDate, endDate);
    return NextResponse.json({ data: products });
  }

  return NextResponse.json({ data: "not correct type" });
}
