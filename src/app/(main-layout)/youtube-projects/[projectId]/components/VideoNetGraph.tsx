"use client";

import Graph from "@/components/Graph";
import useYoutubeVideoNet from "@/hooks/useYoutubeVideoNet";
import React from "react";
import useConfigStore from "../store/config-store";

const VideoNetGraph = ({ projectId }: { projectId: string }) => {
  const { date } = useConfigStore();
  const { data } = useYoutubeVideoNet({
    projectId,
    window: 5,
    date,
  });
  if (!data) return null;
  return <Graph data={data.normalized} />;
};

export default VideoNetGraph;
