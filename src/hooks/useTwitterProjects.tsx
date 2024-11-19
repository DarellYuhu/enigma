import { useQuery } from "@tanstack/react-query";

const useTwitterProjects = () => {
  return useQuery({
    queryKey: ["projects", "twitter"],
    queryFn: async () => {
      const response = await fetch("/api/v1/twitter");
      const data: TTwitterProjects = await response.json();
      return data;
    },
  });
};
export type TTwitterProjects = {
  projects: {
    projectId: string;
    projectName: string;
    status: string;
    created: Date;
    lastUpdate: Date;
    numTweets: number;
  }[];
};

export default useTwitterProjects;
