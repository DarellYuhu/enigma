import { VisData } from "@/components/VisGraph";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  category: string;
  date: "";
  window: number;
  rid: string;
};
export default function useActorNetwork(payload: Payload) {
  return useQuery({
    queryKey: ["trends", "actor-network", payload.rid],
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
            shape: "text",
            id: node.key,
            label: node.name,
            data: node,
          })),
      };
      return { data, normalized };
    },
  });
}

type ActorNetwork = {
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
    apl: number[];
    date: string[];
    largest_eig: number[];
    largest_eig_pct: number[];
  };
};
