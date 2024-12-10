import { z } from "zod";

const create = z.object({
  workspaceId: z.string().trim().min(1, "Required"),
  title: z.string().trim().min(1, "Required"),
  textColor: z.string().trim().optional(),
  gradientBgColor: z.string().trim().optional(),
  description: z.string().trim().min(1, "Required"),
  sectionId: z.string().trim().min(1, "Required"),
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Must be an image file",
  }),
  links: z.array(
    z.object({
      label: z.string().trim().min(1, "Required"),
      url: z.string().url("Invalid URL").min(1, "Required"),
      textColor: z.string().trim().optional(),
      buttonColor: z.string().trim().optional(),
    })
  ),
});

const ProjectSchema = {
  create,
};

export default ProjectSchema;
