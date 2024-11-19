import { VisData } from "@/components/VisGraph";
import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

const useTiktokGlobalClusters = (payload: { window: number }) => {
  return useQuery({
    queryKey: ["tiktok", "global", "cluster"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/tiktok/cluster?window=${payload.window}`
      );
      const data: ClusterTrends = await response.json();
      const classes = Array.from(
        new Set(data.network.nodes.map((item) => item.class))
      );
      const colors = generateNodeColors(classes);
      const nodes = data.network.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        shape: "dot",
        color: colors[node.class],
        data: node,
      }));
      const normalized: VisData<
        ClusterTrends["network"]["nodes"][0],
        ClusterTrends["network"]["edges"][0]
      > = {
        nodes,
        edges: data.network.edges.map((edge) => ({
          data: edge,
          from: edge.from,
          to: edge.to,
          color: (edge.is_backbone === 0 && "#FFFFFF00") as string,
        })),
      };
      return { data, normalized };
    },
    throwOnError: true,
  });
};

export type ClusterTrends = {
  date: string; // <-- YYYY-MM-DD
  network: {
    edges: {
      from: string;
      to: string;
      value: number;
      is_backbone: number;
    }[];
    nodes: {
      id: string;
      label: string;
      num_contents: number;
      num_authors: number;
      num_audience: number;
      total_views: number;
      total_likes: number;
      total_comments: number;
      total_shares: number;
      centrality: number;
      class: string; // probably a number
    }[];
  };
};

export default useTiktokGlobalClusters;
