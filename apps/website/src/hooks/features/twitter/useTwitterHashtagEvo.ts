import { useQuery } from "@tanstack/react-query";

const useTwitterHashtagEvo = (payload: {
  project: string;
  since?: string;
  until?: string;
  string: string;
}) => {
  return useQuery({
    queryKey: ["twitter", "hashtag-evo", payload.project, payload.until],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${payload.project}/hashtag-evo?since=${payload.since}&until=${payload.until}&string=${payload.string}`
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
