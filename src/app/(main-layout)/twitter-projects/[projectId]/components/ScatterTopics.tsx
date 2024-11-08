"use client";

import Graph from "@/components/Graph";
import useTwitterScatterTopics from "@/hooks/useTwitterScatterTopics";
import { CosmographProvider, CosmographSearch } from "@cosmograph/react";
import React from "react";

const ScatterTopics = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterScatterTopics({
    project: projectId,
    date: new Date(Date.now() - 24 * 2 * 60 * 60 * 1000),
  });
  return (
    <div className="w-full h-80">
      {/* <CosmographSearch /> */}
      {data && <Graph data={data.normalized} showDynamicLabel={false} />}
    </div>
  );
};

export default ScatterTopics;
