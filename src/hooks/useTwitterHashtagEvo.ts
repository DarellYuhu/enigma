import { getHashtagEvolution } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

const useTwitterHashtagEvo = (payload: {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  return useQuery({
    queryKey: ["twitterHashtagEvo", payload.project],
    queryFn: () => getHashtagEvolution(payload),
  });
};

export default useTwitterHashtagEvo;
