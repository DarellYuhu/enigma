"use client";

import Graph from "@/components/Graph";
import useYoutubeVideoNet from "@/hooks/useYoutubeVideoNet";
import React from "react";

const VideoNetGraph = ({ projectId }: { projectId: string }) => {
  const { data } = useYoutubeVideoNet({
    projectId,
    window: 5,
  });
  if (!data) return null;
  return <Graph data={data.normalized} />;
};

export default VideoNetGraph;
