import updateYoutube from "@/schemas/youtube/updateProject";
import { z } from "zod";

const patchProjectConfig = async (payload: z.infer<typeof updateYoutube>) => {
  const response = await fetch(
    `/api/v1/youtube/projects/${payload.projectId}/config`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export default patchProjectConfig;
