import { getBoards } from "@/api/twitterApi";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
};

const useTwitterBoards = (payload: Payload) => {
  return useQuery({
    queryFn: () => getBoards(payload),
    queryKey: ["twitter", "boards", payload.project, payload.string],
  });
};

export default useTwitterBoards;
