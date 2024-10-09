import { Graph } from "@antv/g6";
import { useEffect, useRef } from "react";

type Props = {
  data: {
    edges: {
      source: string;
      isBackbone: number;
      target: string;
      value: number;
    }[];
    nodes: {
      authorCount: number;
      class: number;
      id: string;
      isinBackbone: boolean;
      videoCount: number;
    }[];
  };
};

const data = {
  nodes: [
    { id: "1", label: "公司1" },
    { id: "2", label: "公司2" },
    // 节点数据 ...
  ],
  edges: [
    {
      source: "1",
      target: "2",
      data: { type: "name1", amount: "100,000,000,00 元", date: "2019-08-03" },
    },
    // 边数据 ...
  ],
};

const NetworkGraph = ({}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>();

  useEffect(() => {
    if (graphRef.current || !containerRef.current) return;

    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      layout: { type: "dagre", direction: "LR" },
    });

    graph.setData(data);
    graph.render();

    graphRef.current = graph;
  }, []);

  return <div ref={containerRef}></div>;
};

export default NetworkGraph;
