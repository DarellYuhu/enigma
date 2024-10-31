import prisma from "@/app/api/database";
import { auth } from "@/lib/auth";
import * as bcrypt from "bcryptjs";

export const PATCH = auth(async function PATCH(
  request,
  { params }: { params?: { id?: string } }
) {
  if (request.auth?.user.role !== "ADMIN")
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params?.id || "") },
  });
  if (!user) return Response.json({ message: "Not Found" }, { status: 404 });
  const password = await bcrypt.hash("123456", 10);
  const data = await prisma.user.update({
    where: { id: parseInt(params?.id || "") },
    data: { password },
    omit: { password: true },
  });
  return Response.json({ message: "Password update successfully", data });
});
