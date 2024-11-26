import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  since: Date;
  until: Date;
};
export default function useGlobalEvolution(payload: Payload) {
  return useQuery({
    queryKey: [
      "tiktok",
      "global-evolution",
      payload.since.toISOString().split("T")[0],
      payload.until.toISOString().split("T")[0],
    ],
    queryFn: async () => {
      console.log("when fetch", payload.until);
      const response = await fetch(
        `/api/v2/tiktok/evolution?since=${
          payload.since.toISOString().split("T")[0]
        }&until=${
          adjustDateByFactor(1, payload.until).toISOString().split("T")[0]
        }`
      );
      const data: GlobalEvolutionData = await response.json();
      return data;
    },
  });
}

export type GlobalEvolutionData = {
  flow: { from: string; to: string; flow: number }[];
  thread: Record<string, { class: string; window: number }>;
  class: Record<string, string>;
  window: Record<string, string>;
};
