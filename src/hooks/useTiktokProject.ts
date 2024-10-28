import { getProject } from "@/api/tiktokApi";
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
    queryFn: () => getProject({ projectId: project?.projectId }),
    enabled: !!project?.projectId,
  });
}
