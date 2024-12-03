"use client";

import Graph from "@/components/charts/Graph";
import useYoutubeVideoNet from "@/hooks/useYoutubeVideoNet";

import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";

const VideoNetGraph = ({ projectId }: { projectId: string }) => {
  const { date } = useConfigStore();
  const { data } = useYoutubeVideoNet({
    projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });
  if (!data) return null;
  return <Graph data={data.normalized} />;
};

export default VideoNetGraph;
