import type { NextApiRequest, NextApiResponse } from "next";
import { sendPasswordResetEmail } from "@lib/email";
import { v4 as uuidv4 } from "uuid";
import prisma from "@lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("forgot1");

  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      { errors: { message: "User not found" } },
      { status: 400 }
    );
  //if (!user) return res.status(404).json({ message: "User not found" });
  //console.log("forgot1");
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  try {
    await sendPasswordResetEmail(email, token);
  } catch (error) {
    // console.error("Error sending email:", error);
    return NextResponse.json(
      { errors: { message: "error sending email" } },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Password reset email sent" },
    { status: 200 }
  );
}
