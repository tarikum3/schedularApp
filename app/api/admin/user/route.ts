import { NextRequest, NextResponse } from "next/server";
import { fetchCustomers } from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const customers = await fetchCustomers(query);
  return NextResponse.json({ data: customers });
}
