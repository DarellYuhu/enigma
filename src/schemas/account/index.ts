import { z } from "zod";

const update = z.object({
  username: z
    .string()
    .min(1, "Required")
    .refine((s) => !s.includes(" "), "No Spaces!"),
  displayName: z.string().min(1, "Required"),
});

const changePassword = z
  .object({
    currentPassword: z.string().min(6, "Min 6 Character"),
    password: z.string().min(6, "Min 6 Character"),
    confirmPassword: z.string().min(1, "Required"),
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

const UserSchema = {
  update,
  changePassword,
};

export default UserSchema;
