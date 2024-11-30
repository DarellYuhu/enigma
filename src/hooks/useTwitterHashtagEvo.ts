import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const useTwitterHashtagEvo = (payload: {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  return useQuery({
    queryKey: ["twitterHashtagEvo", payload.project, payload.until],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${payload.project}/hashtag-evo?since=${format(
          payload.since!,
          "yyyy-MM-dd"
        )}&until=${format(
          adjustDateByFactor(1, payload.until!),
          "yyyy-MM-dd"
        )}&string=${payload.string}`
      );
      const data: HashtagEvolution = await response.json();
      return data;
    },
  });
};

export type HashtagEvolution = {
  flow: { from: string; to: string; flow: number }[];
  thread: Record<string, { class: string; window: number }>;
  class?: Record<string, string>;
  window: Record<string, string>; // <-- T is this format 2024-11-05
};

export default useTwitterHashtagEvo;
