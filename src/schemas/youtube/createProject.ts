import { z } from "zod";

const createProject = z.object({
  projectName: z.string().trim().min(1, { message: "Required" }),
  APIs: z.string().trim().min(1, { message: "Required" }),
  keywords: z.string().trim().min(1, { message: "Required" }),
  languageCode: z.string().trim().min(1, { message: "Required" }),
  regionCode: z.string().trim().min(1, { message: "Required" }),
  runEvery: z.preprocess((val) => parseInt(val as string), z.number()),
  backtrackSince: z.preprocess((val) => parseInt(val as string), z.number()),
  getDetailsAfter: z.preprocess((val) => parseInt(val as string), z.number()),
  monitorTopVideosEvery: z.preprocess(
    (val) => parseInt(val as string),
    z.number()
  ),
});

export default createProject;
