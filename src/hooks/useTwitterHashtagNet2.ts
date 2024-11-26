import { VisData } from "@/components/VisGraph";
import generateNodeColors from "@/utils/generateNodeColors";
import { useQuery } from "@tanstack/react-query";

type Payload = {
  projectId: string;
  date: Date;
  window: number;
};

export default function useTwitterHashtagNet2(payload: Payload) {
  return useQuery({
    queryKey: ["twitter", "hashtag", "net", payload],
    queryFn: async () => {
      const response = await fetch(
        `/api/v2/twitter/${payload.projectId}/hashtag-net?date=${
          payload.date.toISOString().split("T")[0]
        }&window=${payload.window}`
      );
      const data: HashtagNetwork2 = await response.json();
      const classes = Object.keys(data.classes);
      const colors = generateNodeColors(classes);
      const nodes = data.network.nodes.map((node) => ({
        data: node,
        id: node.id,
        label: node.id,
        shape: "text",
        color: colors[node.class],
        size: Math.log(node.num_authors),
        font: { size: 5 * Math.log(node.num_authors) },
      }));
      const normalized: {
        network: VisData;
        classes: (HashtagNetwork2["classes"][0] & {
          id: string;
          color: string;
        })[];
      } = {
        classes: Object.entries(data.classes).map(([key, value]) => ({
          ...value,
          id: key,
          color: colors[key],
        })),
        network: {
          nodes,
          edges: data.network.edges.map((edge) => ({
            ...edge,
            data: edge,
          })),
        },
      };
      return { data, normalized };
    },
  });
}

type HashtagNetwork2 = {
  classes: Record<
    string,
    {
      representation: string;
      summary: string;
      topics: string;
      hashtags: string;
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
  date: string; // <-- YYYY-MM-DD
  network: {
    nodes: {
      class: string; // <-- a number
      id: string;
      num_tweets: number;
      num_authors: number;
    }[];
    edges: {
      from: string;
      to: string;
      value: number;
      is_backbone: number;
    }[];
  };
};
