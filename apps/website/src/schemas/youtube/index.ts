import { z } from "zod";

const create = z.object({
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

const update = z.object({
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

const YoutubeSchema = {
  create,
  update,
};

export default YoutubeSchema;
