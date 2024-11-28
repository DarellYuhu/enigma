import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

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
        }&since=${payload.since.toISOString().split("T")[0]}&until=${
          payload.until.toISOString().split("T")[0]
        }&details=${payload.details}`
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
          };
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
          };
        }),
      };
      return { data, normalized, colors, keys };
    },
  });
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
