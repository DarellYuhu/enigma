export const createProject = async (payload: {
  projectName: string;
  keywords: string;
}) => {
  const response = await fetch("/api/v1/twitter/", {
    method: "POST",
    body: JSON.stringify(payload),
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
  const data = await response.json();
  return data;
};

export const getProjects = async () => {
  const response = await fetch("/api/v1/twitter");
  const data: TTwitterProjects = await response.json();
  return data;
};

export type TTwitterProjects = {
  projects: {
    projectId: string;
    projectName: string;
    status: string;
    created: Date;
    lastUpdate: Date;
    numVideos: number;
  }[];
};
