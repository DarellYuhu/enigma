import { GraphEdge, GraphNode } from "reagraph";

const normalizeTagRelation = (data: TagRelationNetwork) => {
  const edges: GraphEdge[] = data.relation.edges
    .filter((edge) => edge.isBackbone !== 0)
    .map((edge, index) => ({
      ...edge,
      id: index.toString(),
      source: edge.from,
      target: edge.to,
    }));
  const nodes: GraphNode[] = data.relation.nodes;

  return { edges, nodes };
};

export default normalizeTagRelation;
