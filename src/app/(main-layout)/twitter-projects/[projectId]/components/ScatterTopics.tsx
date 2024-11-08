"use client";

import Graph from "@/components/Graph";
import useTwitterScatterTopics from "@/hooks/useTwitterScatterTopics";
import React from "react";

const ScatterTopics = ({ projectId }: { projectId: string }) => {
  const { data } = useTwitterScatterTopics({
    project: projectId,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  });
  return (
    <div className="w-full h-80">
      {data && <Graph data={data.normalized} />}
    </div>
  );
};

export default ScatterTopics;
