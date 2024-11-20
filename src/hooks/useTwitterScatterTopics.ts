import { CosmosLink, CosmosNode } from "@/components/Graph";
import generateNodeColors from "@/utils/generateNodeColors";
import { CosmographData } from "@cosmograph/react";
import { useQuery } from "@tanstack/react-query";

const useTwitterScatterTopics = (payload: { project: string; date: Date }) => {
  return useQuery({
    queryKey: ["twitterScatterTopics", payload.project],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${
          payload.project
        }/scatter-topics?date=${payload.date?.toISOString()}`
      );

      const data: ScatterTopics = await response.json();
      const classes = Object.keys(data.class);
      const colors = generateNodeColors(classes);
      const normalized: CosmographData<CosmosNode, CosmosLink> = {
        nodes: data.tweets.map((node) => ({
          data: node,
          id: node.id,
          label: node.user_screen_name,
          fill: colors[node.class] ?? "#808080",
          x: node.pos.x,
          y: node.pos.y,
          size: 0.3,
        })),
        links: [],
      };
      return { data, normalized, colors };
    },
  });
};
type ScatterTopics = {
  class: Record<
    number,
    {
      num_accounts: number;
      num_tweets: number;
      num_unique_tweets: number;
      tone_positive: number;
      tone_negative: number;
      tone_neutral: number;
    }
  >;
  tweets: {
    class: string; // <-- a number
    id: string;
    user_id: string;
    user_screen_name: string;
    full_text: string;
    pos: {
      x: number;
      y: number;
    };
  }[];
};

export type ScatterTopicsResult = NonNullable<
  Awaited<ReturnType<typeof useTwitterScatterTopics>>["data"]
>;

export default useTwitterScatterTopics;
