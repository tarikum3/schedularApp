import bcrypt from "bcryptjs";

import prisma from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // if (req.method !== "POST") return res.status(405).end();

  //const { token, password } = req.body;
  const { token, password } = await req.json();
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token } as any,
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    // return res.status(400).json({ message: "Token is invalid or has expired" });
    return NextResponse.json(
      { error: { message: "Token is invalid or has expired" } },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id } as any,
    });
  } catch (error) {
    console.log("error at reset", error);
    return NextResponse.json({ errors: { message: "error" } }, { status: 401 });
  }
  return NextResponse.json(
    { error: { message: "Password has been reset" } },
    { status: 200 }
  );
}
