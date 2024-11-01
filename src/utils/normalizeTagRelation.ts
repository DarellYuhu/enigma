import { CosmosLink, CosmosNode } from "@/components/Graph";
import { CosmographData } from "@cosmograph/react";

const normalizeTagRelation: (
  data: TagRelationNetwork
) => CosmographData<CosmosNode, CosmosLink> = (data) => {
  const nodes: CosmosNode[] = data.relation.nodes
    .filter((node) => node.isinBackbone)
    .map((node) => ({
      id: node.id,
      label: node.id,
      fill: colors[node.class],
      size: Math.log(node.authorCount),
      data: node,
    }));

  const links: CosmosLink[] = data.relation.edges
    .filter((edge) => edge.isBackbone !== 0)
    .map((link) => ({
      source: link.from,
      target: link.to,
      data: link,
      fill: nodes.find((node) => node.id === link.from)?.fill,
    }));

  return { links, nodes };
};

const colors = [
  "#7D89FD",
  "#E7C400",
  "#F38200",
  "#BFE719",
  "#2CB6AF",
  "#7BDF66",
];

export default normalizeTagRelation;
