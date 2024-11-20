import { CosmosLink, CosmosNode } from "@/components/Graph";
import { COLORS } from "@/constants";
import { CosmographData } from "@cosmograph/react";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeAudienceNet(payload: {
  params: { projectId: string };
  from?: Date;
  to?: Date;
  string: string;
}) {
  return useQuery({
    queryKey: [
      "youtube",
      "projects",
      payload.params.projectId,
      "audience-network",
    ],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/youtube/projects/${
          payload.params.projectId
        }/audience-network?since=${payload.from?.toISOString()}&until=${payload.to?.toISOString()}&string=${
          payload.string
        }`
      );

      const data = await response.json();
      const parsed: YoutubeAudienceNet = JSON.parse(data);
      const cnNodes = parsed.cn.nodes.map((node) => ({
        id: node.id,
        label: node.channel_title,
        fill: COLORS[node.class],
        data: node,
      }));
      const normalizedChannels: CosmographData<CosmosNode, CosmosLink> = {
        nodes: cnNodes,
        links: parsed.cn.edges.map((edge) => ({
          source: edge.from,
          target: edge.to,
          data: edge,
          fill: nodes.find((node) => node.id === edge.from)?.fill,
        })),
      };
      const nodes = parsed.vn.nodes.map((node) => ({
        id: node.id,
        label: node.title,
        fill: COLORS[node.class],
        data: node,
      }));
      const normalizedVideos: CosmographData<CosmosNode, CosmosLink> = {
        nodes,
        links: parsed.vn.edges.map((edge) => ({
          source: edge.from,
          target: edge.to,
          fill: nodes.find((node) => node.id === edge.from)?.fill,
          data: edge,
        })),
      };

      return {
        cn: normalizedChannels,
        vn: normalizedVideos,
        end: parsed.end,
        start: parsed.start,
      };
    },
  });
}
