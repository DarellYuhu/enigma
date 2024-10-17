import { Edge, Node } from "vis-network/declarations/entry-esnext";

const normalizeTagRelation = (data: TagRelationNetwork) => {
  const edges: Edge[] = data.relation.edges.filter(
    (edge) => edge.isBackbone !== 0
  );
  const nodes: Node[] = data.relation.nodes
    .filter((node) => node.isinBackbone)
    .map((node) => ({
      ...node,
      label: node.id,
      shape: "dot",
      color: colors[node.class],
      size: Math.log(node.authorCount),
      font: { size: 5 * Math.log(node.authorCount) },
    }));

  return { edges, nodes };
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
