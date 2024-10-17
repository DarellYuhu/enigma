import { useRef } from "react";
import {
  Graph as GraphData,
  GraphCanvas,
  useSelection,
  GraphCanvasRef,
} from "reagraph";

const Graph = ({ graphData }: { graphData: GraphData }) => {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const { onNodePointerOver, onNodePointerOut, actives } = useSelection({
    pathHoverType: "all",
    ref: graphRef,
  });
  return (
    <GraphCanvas
      ref={graphRef}
      nodes={graphData.nodes}
      edges={graphData.edges}
      layoutType="forceatlas2"
      edgeInterpolation="curved"
      edgeArrowPosition="none"
      onNodePointerOver={onNodePointerOver}
      onNodePointerOut={onNodePointerOut}
      animated
      actives={actives}
    />
  );
};

export default Graph;
