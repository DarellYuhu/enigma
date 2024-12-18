import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Payload = {
  since: Date;
  until: Date;
};
export default function useGlobalEvolution(payload: Payload) {
  return useQuery({
    queryKey: [
      "tiktok",
      "global-evolution",
      format(payload.since, "yyyy-MM-dd"),
      format(payload.until, "yyyy-MM-dd"),
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/tiktok/evolution?since=${format(
          payload.since,
          "yyyy-MM-dd"
        )}&until=${format(adjustDateByFactor(1, payload.until), "yyyy-MM-dd")}`
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
