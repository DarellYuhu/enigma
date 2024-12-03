import { z } from "zod";

const create = z.object({
  workspaceId: z.string().trim().min(1, "Required"),
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  sectionId: z.string().trim().min(1, "Required"),
  links: z.array(
    z.object({
      label: z.string().trim().min(1, "Required"),
      url: z.string().url("Invalid URL").min(1, "Required"),
    })
  ),
});

const ProjectSchema = {
  create,
};

export default ProjectSchema;
