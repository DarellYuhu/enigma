import { VisData } from "@/components/VisGraph";
import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

const useYoutubeChannelNet = (payload: {
  projectId: string;
  window: number;
}) => {
  return useQuery({
    queryKey: ["youtube", "channelNet", payload.projectId, payload.window],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/youtube/${payload.projectId}/channel-net?window=${payload.window}`
      );
      const data: ChannelNetwork = await response.json();
      const classes = Array.from(
        new Set(data.network.nodes.map((node) => node.class))
      );
      const colors = generateNodeColors(classes);
      const maxValue = data.network.nodes.sort(
        (a, b) => b.centrality - a.centrality
      )[0].centrality;
      const normalized: VisData<Node, Edge> = {
        nodes: data.network.nodes.map((node) => ({
          id: node.id,
          label: node.title,
          shape: "dot",
          color: colors[node.class],
          size: Math.sqrt(1 - Math.pow(node.centrality / maxValue - 1, 2)) * 10,
          font: {
            size:
              Math.sqrt(1 - Math.pow(node.centrality / maxValue - 1, 2)) * 15,
          },
          data: node,
        })),
        edges: data.network.edges
          .map((edge) => ({
            data: edge,
            from: edge.from,
            to: edge.to,
            color: (edge.is_backbone === 0 && "#FFFFFF00") as string,
            value: edge.value,
          }))
          .filter((link) => link.data.is_backbone !== 0),
      };
      return { data, normalized };
    },
  });
};

type Node = {
  id: string;
  title: string;
  centrality: number;
  class: string; // <-- possible a number
};

type Edge = {
  from: string;
  to: string;
  value: number;
  is_backbone: number;
};

type ChannelNetwork = {
  network: {
    nodes: Node[];
    edges: Edge[];
  };
};

export default useYoutubeChannelNet;
