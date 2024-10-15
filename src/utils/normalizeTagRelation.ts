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
    }));

  return { edges, nodes };
};

const colors = [
  "#527BA8",
  "#EE8C1F",
  "#DD5657",
  "#7AB7B2",
  "#60A04E",
  "#ECC640",
  "#AD7BA2",
  "#FB9CA6",
  "#9B755F",
  "#B9AFAB",
];

export default normalizeTagRelation;
