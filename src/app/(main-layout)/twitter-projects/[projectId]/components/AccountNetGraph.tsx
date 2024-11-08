"use client";

import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import { CosmographData } from "@cosmograph/react";
import React from "react";

const AccountNetGraph = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    window: "1",
  });
  return (
    <div className="w-full h-96 shadow-inner">
      <Graph
        linkVisibilityDistanceRange={[50, 150]}
        data={
          (data?.normalized as CosmographData<CosmosNode, CosmosLink>) ?? []
        }
        // onClick={(node) => {
        //   if (node) {
        //     setNode(node.data);
        //   } else {
        //     setNode(null);
        //   }
        // }}
      />
    </div>
  );
};

export default AccountNetGraph;
