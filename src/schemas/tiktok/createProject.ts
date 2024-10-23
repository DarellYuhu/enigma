import { z } from "zod";

const createProject = z.object({
  projectName: z.string().trim().min(1, "Required"),
  keywords: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((val) => val.split(",").length > 0, {
      message: "Keywords must be separated by comma",
    }),
});

export default createProject;
