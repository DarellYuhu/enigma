import { CosmosLink, CosmosNode } from "@/components/Graph";
import { COLORS } from "@/constants";
import { CosmographData } from "@cosmograph/react";
import { useQuery } from "@tanstack/react-query";

const useTwitterAccountNetwork = (payload: {
  project: string;
  window: string;
}) => {
  return useQuery({
    queryKey: ["twitter", "account-network", payload.project],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${payload.project}/account-network?&window=${payload.window}`
      );
      const data: AccountNetwork = await response.json();
      const MAX_CENTRALITY = data.network.nodes.sort(
        (item) => item.centrality
      )[0].centrality;
      const nodes = data.network.nodes.map((node) => ({
        data: node,
        fill: COLORS[parseInt(node.class)] ?? "#808080",
        id: node.user_id,
        label: node.user_screen_name,
        size: node.centrality / MAX_CENTRALITY,
      }));
      const normalized: CosmographData<CosmosNode, CosmosLink> = {
        links: data.network.edges.map((edge) => ({
          data: edge,
          source: edge.from,
          target: edge.to,
        })),
        nodes,
      };
      return { data, normalized };
    },
  });
};
export type AccountNetwork = {
  network: {
    nodes: {
      user_id: string;
      user_screen_name: string;
      user_name: string;
      user_description: string;
      num_followers: number;
      centrality: number;
      class: string; // <-- a number
    }[];
    edges: {
      from: string;
      to: string;
      tone: number;
      weight: number;
    }[];
  };
};

export default useTwitterAccountNetwork;
