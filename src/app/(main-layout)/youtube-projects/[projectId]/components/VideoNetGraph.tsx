"use client";

import Graph from "@/components/charts/Graph";
import useYoutubeVideoNet, {
  NodeVideoNetwork,
} from "@/hooks/useYoutubeVideoNet";

import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import Link from "next/link";
import { useState } from "react";

const VideoNetGraph = ({ projectId }: { projectId: string }) => {
  const [node, setNode] = useState<NodeVideoNetwork | null>(null);
  const { date } = useConfigStore();
  const { data } = useYoutubeVideoNet({
    projectId,
    window: 5,
    date: dateFormatter("ISO", date),
  });

  if (!data) return null;

  return (
    <>
      <Graph
        data={data.normalized}
        onClick={(node) => {
          if (node) {
            setNode(node.data);
          } else {
            setNode(null);
          }
        }}
      />
      ;
      {node && (
        <div className="absolute bottom-2 w-96 left-2 h-3/5 flex flex-col gap-2 border rounded-md p-2 shadow-lg backdrop-blur-md">
          <h6 className="text-wrap">{node.title}</h6>
          <Link
            target="_blank"
            href={`https://www.youtube.com/watch?v=${node.id}`}
            className="bg-green-300 hover:bg-green-400 rounded-md p-1.5 text-sm text-center justify-center items-center"
          >
            View Video
          </Link>
          <span className="text-xs overflow-y-auto">{node.desc}</span>
        </div>
      )}
    </>
  );
};

export default VideoNetGraph;
