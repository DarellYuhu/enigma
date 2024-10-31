import prisma from "@/app/api/database";
import { auth } from "@/lib/auth";
import UserSchema from "@/schemas/account";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

export const PATCH = auth(async function PATCH(
  req,
  { params }: { params?: { id?: string } }
) {
  if (req.auth?.user.id !== params?.id || req.auth?.user.role !== "ADMIN")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const payload: z.infer<typeof UserSchema.changePassword> = await req.json();
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params?.id || "") },
  });
  if (!user) return Response.json({ message: "Not Found" }, { status: 404 });
  const isValid = await bcrypt.compare(payload.currentPassword, user.password);
  if (!isValid)
    return Response.json({ message: "Wrong password" }, { status: 400 });
  const password = await bcrypt.hash(payload.password, 10);
  const data = await prisma.user.update({
    where: { id: parseInt(params?.id || "") },
    data: { password },
    omit: { password: true },
  });

  return Response.json({ message: "Password update successfully", data });
});
