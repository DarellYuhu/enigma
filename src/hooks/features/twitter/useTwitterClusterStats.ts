import { useQuery } from "@tanstack/react-query";

type Payload = {
  projectId: string;
  since: string;
  until: string;
  string: string;
};

export default function useTwitterClusterStats(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "cluster-stats", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${payload.projectId}/cluster-statistics?since=${payload.since}&until=${payload.until}&string=${payload.string}`
      );

      const data: ClusterStats = await response.json();
      const normalized = data.ts.date.map((date, index) => ({
        date,
        num_cc: data.ts.num_cc[index],
        num_clusters: data.ts.num_clusters[index],
        num_clusters_gc: data.ts.num_clusters_gc[index],
      }));
      return { data, normalized };
    },
    enabled: !!payload.since && !!payload.until,
  });
}

export type ClusterStats = {
  ts: {
    date: string[];
    num_cc: number[];
    num_clusters: number[];
    num_clusters_gc: number[];
  };
};
