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
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to update project config");
    }
    throw new Error("Failed to update project config");
  }
  const data = await response.json();
  return data;
};

export default patchProjectConfig;
