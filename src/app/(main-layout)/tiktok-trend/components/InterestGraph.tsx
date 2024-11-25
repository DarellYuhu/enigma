"use client";

import VisGraph, { VisData } from "@/components/VisGraph";
import useTiktokGlobalClusters, {
  ClusterTrends,
} from "@/hooks/useTiktokGlobalClusters";
import React, { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import ClusterInfo from "./ClusterInfo";
import useSelectionStore from "../hooks/selection-store";

const InterestGraph = () => {
  const { type } = useSelectionStore();
  const [graphData, setGraphData] = useState<VisData<
    ClusterTrends["network"]["nodes"][0],
    ClusterTrends["network"]["edges"][0]
  > | null>(null);
  const [node, setNode] = useState<
    ClusterTrends["network"]["nodes"]["0"] | null
  >(null);
  const { data } = useTiktokGlobalClusters({ window: 7 });

  useEffect(() => {
    if (data) {
      const maxValue = data.data.network.nodes.sort(
        (a, b) => b[type] - a[type]
      )[0][type];
      setGraphData({
        edges: data.normalized.edges,
        nodes: data.normalized.nodes.map((node) => ({
          ...node,
          size: Math.sqrt(1 - Math.pow(node.data[type] / maxValue - 1, 2)) * 10,
          font: {
            size:
              Math.sqrt(1 - Math.pow(node.data[type] / maxValue - 1, 2)) * 15,
          },
        })),
      });
    }
  }, [data, type]);

  useEffect(() => {
    if (data) {
      setNode(
        data.normalized.nodes.sort(
          (a, b) => b.data.centrality_pr - a.data.centrality_pr
        )[0].data
      );
    }
  }, [data]);

  if (!graphData) return null;

  return (
    <div className="space-y-4">
      <div className="h-80">
        <VisGraph
          type="tagRelation"
          events={{
            click: (event) => {
              const nodes = new DataSet(graphData.nodes);
              const node: any = nodes.get(event.nodes[0]);
              if (node && !Array.isArray(node)) {
                setNode(node.data);
              }
            },
          }}
          data={graphData}
        />
      </div>
      <ClusterInfo date={data?.data.date} node={node} />
    </div>
  );
};

export default InterestGraph;
