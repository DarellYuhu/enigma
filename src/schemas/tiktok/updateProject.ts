import { z } from "zod";

const updateProject = z.object({
  projectId: z.string().optional(),
  keywords: z.string().optional(),
  status: z.boolean().optional(),

  // added for accessibility only
  currentKeywords: z.string().optional(),
});

export default updateProject;
