import { COLORS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (payload: { projectId: string; window: number }) => {
  const response = await fetch(
    `/api/v2/tiktok/${payload.projectId}/interest-network?window=${payload.window}`
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
    hashtags: Object.values(data.classes)
      .map((item, index) => ({
        ...item,
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

const useTiktokInterestNet2 = (payload: {
  projectId: string;
  window: number;
}) => {
  return useQuery({
    queryKey: [
      "tiktok",
      "interest-network",
      "v2",
      payload.projectId,
      payload.window,
    ],
    queryFn: () => queryFn(payload),
  });
};

export type InterestNetwork2 = {
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
      centrality: number;
    }[];
  };
};

export type GetInterestGraphs = Awaited<ReturnType<typeof queryFn>>;

export default useTiktokInterestNet2;
