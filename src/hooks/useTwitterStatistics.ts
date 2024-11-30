import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Payload = {
  projectId: string;
  since?: Date;
  until?: Date;
  string: string;
};

export default function useTwitterStatistics(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "statistics", payload.projectId],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${payload.projectId}/statistics?since=${format(
          payload.since!,
          "yyyy-MM-dd"
        )}&until=${format(
          adjustDateByFactor(1, payload.until!),
          "yyyy-MM-dd"
        )}&string=${payload.string}`
      );
      const data: TwitterStatistics = await response.json();
      const periods = ["daily", "weekly", "monthly"] as const;
      const normalized = periods.reduce((acc, period) => {
        acc[period] = data.ts[period].date.map((date, index) => ({
          date,
          authors: data.ts[period].authors[index],
          tweets: data.ts[period].tweets[index],
        }));
        return acc;
      }, {} as Record<(typeof periods)[number], { date: string; authors: number; tweets: number }[]>);

      return { data, normalized };
    },
  });
}

type Item = {
  date: string[]; // <-- YYYY-MM-DD
  authors: number[];
  tweets: number[];
};

export type TwitterStatistics = {
  ts: {
    daily: Item;
    weekly: Item;
    monthly: Item;
  };
};
