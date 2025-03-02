import { NextRequest, NextResponse } from "next/server";
import {
  createProduct,
  fetchProducts,
  updateProduct,
  createNotificationForAllUsers,
  NotificationType,
} from "@lib/services/prismaServices";
import { auth } from "@/auth";
export async function GET(req: NextRequest) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ message: "Unauthorized" });
  // }
  const searchParams = req.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams);
  const products = await fetchProducts(query);
  return NextResponse.json({ data: products });
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const product = await createProduct(reqData);
  createNotificationForAllUsers({ type: NotificationType.NEW_PRODUCT });
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const product = await updateProduct(reqData.id, reqData);
  return NextResponse.json({ product });
}

//export async function DELETE(req: NextRequest) {}
