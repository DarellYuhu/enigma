import { CosmosLink, CosmosNode } from "@/components/Graph";
import { COLORS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useYoutubeVideoNet = (payload: {
  projectId: string;
  window: number;
  date: string;
}) => {
  return useQuery({
    queryKey: [
      "youtube",
      "video-net",
      payload.projectId,
      payload.window,
      payload.date,
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/youtube/${payload.projectId}/video-net?date=${payload.date}&window=${payload.window}`
      );
      const data: VideoNetwork = await response.json();
      const nodes = data.network.nodes.map((node) => ({
        data: node,
        fill: COLORS[parseInt(node.class, 10)],
        id: node.id,
        label: node.author_name,
      }));
      const classesWithVideos = Object.values(
        Object.entries(data.classes).reduce(
          (
            acc: Record<
              string,
              Class & { videos: NodeVideoNetwork[]; colors: string }
            >,
            [key, value]
          ) => {
            acc[key] = {
              ...value,
              videos: data.network.nodes.filter((node) => node.class === key),
              colors: COLORS[parseInt(key, 10)],
            };
            return acc;
          },
          {}
        )
      );
      const normalized: {
        nodes: CosmosNode[];
        links: CosmosLink[];
      } = {
        nodes,
        links: data.network.edges.map((edge, index) => ({
          data: edge,
          source: edge.from,
          target: edge.to,
          fill: nodes.find((node) => node.id === edge.from)?.fill,
          id: index.toString(),
        })),
      };
      return { data, normalized, classesWithVideos };
    },
  });
};

export type NodeVideoNetwork = {
  title: string;
  class: string; // <-- possible a number
  id: string;
  desc: string;
  published_at: Date;
  author_id: string;
  author_name: string;
  play: number;
  like: number;
  comment: number;
  centrality_pr: number;
  centrality_bw: number;
  centrality_dg: number;
};

type Class = {
  representation: string;
  summary: string;
  topics: string;
  num_contents: number;
  num_authors: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  tone_positive: number;
  tone_negative: number;
  tone_neutral: number;
};

type VideoNetwork = {
  classes: Record<number, Class>;
  network: {
    nodes: NodeVideoNetwork[];
    edges: {
      from: string;
      to: string;
      value: number;
    }[];
  };
};

export default useYoutubeVideoNet;
