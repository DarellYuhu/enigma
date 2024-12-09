import { COLORS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Edge, Node } from "vis-network/declarations/entry-esnext";

type Props = {
  project: string;
  since?: Date;
  until?: Date;
  string: string;
};

const useTwitterHashtagNet = (payload: Props) => {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/twitter/${payload.project}/hashtag-network?since=${format(
          payload.since!,
          "yyyy-MM-dd"
        )}&until=${format(payload.until!, "yyyy-MM-dd")}&string=${
          payload.string
        }`
      );

      const data: TwitterHashtagRelation = await response.json();

      const normalized: {
        nodes: Node[];
        edges: Edge[];
      } = {
        nodes: data.relation.nodes
          .filter((node) => node.isinBackbone)
          .map((node) => ({
            ...node,
            label: node.id,
            shape: "text",
            color: COLORS[node.class % COLORS.length],
            size: Math.log(node.authorCount) * 5,
            font: { size: 5 * Math.log(node.authorCount) },
          })),

        edges: data.relation.edges.filter((edge) => edge.isBackbone !== 0),
      };

      return normalized;
    },
    queryKey: ["twitter", "tag-relation-network", payload.project],
  });
};

type TwitterHashtagRelation = {
  relation: {
    nodes: {
      id: string;
      tweetCount: number;
      authorCount: number;
      isinBackbone: number;
      class: number;
    }[];
    edges: {
      from: string;
      to: string;
      isBackbone: number;
      value: number;
    }[];
  };
};

export default useTwitterHashtagNet;
