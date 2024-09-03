import type { NextApiRequest, NextApiResponse } from "next";
import { sendPasswordResetEmail } from "@lib/email";
import { v4 as uuidv4 } from "uuid";
import prisma from "@lib/prisma";
//import { convertToSlug } from "@/lib/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  await sendPasswordResetEmail(email, token);

  res.status(200).json({ message: "Password reset email sent" });
}
