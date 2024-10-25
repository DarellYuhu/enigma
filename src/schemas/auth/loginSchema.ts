import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required").min(6, "Minimal 6 character"),
});

export default loginSchema;
