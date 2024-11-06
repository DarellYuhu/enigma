import { getProjects } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

const useTwitterProjects = () => {
  return useQuery({
    queryKey: ["projects", "twitter"],
    queryFn: getProjects,
  });
};

export default useTwitterProjects;
