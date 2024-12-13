import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().trim().optional(),
  textColor: z.string().trim().optional(),
  bgColor: z.string().trim().optional(),
  users: z
    .array(
      z.object({
        id: z.string().trim().min(1, "Required"),
      })
    )
    .min(1, "User is Required"),
});

const update = z.object({
  name: z.string().trim().min(1, "Required"),
  description: z.string().trim().optional(),
  textColor: z.string().trim().optional(),
  bgColor: z.string().trim().optional(),
  users: z
    .array(
      z.object({
        id: z.string().trim().min(1, "Required"),
      })
    )
    .min(1, "User is Required"),
});

export type CreateWorkspace = z.infer<typeof create>;
export type UpdateWorkspace = z.infer<typeof update>;

const WorkspaceSchema = { create, update };

export default WorkspaceSchema;
