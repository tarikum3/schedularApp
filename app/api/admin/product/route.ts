import { NextRequest, NextResponse } from "next/server";
import { createProduct, fetchProducts } from "@lib/services/prismaServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Map the parameters you need
  const query = Object.fromEntries(searchParams);
  const products = await fetchProducts(query);
  return NextResponse.json({ data: products });
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const product = await createProduct(reqData);
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest) {
  const reqData = await req.json();
  const product = await createProduct(reqData);
  return NextResponse.json({ product });
}

//export async function DELETE(req: NextRequest) {}
