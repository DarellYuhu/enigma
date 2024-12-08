import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().trim().optional(),
  users: z
    .array(
      z.object({
        id: z.string().trim().min(1, "Required"),
      })
    )
    .min(1, "User is Required"),
});

const WorkspaceSchema = { create };

export default WorkspaceSchema;
