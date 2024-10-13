import { GraphEdge, GraphNode } from "reagraph";

const colors = ["#FF99CC", "#66CCCC", "#CC6699", "#9999CC"];

const normalizeInterestNetwork = (data: InterestNetwork) => {
  const edges: GraphEdge[] = data.network.edges.map((edge, index) => ({
    ...edge,
    id: index.toString(),
    source: edge.from,
    target: edge.to,
  }));
  const nodes: GraphNode[] = data.network.nodes.map((node) => ({
    ...node,
    label: node.author_name,
    size: Math.log(node.digg),
    fill: colors[node.class],
  }));

  console.log({ edges, nodes });
  return { edges, nodes };
};

export default normalizeInterestNetwork;
