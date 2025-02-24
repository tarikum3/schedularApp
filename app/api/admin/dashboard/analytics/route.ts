
import { NextRequest, NextResponse } from "next/server";
import {
 getCustomerStatusSummary,getMonthlySalesRevenue
} from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const { type, fromDate, toDate } = Object.fromEntries(searchParams);
  if (type == "CustomersAnalytics") {
    const customersAnalytics = await getCustomerStatusSummary(fromDate, toDate);
    return NextResponse.json({ data: customersAnalytics });
  }
  if (type == "MonthlySalesRevenue") {
    const monthlySalesRevenue = await getMonthlySalesRevenue(fromDate, toDate);
    return NextResponse.json({ data: monthlySalesRevenue });
  }

  return NextResponse.json({ data: "not correct type" });
}