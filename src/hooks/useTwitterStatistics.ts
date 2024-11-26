import adjustDateByFactor from "@/utils/adjustDateByFactor";
import { useQuery } from "@tanstack/react-query";

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
        `/api/v2/twitter/${payload.projectId}/statistics?since=${
          payload.since?.toISOString().split("T")[0]
        }&until=${
          adjustDateByFactor(1, payload.until!).toISOString().split("T")[0]
        }&string=${payload.string}`
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
