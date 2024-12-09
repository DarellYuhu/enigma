import { useQuery } from "@tanstack/react-query";

const useTwitterInfo = (projectId?: string) => {
  return useQuery({
    queryKey: ["twitterInfo", "", projectId],
    queryFn: async () => {
      const response = await fetch(`/api/v1/twitter/${projectId}`);
      const data: TwitterInfo = await response.json();
      return data;
    },
    enabled: !!projectId,
  });
};
export type TwitterInfo = {
  projectId: string;
  projectName: string;
  status: string;
  keywords: string;
};

export default useTwitterInfo;
