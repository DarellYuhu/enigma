import { useQuery } from "@tanstack/react-query";

export function useYoutubeProjects() {
  return useQuery({
    queryKey: ["youtube", "projects"],
    queryFn: async () => {
      const response = await fetch("/api/v1/youtube/projects");
      const data: Data = await response.json();
      const projects = await Promise.all(
        data.projects.map((item) => getProjectInfo(item.projectID))
      );
      return {
        projects: data.projects.map((item) => ({
          ...item,
          ...projects.find((project) => project.projectID === item.projectID),
        })),
      };
    },
  });
}

export const getProjectInfo = async (projectId: string) => {
  const response = await fetch(`/api/v1/youtube/projects/${projectId}/info`);
  const data: YoutubeProjectInfo = await response.json();
  return data;
};

type Data = {
  projects: YoutubeProject[];
};
