"use client";

import VisGraph, { VisData } from "@/components/VisGraph";
import useTiktokGlobalClusters, {
  ClusterTrends,
} from "@/hooks/useTiktokGlobalClusters";
import React, { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import ClusterInfo from "./ClusterInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Type =
  | "num_contents"
  | "num_authors"
  | "num_audience"
  | "total_views"
  | "total_likes"
  | "total_comments"
  | "total_shares"
  | "centrality";

const InterestGraph = () => {
  const [type, setType] = useState<Type>("centrality");
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
              } else {
                setNode(null);
              }
            },
          }}
          data={graphData}
        />
      </div>
      <div className="absolute top-0 left-2">
        <Select
          defaultValue="centrality"
          onValueChange={(value) => setType(value as Type)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="centrality">Centrality</SelectItem>
            <SelectItem value="num_contents">Number of contents</SelectItem>
            <SelectItem value="num_authors">Number of authors</SelectItem>
            <SelectItem value="num_audience">Number of audience</SelectItem>
            <SelectItem value="total_views">Total views</SelectItem>
            <SelectItem value="total_likes">Total likes</SelectItem>
            <SelectItem value="total_comments">Total comments</SelectItem>
            <SelectItem value="total_shares">Total shares</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ClusterInfo date={data?.data.date} node={node} />
    </div>
  );
};

export default InterestGraph;
