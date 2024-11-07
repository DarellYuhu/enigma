import { getTagRelationGraph } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

type Props = {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
};

const useTwitterHashtagNet = (payload: Props) => {
  return useQuery({
    queryFn: () => getTagRelationGraph(payload),
    queryKey: ["twitter", "tag-relation-network", payload.project],
  });
};

export default useTwitterHashtagNet;
