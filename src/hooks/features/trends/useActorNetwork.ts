import { VisData } from "@/components/VisGraph";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  category: string;
  date: string;
  window: number;
  rid: string;
};
export default function useActorNetwork(payload: Payload) {
  return useQuery({
    queryKey: [
      "trends",
      "actor-network",
      payload.rid,
      payload.date,
      payload.window,
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/trends/actor-net?category=${payload.category}&date=${payload.date}&window=${payload.window}&rid=${payload.rid}`
      );
      const data: ActorNetwork = await response.json();
      const normalized: VisData = {
        edges: data.network.edges.map((edge) => ({
          data: edge,
          from: edge.from,
          to: edge.to,
        })),
        nodes: data.network.nodes
          .filter((item) => item.is_mst !== 0)
          .map((node) => ({
            shape: "dot",
            id: node.key,
            label: node.name,
            data: node,
            color: "#1d4ed8",
          })),
      };
      const statistics = data.statistics.date.map((item, index) => ({
        date: item,
        apl: data.statistics.apl[index],
        largest_eig: data.statistics.largest_eig[index],
        largest_eig_pct: data.statistics.largest_eig_pct[index] * 100,
      }));
      const centrality = data.network.nodes
        .sort((a, b) => b.centrality - a.centrality)
        .slice(0, 10);
      return { data, normalized, centrality, statistics };
    },
  });
}

export type ActorNetwork = {
  date: string;
  network: {
    edges: {
      from: string;
      to: string;
      value: number;
    }[];
    nodes: {
      key: string;
      name: string;
      centrality: number;
      is_mst: number;
    }[];
  };
  statistics: {
    date: string[];
    apl: number[];
    largest_eig: number[];
    largest_eig_pct: number[];
  };
};
