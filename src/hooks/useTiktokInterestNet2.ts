import { COLORS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Payload = { projectId: string; window: number; date: Date };

const queryFn = async (payload: Payload) => {
  const response = await fetch(
    `/api/v2/tiktok/${payload.projectId}/interest-network?window=${
      payload.window
    }&date=${format(payload.date, "yyyy-MM-dd")}`
  );
  const data: InterestNetwork2 = await response.json();
  const nodes = data.network.nodes.map((node) => ({
    id: node.id,
    label: node.author_name,
    fill: COLORS[parseInt(node.class)],
    data: node,
  }));
  const normalized = {
    ...data,
    network: {
      nodes,
      links: data.network.edges.map((edge, index) => ({
        id: index.toString(),
        source: edge.from,
        target: edge.to,
        fill: nodes.find((node) => node.id === edge.from)?.fill,
        data: edge,
      })),
    },
    hashtags: Object.entries(data.classes)
      .map(([key, item], index) => ({
        ...item,
        contents: data.network.nodes.filter((node) => node.class === key),
        id: key,
        color: COLORS[index],
        hashtags: item.hashtags
          ? item.hashtags.hashtags.map((tag, index) => ({
              hashtag: tag,
              value: item.hashtags!.values[index],
              color: COLORS[index],
            }))
          : undefined,
      }))
      .filter((item) => !!item.representation),
  };
  return { data, normalized };
};

const useTiktokInterestNet2 = (payload: Payload) => {
  return useQuery({
    queryKey: [
      "tiktok",
      "interest-network",
      "v2",
      payload.projectId,
      payload.window,
      payload.date,
    ],
    queryFn: () => queryFn(payload),
  });
};

export type InterestNetwork2 = {
  date?: string;
  classes: Record<
    number,
    {
      representation: string;
      summary: string;
      topics: string;
      num_contents: number;
      num_authors: number;
      total_views: number;
      total_likes: number;
      total_comments: number;
      total_shares: number;
      tone_positive: number;
      tone_negative: number;
      tone_neutral: number;
      hashtags?: {
        hashtags: string[];
        values: number[];
      };
      top_authors: {
        author_id: string;
        author_name: string;
        play: number;
      }[];
    }
  >;
  network: {
    edges: {
      from: string;
      to: string;
      value: 4;
    }[];
    nodes: {
      class: string;
      id: string;
      desc: string;
      published_at: string;
      author_id: string;
      author_name: string;
      play: number;
      like: number;
      share: number;
      comment: number;
      centrality_pr: number; // <-- PageRank
      centrality_bw: number; // <-- Betweenness
      centrality_dg: number; // <-- Degree
    }[];
  };
};

export type GetInterestGraphs = Awaited<ReturnType<typeof queryFn>>;

export default useTiktokInterestNet2;
