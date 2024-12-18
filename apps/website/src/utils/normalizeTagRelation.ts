import { COLORS } from "@/constants";
import { Edge, Node } from "vis-network/standalone/umd/vis-network.min";

const normalizeTagRelation: (data: TagRelationNetwork) => {
  nodes: Node[];
  edges: Edge[];
} = (data) => {
  const nodes: Node[] = data.relation.nodes
    .filter((node) => node.isinBackbone)
    .map((node) => ({
      ...node,
      label: node.id,
      shape: "text",
      color: COLORS[node.class % COLORS.length],
      size: Math.log(node.authorCount),
      font: { size: 5 * Math.log(node.authorCount) },
    }));

  const edges: Edge[] = data.relation.edges.filter(
    (edge) => edge.isBackbone !== 0
  );

  return { edges, nodes };
};

export default normalizeTagRelation;
