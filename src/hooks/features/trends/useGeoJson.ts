import { useQuery } from "@tanstack/react-query";

type Payload = {
  category: string;
  since?: string;
  until?: string;
};
export default function useGeoJson(payload: Payload) {
  return useQuery({
    queryKey: ["trends", "geo-json", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/trends/geo-json?category=${payload.category}&since=${payload.since}&until=${payload.until}`
      );
      const data: GeoJson = await response.json();
      return data;
    },
    enabled: !!payload.since && !!payload.until && !!payload.category,
  });
}

type PctData = {
  key: string; // <-- a number
  name: string;
  value: number;
  rank: number;
};

export type GeoJson = {
  pct_data: {
    "1d": PctData[];
    "1w": PctData[];
    "1m": PctData[];
  };
  pct_total: PctData[];
  region: string;
  rid: string;
}[];
