import { useQuery } from "@tanstack/react-query";

type Project = {
  projectId: string;
  projectName: string;
  status: string;
  created: Date;
  lastUpdate: Date;
  numVideos: number;
};

export function useTiktokProject({ project }: { project?: Project | null }) {
  return useQuery({
    queryKey: ["project", project?.projectId],
    enabled: !!project?.projectId,
    queryFn: async () => {
      const response = await fetch(`/api/v1/tiktok/${project?.projectId}`);
      const data: GetProjectResult = await response.json();
      return data;
    },
  });
}
