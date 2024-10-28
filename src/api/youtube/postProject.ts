import createYoutube from "@/schemas/youtube/createProject";
import { z } from "zod";

const postProject = async (paylaod: z.infer<typeof createYoutube>) => {
  const response = await fetch("/api/v1/youtube/projects", {
    method: "POST",
    body: JSON.stringify(paylaod),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to create project");
    }
    throw new Error("Failed to create project");
  }

  console.log("pass huhi");
  const data = await response.json();
  return data;
};

export default postProject;
