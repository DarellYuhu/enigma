import { Role } from "@prisma/client";
import { z } from "zod";

const create = z
  .object({
    username: z
      .string()
      .min(1, "Required")
      .refine((s) => !s.includes(" "), "No Spaces!"),
    password: z.string().min(6, "Min 6 Character"),
    confirmPassword: z.string().min(1, "Required"),
    displayName: z.string().min(1, "Required"),
    role: z.nativeEnum(Role),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default create;
