import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";

const useTwitterHashtagEvo = (payload: {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
}) => {
  return useQuery({
    queryKey: ["twitterHashtagEvo", payload.project],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${
          payload.project
        }/hashtag-evo?since=${payload.since?.toISOString()}&until=${adjustDateByFactor(
          1,
          payload.until!
        )?.toISOString()}&string=${payload.string}`
      );
      const data: HashtagEvolution = await response.json();
      return data;
    },
  });
};

export type HashtagEvolution = {
  flow: { from: string; to: string; flow: number }[];
  thread: Record<string, { class: string; window: number }>;
  window: Record<string, string>; // <-- T is this format 2024-11-05
};

export default useTwitterHashtagEvo;
