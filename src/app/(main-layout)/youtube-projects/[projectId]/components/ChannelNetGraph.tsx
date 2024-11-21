"use client";

import VisGraph from "@/components/VisGraph";
import useYoutubeChannelNet from "@/hooks/useYoutubeChannelNet";
import React, { useEffect } from "react";
import useSelectedChannelStore from "../store/selected-channel-store";
import { DataSet } from "vis-data";

const ChannelNetGraph = ({ projectId }: { projectId: string }) => {
  const { setChannel } = useSelectedChannelStore();
  const { data } = useYoutubeChannelNet({
    projectId: projectId,
    window: 5,
  });

  useEffect(() => {
    if (data) {
      setChannel(
        data.data.network.nodes.sort((a, b) => b.centrality - a.centrality)[0]
          .id
      );
    }
  }, [data]);
  if (!data) return null;
  return (
    <VisGraph
      data={data.normalized}
      type="tagRelation"
      events={{
        click: (event) => {
          const nodes = new DataSet(data.normalized.nodes);
          const node: any = nodes.get(event.nodes[0]);
          if (node && !Array.isArray(node)) {
            setChannel(node.data.id);
          }
        },
      }}
    />
  );
};

export default ChannelNetGraph;
