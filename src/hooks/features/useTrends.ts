import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Payload = {
  category: string;
  level: string;
  since: Date;
  until: Date;
  details: string;
};

export default function useTrends(payload: Payload) {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/trends?category=${payload.category}&level=${
          payload.level
        }&since=${format(payload.since, "yyyy-MM-dd")}&until=${format(
          payload.until,
          "yyyy-MM-dd"
        )}&details=${payload.details}`
      );
      const data: TrendsData = await response.json();
      const keys = data.dic.map((item) => item.key);
      const colors = Object.values(generateNodeColors(keys));
      const normalized = {
        day: data.data["1d"].datestr.map((date, index) => {
          const record = keys.reduce(
            (acc: Record<string, number>, curr: string) => {
              acc[curr] = parseFloat(
                data.data["1d"].data[curr][index].toFixed(3)
              );
              return acc;
            },
            {}
          );
          return {
            date,
            ...record,
          };
        }),
        week: data.data["1w"].datestr.map((date, index) => {
          const record = keys.reduce(
            (acc: Record<string, number>, curr: string) => {
              acc[curr] = parseFloat(
                data.data["1w"].data[curr][index].toFixed(3)
              );
              return acc;
            },
            {}
          );
          return {
            date,
            ...record,
          } as NormalizedData;
        }),
        month: data.data["1m"].datestr.map((date, index) => {
          const record = keys.reduce(
            (acc: Record<string, number>, curr: string) => {
              acc[curr] = parseFloat(
                data.data["1m"].data[curr][index].toFixed(3)
              );
              return acc;
            },
            {}
          );
          return {
            date,
            ...record,
          } as NormalizedData;
        }),
      };
      const latestMonthly = normalized.month.slice(-2);
      const rankMonthly = data.dic
        .map((item) => ({
          key: item.key,
          name: item.name,
          prev: ((latestMonthly[0][item.key] as number) * 100).toFixed(2),
          curr: ((latestMonthly[1][item.key] as number) * 100).toFixed(2),
        }))
        .sort((a, b) => parseFloat(b.curr) - parseFloat(a.curr))
        .map((item, index) => ({
          ...item,
          rank: index + 1,
          diff: (parseFloat(item.curr) - parseFloat(item.prev)).toFixed(2),
        }));

      const latestWeekly = normalized.week.slice(-2);
      const rankWeekly = data.dic
        .map((item) => ({
          key: item.key,
          name: item.name,
          prev: ((latestWeekly[0][item.key] as number) * 100).toFixed(2),
          curr: ((latestWeekly[1][item.key] as number) * 100).toFixed(2),
        }))
        .sort((a, b) => parseFloat(b.curr) - parseFloat(a.curr))
        .map((item, index) => ({
          ...item,
          rank: index + 1,
          diff: (parseFloat(item.curr) - parseFloat(item.prev)).toFixed(2),
        }));
      const rank = { rankMonthly, rankWeekly };
      return { data, normalized, colors, rank };
    },
  });
}

interface NormalizedData {
  [key: string]: number | string;
}

type Data = {
  data: Record<string, number[]>;
  date: number[];
  datestr: string[];
};

type TrendsData = {
  dic: {
    key: string; // <-- a number
    name: string;
    pcol: string; // <-- a color
    pct: number;
  }[];
  data: { "1d": Data; "1m": Data; "1w": Data };
};
