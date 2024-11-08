import { getScatterTopics } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

const useTwitterScatterTopics = (payload: { project: string; date: Date }) => {
  return useQuery({
    queryKey: ["twitterScatterTopics", payload.project],
    queryFn: () => getScatterTopics(payload),
  });
};

export default useTwitterScatterTopics;
