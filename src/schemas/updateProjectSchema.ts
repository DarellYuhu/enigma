import { z } from "zod";

const updateProjectSchema = z.object({
  projectId: z.string().optional(),
  keywords: z.string().optional(),
  status: z.boolean().optional(),

  // added for accessibility only
  currentKeywords: z.string().optional(),
});

export default updateProjectSchema;
