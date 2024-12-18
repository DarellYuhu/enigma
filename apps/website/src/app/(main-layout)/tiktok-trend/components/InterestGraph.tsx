"use client";

import VisGraph, { VisData } from "@/components/VisGraph";
import useTiktokGlobalClusters, {
  ClusterTrends,
} from "@/hooks/features/tiktok/useTiktokGlobalClusters";
import { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import ClusterInfo from "./ClusterInfo";
import useSelectionStore from "../hooks/selection-store";
import useConfigStore from "../hooks/config-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { exportNetwork } from "@/utils/exportNetwork";
import { Download } from "lucide-react";
import TypeSelection from "./TypeSelection";
import { toast } from "sonner";

const InterestGraph = () => {
  const { date } = useConfigStore();
  const { type } = useSelectionStore();
  const [graphData, setGraphData] = useState<VisData<
    ClusterTrends["network"]["nodes"][0],
    ClusterTrends["network"]["edges"][0]
  > | null>(null);
  const [node, setNode] = useState<
    ClusterTrends["network"]["nodes"]["0"] | null
  >(null);
  const { data, isPending } = useTiktokGlobalClusters({ window: 7, date });

  useEffect(() => {
    if (data?.data.network.nodes.length !== 0 && data) {
      const maxValue = data.data.network.nodes.sort(
        (a, b) => b[type] - a[type]
      )[0][type];
      setGraphData({
        edges: data.normalized.edges,
        nodes: data.normalized.nodes.map((node) => ({
          ...node,
          size:
            Math.sqrt(1 - Math.pow(node.data![type] / maxValue - 1, 2)) * 10,
          font: {
            size:
              Math.sqrt(1 - Math.pow(node.data![type] / maxValue - 1, 2)) * 15,
          },
        })),
      });
    }
  }, [data, type]);

  useEffect(() => {
    if (data?.data.network.nodes.length !== 0 && data) {
      setNode(
        data.normalized.nodes.sort(
          (a, b) => b.data!.centrality_pr - a.data!.centrality_pr
        )[0].data!
      );
    }
  }, [data]);

  if (isPending)
    return (
      <div className="px-6 pb-6">
        <Skeleton className="h-80 w-full" />
      </div>
    );

  if (!graphData) return null;

  return (
    <>
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
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() =>
            data?.data.network
              ? exportNetwork(date, data?.data.network, "Interest Network")
              : toast.error("Fail export network")
          }
        >
          <Download />
        </Button>
        <TypeSelection />
      </div>
    </>
  );
};

export default InterestGraph;
