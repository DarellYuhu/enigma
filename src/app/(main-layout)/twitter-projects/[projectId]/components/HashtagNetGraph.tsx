"use client";

import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
import useTwitterHashtagNet from "@/hooks/useTwitterHashtagNet";
import useStatisticDateStore from "@/store/statistic-date-store";
import { CosmographData } from "@cosmograph/react";

const HashtagNetGraph = ({ projectId }: { projectId: string }) => {
  const { from, to } = useStatisticDateStore();
  const { data } = useTwitterHashtagNet({
    project: projectId,
    string: "",
    since: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    until: new Date(),
  });
  return (
    <div className="w-full h-80 shadow-inner">
      <Graph
        simulationGravity={0.0}
        simulationRepulsion={1}
        simulationLinkSpring={0.4}
        data={(data as CosmographData<CosmosNode, CosmosLink>) ?? []}
        //   onClick={(node) => {
        //     if (node) {
        //       setTagNode(node.data);
        //     } else {
        //       setTagNode(null);
        //     }
        //   }}
      />
    </div>
  );
};

export default HashtagNetGraph;
