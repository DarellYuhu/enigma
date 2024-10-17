import createYoutube from "@/schemas/createYoutube";
import { z } from "zod";

const postProject = async (paylaod: z.infer<typeof createYoutube>) => {
  const response = await fetch("/api/v1/youtube/projects", {
    method: "POST",
    body: JSON.stringify(paylaod),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export default postProject;
