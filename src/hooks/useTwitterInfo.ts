import { getProjectInfo } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

const useTwitterInfo = (projectId?: string) => {
  return useQuery({
    queryKey: ["twitterInfo", "", projectId],
    queryFn: () => getProjectInfo(projectId),
    enabled: !!projectId,
  });
};

export default useTwitterInfo;
