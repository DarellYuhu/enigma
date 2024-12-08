import { useQuery } from "@tanstack/react-query";

type Payload = {
  projectId: string;
  since?: string;
  until?: string;
  string: string;
};

export default function useTwitterStatistics(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "statistics", payload.projectId, payload.until],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${payload.projectId}/statistics?since=${payload.since}&until=${payload.until}&string=${payload.string}`
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
