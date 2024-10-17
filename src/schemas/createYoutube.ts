import { string, z } from "zod";

const createYoutube = z.object({
  projectName: z.string().trim().min(1, { message: "Required" }),
  APIs: z.string().trim().min(1, { message: "Required" }),
  keywords: z.string().trim().min(1, { message: "Required" }),
  languageCode: z.string().trim().min(1, { message: "Required" }),
  regionCode: z.string().trim().min(1, { message: "Required" }),
  runEvery: z.number(),
  backtrackSince: z.number(),
  getDetailsAfter: z.number(),
  monitorTopVideosEvery: z.number(),
});

export default createYoutube;
