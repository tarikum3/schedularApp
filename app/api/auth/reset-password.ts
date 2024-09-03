import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { token, password } = req.body;

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token } as any,
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return res.status(400).json({ message: "Token is invalid or has expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } as any });

  res.status(200).json({ message: "Password has been reset" });
}
