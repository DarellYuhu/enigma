import { z } from "zod";

const updateProject = z.object({
  projectId: z.string().trim().min(1, "Required"),
  APIs: z.string().trim().min(1, "Required"),
  keywords: z.string().trim().min(1, "Required"),
  languageCode: z.string().trim().min(1, "Required"),
  regionCode: z.string().trim().min(1, "Required"),
  runEvery: z.number(),
  getDetailsAfter: z.number(),
  monitorTopVideosEvery: z.number(),
  status: z.boolean(),
});

export default updateProject;
