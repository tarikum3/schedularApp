import { NextRequest, NextResponse } from "next/server";
import { fetchOrders } from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const products = await fetchOrders(query);
  return NextResponse.json({ data: products });
}
