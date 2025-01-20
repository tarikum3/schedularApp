


import { NextRequest, NextResponse } from "next/server";
import { createProduct } from "@lib/services/prismaServices";

export async function POST(req: NextRequest) {
    const res = await req.json()
    const product = await createProduct(res);
    return NextResponse.json({ product })

  }