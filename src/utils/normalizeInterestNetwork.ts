import { GraphEdge, GraphNode } from "reagraph";

const normalizeInterestNetwork = (data: InterestNetwork) => {
  const edges: GraphEdge[] = data.network.edges.map((edge, index) => ({
    ...edge,
    id: index.toString(),
    source: edge.from,
    target: edge.to,
  }));
  const nodes: GraphNode[] = data.network.nodes;

  return { edges, nodes };
};

export default normalizeInterestNetwork;
