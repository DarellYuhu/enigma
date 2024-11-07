"use client";

import Graph, { CosmosLink, CosmosNode } from "@/components/Graph";
import useTwitterAccountNetwork from "@/hooks/useTwitterAccountNetwork";
import { CosmographData } from "@cosmograph/react";
import React from "react";

const AccountNetGraph = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterAccountNetwork({
    project: projectId,
    string: "",
    window: "7d",
  });
  return (
    <div className="w-full h-80">
      <Graph
        data={(data as CosmographData<CosmosNode, CosmosLink>) ?? []}
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
