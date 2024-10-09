type result = {
  projects: {
    projectId: string;
    projectName: string;
    status: string;
    created: Date;
    lastUpdate: Date;
    numVideos: number;
  }[];
};

export default async function getProjects(payload: {
  type: "listAllProjects" | "listActiveProjects" | "getProjectInfo";
}): Promise<result> {
  const response = await fetch("/api/v1/project/cat", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
