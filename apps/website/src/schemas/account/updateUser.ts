import { Role } from "@prisma/client";
import { z } from "zod";

const updateUser = z.object({
  username: z
    .string()
    .min(1, "Required")
    .refine((s) => !s.includes(" "), "No Spaces!"),
  displayName: z.string().min(1, "Required"),
  role: z.nativeEnum(Role),
});
export default updateUser;
