import { CosmosLink, CosmosNode } from "@/components/Graph";
import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  projectId: string;
  date: Date;
  Window: number;
};

export default function useTwitterAccountNet(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "account-net", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${payload.projectId}/account-net?date=${
          payload.date.toISOString().split("T")[0]
        }&window=${payload.Window}`
      );
      const data: AccountNetwork = await response.json();
      const classes = Object.keys(data.classes);
      const colors = generateNodeColors(classes);
      const MAX_CENTRALITY_PR = data.network.nodes.sort(
        (a, b) => b.centrality_pr - a.centrality_pr
      )[0].centrality_pr;
      const normalized: {
        network: {
          nodes: CosmosNode[];
          links: CosmosLink[];
        };
        classes: (AccountNetwork["classes"][0] & {
          id: string;
          color: string;
        })[];
      } = {
        network: {
          nodes: data.network.nodes.map((node) => ({
            data: node,
            fill: colors[node.class],
            id: node.user_id,
            label: node.user_name,
            size:
              Math.sqrt(
                1 - Math.pow(node.centrality_pr / MAX_CENTRALITY_PR - 1, 2)
              ) * 50,
          })),
          links: data.network.edges.map((link) => ({
            data: link,
            source: link.from,
            target: link.to,
            // fill: colors[
            //   data.network.nodes.find((item) => item.user_id === link.from)
            //     ?.class || ""
            // ],
          })),
        },
        classes: Object.entries(data.classes).map(([key, value]) => ({
          ...value,
          id: key,
          color: colors[key],
        })),
      };
      return { data, normalized };
    },
  });
}

type AccountNetwork = {
  date: string; // <-- YYYY-MM-DD
  classes: Record<
    number,
    {
      representation: string;
      summary: string;
      topics: string;
      num_contents: number;
      num_authors: number;
      total_views: number;
      total_retweets: number;
      total_replies: number;
      total_favorites: number;
      total_bookmarks: number;
      tone_positive: number;
      tone_negative: number;
      tone_neutral: number;
    }
  >;
  network: {
    nodes: {
      user_id: string;
      user_screen_name: string;
      user_name: string;
      user_description: string;
      num_followers: number;
      centrality_pr: number;
      centrality_bw: number;
      centrality_dg: number;
      class: string; // <-- posible a number
    }[];
    edges: {
      from: string;
      to: string;
      weight: number;
      tone: number;
    }[];
  };
};
