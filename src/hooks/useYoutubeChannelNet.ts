import { VisData } from "@/components/VisGraph";
import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

const useYoutubeChannelNet = (payload: {
  projectId: string;
  window: number;
  date: Date;
}) => {
  return useQuery({
    queryKey: [
      "youtube",
      "channelNet",
      payload.projectId,
      payload.window,
      payload.date,
    ],
    queryFn: async () => {
      console.log(payload.date, payload.date.toISOString());
      const response = await fetch(
        `/api/v2/youtube/${payload.projectId}/channel-net?date=${
          payload.date.toISOString().split("T")[0]
        }&window=${payload.window}`
      );
      const data: ChannelNetwork = await response.json();
      if (data.network.nodes.length === 0) return null;
      const classes = Array.from(
        new Set(data.network.nodes.map((node) => node.class))
      );
      const colors = generateNodeColors(classes);
      const maxValue = data.network.nodes.sort(
        (a, b) => b.centrality_pr - a.centrality_pr
      )[0].centrality_pr;
      const normalized: VisData<Node, Edge> = {
        nodes: data.network.nodes.map((node) => ({
          id: node.id,
          label: node.title,
          shape: "dot",
          color: colors[node.class],
          size:
            Math.sqrt(1 - Math.pow(node.centrality_pr / maxValue - 1, 2)) * 10,
          font: {
            size:
              Math.sqrt(1 - Math.pow(node.centrality_pr / maxValue - 1, 2)) *
              15,
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
    throwOnError: true,
  });
};

type Node = {
  id: string;
  title: string;
  centrality_pr: number;
  centrality_bw: number;
  centrality_dg: number;
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
